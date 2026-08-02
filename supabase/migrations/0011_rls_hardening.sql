begin;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.project_types enable row level security;
alter table public.services enable row level security;
alter table public.project_type_services enable row level security;
alter table public.leads enable row level security;
alter table public.lead_services enable row level security;

revoke all privileges on table public.profiles from anon;
revoke all privileges on table public.profiles from authenticated;
revoke all privileges on table public.profiles from public;

revoke all privileges on table public.categories from anon;
revoke all privileges on table public.categories from authenticated;
revoke all privileges on table public.categories from public;

revoke all privileges on table public.project_types from anon;
revoke all privileges on table public.project_types from authenticated;
revoke all privileges on table public.project_types from public;

revoke all privileges on table public.services from anon;
revoke all privileges on table public.services from authenticated;
revoke all privileges on table public.services from public;

revoke all privileges on table public.project_type_services from anon;
revoke all privileges on table public.project_type_services from authenticated;
revoke all privileges on table public.project_type_services from public;

revoke all privileges on table public.leads from anon;
revoke all privileges on table public.leads from authenticated;
revoke all privileges on table public.leads from public;

revoke all privileges on table public.lead_services from anon;
revoke all privileges on table public.lead_services from authenticated;
revoke all privileges on table public.lead_services from public;

revoke all privileges on all sequences in schema public from anon;
revoke all privileges on all sequences in schema public from authenticated;
revoke all privileges on all sequences in schema public from public;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on function public.set_updated_at() from public;
revoke execute on function public.set_updated_at() from anon;
revoke execute on function public.set_updated_at() from authenticated;

revoke execute on function public.handle_new_auth_user() from public;
revoke execute on function public.handle_new_auth_user() from anon;
revoke execute on function public.handle_new_auth_user() from authenticated;

comment on table public.profiles is
  'Direct anon/authenticated Data API access is intentionally disabled. role and is_active are managed only by trusted server operations.';
comment on table public.categories is
  'Direct anon/authenticated Data API access is intentionally disabled; catalog data is currently served from application-controlled sources.';
comment on table public.project_types is
  'Direct anon/authenticated Data API access is intentionally disabled; catalog data is currently served from application-controlled sources.';
comment on table public.services is
  'Direct anon/authenticated Data API access is intentionally disabled; lead submission resolves services through the server-only admin client.';
comment on table public.project_type_services is
  'Direct anon/authenticated Data API access is intentionally disabled; catalog relationships are accessed through trusted server operations.';
comment on table public.leads is
  'Direct anon/authenticated Data API access is intentionally disabled; lead submission uses the server route with a server-only admin client.';
comment on table public.lead_services is
  'Direct anon/authenticated Data API access is intentionally disabled; lead service rows are written through trusted server operations.';

comment on function public.set_updated_at() is
  'Trigger helper with empty search_path. Direct execute by public, anon, and authenticated is revoked.';
comment on function public.handle_new_auth_user() is
  'Auth trigger function uses SECURITY DEFINER and empty search_path; direct execute by public, anon, and authenticated is revoked.';

commit;
