begin;

create type public.user_role as enum (
  'super_admin',
  'project_manager',
  'field_engineer',
  'customer'
);

create type public.project_status as enum (
  'lead',
  'planning',
  'design',
  'permitting',
  'active',
  'paused',
  'completed',
  'cancelled'
);

create type public.project_member_role as enum (
  'project_manager',
  'field_engineer',
  'customer'
);

create type public.update_visibility as enum (
  'internal',
  'customer'
);

create type public.media_type as enum (
  'image',
  'video',
  'document'
);


commit;
