-- Create super-admin account
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'superadmin@jojeans.com',
  crypt('SuperAdmin123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"full_name": "Super Administrator", "phone_number": "+1234567890"}',
  false,
  'authenticated'
);

-- Create admin account
INSERT INTO auth.users (
  id,
  instance_id,
  email,  
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@jojeans.com',
  crypt('Admin123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"full_name": "Administrator", "phone_number": "+1234567891"}',
  false,
  'authenticated'
);

-- Get the user IDs for role assignment
WITH super_admin_user AS (
  SELECT id FROM auth.users WHERE email = 'superadmin@jojeans.com'
),
admin_user AS (
  SELECT id FROM auth.users WHERE email = 'admin@jojeans.com'
)
-- Insert profiles for both users (will be handled by trigger)
-- Insert roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'super_admin'::app_role FROM super_admin_user
UNION ALL
SELECT id, 'admin'::app_role FROM admin_user;