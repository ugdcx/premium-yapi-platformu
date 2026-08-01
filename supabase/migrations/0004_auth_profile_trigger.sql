begin;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  resolved_full_name text;
begin
  resolved_full_name := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    split_part(coalesce(new.email, 'BLAGG User'), '@', 1)
  );

  insert into public.profiles (
    id,
    full_name,
    phone,
    role,
    is_active
  )
  values (
    new.id,
    resolved_full_name,
    nullif(trim(new.raw_user_meta_data ->> 'phone'), ''),
    'customer',
    true
  );

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_auth_user();

commit;
