begin;

alter table public.leads
add column submission_id uuid;

alter table public.leads
add column submission_fingerprint text;

update public.leads
set
  submission_id = coalesce(submission_id, gen_random_uuid()),
  submission_fingerprint = coalesce(submission_fingerprint, 'legacy:' || id::text)
where submission_id is null
  or submission_fingerprint is null;

alter table public.leads
alter column submission_id set not null;

alter table public.leads
alter column submission_fingerprint set not null;

alter table public.leads
add constraint leads_submission_id_key unique (submission_id);

insert into public.project_types (category_id, name, slug, sort_order)
values
  ((select id from public.categories where slug = 'insaat'), 'Anahtar Teslim İnşaat', 'anahtar-teslim-insaat', 90),
  ((select id from public.categories where slug = 'insaat'), 'Konut Yenileme ve Tadilat', 'konut-yenileme-tadilat', 100),
  ((select id from public.categories where slug = 'peyzaj'), 'Peyzaj Mimarisi', 'peyzaj-mimarisi', 110),
  ((select id from public.categories where slug = 'mimari'), 'Gayrimenkul Değer Artışı ve Danışmanlığı', 'deger-artirma-danismanlik', 120),
  ((select id from public.categories where slug = 'mimari'), 'Diğer', 'diger', 130)
on conflict (slug) do nothing;

create table public.lead_rate_limit_events (
  id uuid primary key default gen_random_uuid(),
  key_hash text not null,
  window_start timestamptz not null,
  created_at timestamptz not null default now()
);

alter table public.lead_rate_limit_events enable row level security;

create index lead_rate_limit_events_cleanup_idx
on public.lead_rate_limit_events (window_start);

revoke all privileges on table public.lead_rate_limit_events from public;
revoke all privileges on table public.lead_rate_limit_events from anon;
revoke all privileges on table public.lead_rate_limit_events from authenticated;
grant all privileges on table public.lead_rate_limit_events to service_role;

create or replace function public.check_lead_rate_limit(
  p_key_hash text,
  p_window_seconds integer default 600,
  p_max_attempts integer default 5
)
returns table (
  allowed boolean,
  retry_after_seconds integer,
  attempts integer
)
language plpgsql
set search_path = ''
as $$
declare
  v_now timestamptz := now();
  v_key_hash text;
  v_window_start timestamptz;
  v_window_end timestamptz;
  v_attempts integer;
begin
  v_key_hash := trim(coalesce(p_key_hash, ''));

  if length(v_key_hash) < 32 then
    raise exception 'INVALID_RATE_LIMIT_KEY';
  end if;

  if p_window_seconds is null or p_window_seconds < 60 or p_window_seconds > 3600 then
    raise exception 'INVALID_RATE_LIMIT_WINDOW';
  end if;

  if p_max_attempts is null or p_max_attempts < 1 or p_max_attempts > 100 then
    raise exception 'INVALID_RATE_LIMIT_MAX';
  end if;

  v_window_start := to_timestamp(
    floor(extract(epoch from v_now) / p_window_seconds) * p_window_seconds
  );
  v_window_end := v_window_start + make_interval(secs => p_window_seconds);

  perform pg_advisory_xact_lock(
    pg_catalog.hashtextextended(
      v_key_hash || ':' || extract(epoch from v_window_start)::bigint::text,
      0
    )
  );

  delete from public.lead_rate_limit_events
  where window_start < v_now - make_interval(secs => p_window_seconds * 2);

  select count(*)::integer
  into v_attempts
  from public.lead_rate_limit_events
  where key_hash = v_key_hash
    and window_start = v_window_start;

  if v_attempts >= p_max_attempts then
    return query
    select
      false,
      greatest(1, ceil(extract(epoch from v_window_end - v_now))::integer),
      v_attempts;
    return;
  end if;

  insert into public.lead_rate_limit_events (
    key_hash,
    window_start
  )
  values (
    v_key_hash,
    v_window_start
  );

  v_attempts := v_attempts + 1;

  return query
  select
    true,
    greatest(1, ceil(extract(epoch from v_window_end - v_now))::integer),
    v_attempts;
end;
$$;

create or replace function public.find_idempotent_lead_submission(
  p_submission_id uuid,
  p_submission_fingerprint text
)
returns table (
  found boolean,
  lead_id uuid
)
language plpgsql
set search_path = ''
as $$
declare
  v_existing_lead_id uuid;
  v_existing_submission_fingerprint text;
  v_submission_fingerprint text;
begin
  if p_submission_id is null then
    raise exception 'INVALID_SUBMISSION_ID';
  end if;

  v_submission_fingerprint := lower(trim(coalesce(p_submission_fingerprint, '')));
  if length(v_submission_fingerprint) <> 64 or v_submission_fingerprint !~ '^[0-9a-f]{64}$' then
    raise exception 'INVALID_SUBMISSION_FINGERPRINT';
  end if;

  select id, submission_fingerprint
  into v_existing_lead_id, v_existing_submission_fingerprint
  from public.leads
  where submission_id = p_submission_id;

  if v_existing_lead_id is null then
    return query select false, null::uuid;
    return;
  end if;

  if v_existing_submission_fingerprint <> v_submission_fingerprint then
    raise exception 'IDEMPOTENCY_CONFLICT';
  end if;

  return query select true, v_existing_lead_id;
end;
$$;

create or replace function public.create_lead_submission(
  p_submission_id uuid,
  p_submission_fingerprint text,
  p_full_name text,
  p_phone text,
  p_email text,
  p_city text,
  p_district text,
  p_address text,
  p_source text,
  p_project_type_slug text,
  p_service_slugs text[],
  p_budget_min bigint,
  p_budget_max bigint,
  p_timeline text,
  p_description text,
  p_project_details jsonb
)
returns table (
  lead_id uuid,
  created boolean
)
language plpgsql
set search_path = ''
as $$
declare
  v_existing_lead_id uuid;
  v_existing_submission_fingerprint text;
  v_submission_fingerprint text;
  v_lead_id uuid;
  v_project_type_id uuid;
  v_project_type_slug text;
  v_service_slugs text[];
  v_service_slug_count integer;
  v_service_count integer;
begin
  if p_submission_id is null then
    raise exception 'INVALID_SUBMISSION_ID';
  end if;

  v_submission_fingerprint := trim(coalesce(p_submission_fingerprint, ''));
  v_submission_fingerprint := lower(v_submission_fingerprint);
  if length(v_submission_fingerprint) <> 64 or v_submission_fingerprint !~ '^[0-9a-f]{64}$' then
    raise exception 'INVALID_SUBMISSION_FINGERPRINT';
  end if;

  v_project_type_slug := trim(coalesce(p_project_type_slug, ''));

  select array_agg(normalized_slug.slug order by normalized_slug.slug)
  into v_service_slugs
  from (
    select distinct trim(slug) as slug
    from unnest(coalesce(p_service_slugs, array[]::text[])) as requested(slug)
    where trim(coalesce(requested.slug, '')) <> ''
  ) as normalized_slug;

  select id, submission_fingerprint
  into v_existing_lead_id, v_existing_submission_fingerprint
  from public.leads
  where submission_id = p_submission_id;

  if v_existing_lead_id is not null then
    if v_existing_submission_fingerprint <> v_submission_fingerprint then
      raise exception 'IDEMPOTENCY_CONFLICT';
    end if;

    return query select v_existing_lead_id, false;
    return;
  end if;

  select id
  into v_project_type_id
  from public.project_types
  where slug = v_project_type_slug;

  if v_project_type_id is null then
    raise exception 'INVALID_PROJECT_TYPE';
  end if;

  if v_service_slugs is null or cardinality(v_service_slugs) = 0 then
    raise exception 'INVALID_SERVICE_SELECTION';
  end if;

  v_service_slug_count := cardinality(v_service_slugs);

  if v_service_slug_count = 0 then
    raise exception 'INVALID_SERVICE_SELECTION';
  end if;

  select count(*)::integer
  into v_service_count
  from public.services
  where slug = any(v_service_slugs);

  if v_service_count <> v_service_slug_count then
    raise exception 'INVALID_SERVICE_SELECTION';
  end if;

  begin
    insert into public.leads (
      submission_id,
      submission_fingerprint,
      project_type_id,
      full_name,
      phone,
      email,
      city,
      district,
      address,
      source,
      timeline,
      budget_min,
      budget_max,
      description,
      project_details
    )
    values (
      p_submission_id,
      v_submission_fingerprint,
      v_project_type_id,
      p_full_name,
      p_phone,
      p_email,
      p_city,
      p_district,
      p_address,
      coalesce(nullif(trim(p_source), ''), 'website'),
      p_timeline,
      p_budget_min,
      p_budget_max,
      p_description,
      coalesce(p_project_details, '{}'::jsonb)
    )
    returning id into v_lead_id;
  exception
    when unique_violation then
      select id
      into v_existing_lead_id
      from public.leads
      where submission_id = p_submission_id;

      if v_existing_lead_id is not null then
        select submission_fingerprint
        into v_existing_submission_fingerprint
        from public.leads
        where id = v_existing_lead_id;

        if v_existing_submission_fingerprint <> v_submission_fingerprint then
          raise exception 'IDEMPOTENCY_CONFLICT';
        end if;

        return query select v_existing_lead_id, false;
        return;
      end if;

      raise;
  end;

  insert into public.lead_services (
    lead_id,
    service_id
  )
  select
    v_lead_id,
    services.id
  from public.services
  where services.slug = any(v_service_slugs);

  return query select v_lead_id, true;
end;
$$;

revoke execute on function public.check_lead_rate_limit(text, integer, integer) from public;
revoke execute on function public.check_lead_rate_limit(text, integer, integer) from anon;
revoke execute on function public.check_lead_rate_limit(text, integer, integer) from authenticated;
grant execute on function public.check_lead_rate_limit(text, integer, integer) to service_role;

revoke execute on function public.find_idempotent_lead_submission(uuid, text) from public;
revoke execute on function public.find_idempotent_lead_submission(uuid, text) from anon;
revoke execute on function public.find_idempotent_lead_submission(uuid, text) from authenticated;
grant execute on function public.find_idempotent_lead_submission(uuid, text) to service_role;

revoke execute on function public.create_lead_submission(uuid, text, text, text, text, text, text, text, text, text, text[], bigint, bigint, text, text, jsonb) from public;
revoke execute on function public.create_lead_submission(uuid, text, text, text, text, text, text, text, text, text, text[], bigint, bigint, text, text, jsonb) from anon;
revoke execute on function public.create_lead_submission(uuid, text, text, text, text, text, text, text, text, text, text[], bigint, bigint, text, text, jsonb) from authenticated;
grant execute on function public.create_lead_submission(uuid, text, text, text, text, text, text, text, text, text, text[], bigint, bigint, text, text, jsonb) to service_role;

comment on column public.leads.submission_id is
  'Client-generated UUID used only as an idempotency key for public lead submissions.';
comment on column public.leads.submission_fingerprint is
  'Server-generated fingerprint of the normalized lead submission payload used to detect idempotency key reuse with different content.';
comment on table public.lead_rate_limit_events is
  'Server-side lead rate limit event store. key_hash is the hashed client key; each row is one counted attempt and raw IP addresses are not stored.';
comment on function public.check_lead_rate_limit(text, integer, integer) is
  'Records one submission attempt per hashed client key and returns rate-limit state for server-only callers.';
comment on function public.find_idempotent_lead_submission(uuid, text) is
  'Checks whether a submission_id already exists with the same server-generated fingerprint for server-only idempotent retries.';
comment on function public.create_lead_submission(uuid, text, text, text, text, text, text, text, text, text, text[], bigint, bigint, text, text, jsonb) is
  'Creates a lead and lead_services transactionally, resolves catalog slugs server-side, and returns idempotent duplicate submissions.';

commit;
