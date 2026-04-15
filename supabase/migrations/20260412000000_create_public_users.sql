create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  document text,
  phone_code text,
  phone_prefix text,
  phone text,
  phone_international text,
  accepted_terms boolean not null default false,
  role text not null default 'student',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.users enable row level security;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_users_updated_at on public.users;

create trigger set_users_updated_at
before update on public.users
for each row
execute function public.set_updated_at();

create or replace function public.sync_auth_user_to_public_users()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (
    id,
    email,
    full_name,
    document,
    phone_code,
    phone_prefix,
    phone,
    phone_international,
    accepted_terms,
    updated_at
  )
  values (
    new.id,
    coalesce(new.email, ''),
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'document',
    new.raw_user_meta_data ->> 'phone_code',
    new.raw_user_meta_data ->> 'phone_prefix',
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'phone_international',
    coalesce((new.raw_user_meta_data ->> 'accepted_terms')::boolean, false),
    now()
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = excluded.full_name,
    document = excluded.document,
    phone_code = excluded.phone_code,
    phone_prefix = excluded.phone_prefix,
    phone = excluded.phone,
    phone_international = excluded.phone_international,
    accepted_terms = excluded.accepted_terms,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists sync_auth_user_to_public_users on auth.users;

create trigger sync_auth_user_to_public_users
after insert or update of email, raw_user_meta_data on auth.users
for each row
execute function public.sync_auth_user_to_public_users();

insert into public.users (
  id,
  email,
  full_name,
  document,
  phone_code,
  phone_prefix,
  phone,
  phone_international,
  accepted_terms,
  created_at,
  updated_at
)
select
  id,
  coalesce(email, ''),
  raw_user_meta_data ->> 'full_name',
  raw_user_meta_data ->> 'document',
  raw_user_meta_data ->> 'phone_code',
  raw_user_meta_data ->> 'phone_prefix',
  raw_user_meta_data ->> 'phone',
  raw_user_meta_data ->> 'phone_international',
  coalesce((raw_user_meta_data ->> 'accepted_terms')::boolean, false),
  created_at,
  now()
from auth.users
on conflict (id) do update set
  email = excluded.email,
  full_name = excluded.full_name,
  document = excluded.document,
  phone_code = excluded.phone_code,
  phone_prefix = excluded.phone_prefix,
  phone = excluded.phone,
  phone_international = excluded.phone_international,
  accepted_terms = excluded.accepted_terms,
  updated_at = now();

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'users'
      and policyname = 'Users can read own profile'
  ) then
    create policy "Users can read own profile"
    on public.users
    for select
    using ((select auth.uid()) = id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'users'
      and policyname = 'Users can update own profile'
  ) then
    create policy "Users can update own profile"
    on public.users
    for update
    using ((select auth.uid()) = id)
    with check ((select auth.uid()) = id);
  end if;
end;
$$;
