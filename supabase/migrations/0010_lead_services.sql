begin;

create table public.lead_services (
  lead_id uuid not null references public.leads(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete restrict,
  primary key (lead_id, service_id)
);

alter table public.lead_services enable row level security;

create index lead_services_service_id_idx
on public.lead_services (service_id);

commit;
