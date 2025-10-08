-- Clean up the incorrect user role entries
DELETE FROM public.user_roles WHERE user_id IN (
  'cb1ef362-2ed6-47ff-8007-d131b2ef90c8',
  '54dc7509-3d89-4e5b-b3bb-bae7bca3c577'
);