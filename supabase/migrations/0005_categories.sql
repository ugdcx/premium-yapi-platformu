begin;

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

create index categories_sort_order_idx
on public.categories (sort_order);

insert into public.categories (name, slug, sort_order)
values
  ('İnşaat', 'insaat', 10),
  ('Mimari', 'mimari', 20),
  ('Peyzaj', 'peyzaj', 30);

commit;
