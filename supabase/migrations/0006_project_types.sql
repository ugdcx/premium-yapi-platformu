begin;

create table public.project_types (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete restrict,
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.project_types enable row level security;

create index project_types_category_id_idx
on public.project_types (category_id);

create index project_types_sort_order_idx
on public.project_types (sort_order);

insert into public.project_types (category_id, name, slug, sort_order)
values
  ((select id from public.categories where slug = 'insaat'), 'Villa', 'villa', 10),
  ((select id from public.categories where slug = 'insaat'), 'Daire', 'daire', 20),
  ((select id from public.categories where slug = 'mimari'), 'Kafe', 'kafe', 30),
  ((select id from public.categories where slug = 'mimari'), 'Restoran', 'restoran', 40),
  ((select id from public.categories where slug = 'mimari'), 'Ofis', 'ofis', 50),
  ((select id from public.categories where slug = 'mimari'), 'Showroom', 'showroom', 60),
  ((select id from public.categories where slug = 'insaat'), 'Fabrika', 'fabrika', 70),
  ((select id from public.categories where slug = 'insaat'), 'Depo', 'depo', 80);

commit;
