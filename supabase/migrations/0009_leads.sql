begin;

create type public.lead_status as enum (
  'new',
  'contacted',
  'qualified',
  'site_visit_planned',
  'quote_preparing',
  'quote_sent',
  'negotiation',
  'won',
  'converted_to_project',
  'lost',
  'unsuitable',
  'archived'
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  project_type_id uuid references public.project_types(id) on delete restrict,
  full_name text not null,
  phone text not null,
  email text,
  city text,
  district text,
  address text,
  source text not null default 'website',
  status public.lead_status not null default 'new',
  timeline text,
  budget_min bigint,
  budget_max bigint,
  description text,
  project_details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create index leads_project_type_id_idx
on public.leads (project_type_id);

create index leads_status_idx
on public.leads (status);

create index leads_created_at_idx
on public.leads (created_at desc);

create index leads_project_details_idx
on public.leads using gin (project_details);

create trigger leads_set_updated_at
before update on public.leads
for each row
execute function public.set_updated_at();

commit;
