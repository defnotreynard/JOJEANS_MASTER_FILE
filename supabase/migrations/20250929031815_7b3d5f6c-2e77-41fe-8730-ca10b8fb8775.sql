-- Assign roles to existing admin accounts
INSERT INTO public.user_roles (user_id, role) VALUES
  ('cb1ef362-2ed6-47ff-8007-d131b2ef90c8', 'super_admin'),
  ('54dc7509-3d89-4e5b-b3bb-bae7bca3c577', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;