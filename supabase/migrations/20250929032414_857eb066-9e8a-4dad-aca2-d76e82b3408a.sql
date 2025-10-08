-- Delete existing admin accounts (this will cascade to profiles and user_roles)
DELETE FROM auth.users 
WHERE id IN ('cb1ef362-2ed6-47ff-8007-d131b2ef90c8', '54dc7509-3d89-4e5b-b3bb-bae7bca3c577');