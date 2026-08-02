begin;

create table public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.services enable row level security;

create index services_sort_order_idx
on public.services (sort_order);

insert into public.services (name, slug, sort_order)
values
  ('Anahtar Teslim', 'anahtar-teslim', 10),
  ('Renovasyon', 'renovasyon', 20),
  ('İç Mimari', 'ic-mimari', 30),
  ('Dış Mimari', 'dis-mimari', 40),
  ('Peyzaj Tasarımı', 'peyzaj-tasarimi', 50),
  ('Peyzaj Uygulama', 'peyzaj-uygulama', 60),
  ('Danışmanlık', 'danismanlik', 70);

commit;
