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

select
  id,
  email,
  full_name,
  document,
  phone_international,
  role,
  status,
  created_at
from public.users
order by created_at desc;
