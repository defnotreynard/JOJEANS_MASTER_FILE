-- Clean up old role entries for deleted users
DELETE FROM user_roles 
WHERE user_id IN ('cb1ef362-2ed6-47ff-8007-d131b2ef90c8', '54dc7509-3d89-4e5b-b3bb-bae7bca3c577');

-- Add roles for new admin accounts
INSERT INTO user_roles (user_id, role) VALUES 
('ed737512-1007-4029-8f51-109d3c3a532a', 'super_admin'),
('db2f8eec-42bb-4156-b70b-8d9f1c6bb382', 'admin');