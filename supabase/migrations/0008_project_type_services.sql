begin;

create table public.project_type_services (
  project_type_id uuid not null references public.project_types(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  primary key (project_type_id, service_id)
);

alter table public.project_type_services enable row level security;

create index project_type_services_service_id_idx
on public.project_type_services (service_id);

commit;
