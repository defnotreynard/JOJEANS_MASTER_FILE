-- Clear existing incorrect role assignments
DELETE FROM user_roles 
WHERE user_id NOT IN ('de1dcba5-5d40-49b2-af6e-faabc83f5691', '93689c24-b048-4257-8491-24fcd6a97e67');

-- Assign admin role to admin@jojeans.com
INSERT INTO user_roles (user_id, role)
VALUES ('de1dcba5-5d40-49b2-af6e-faabc83f5691', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Assign super_admin role to superadmin@jojeans.com
INSERT INTO user_roles (user_id, role)
VALUES ('93689c24-b048-4257-8491-24fcd6a97e67', 'super_admin')
ON CONFLICT (user_id, role) DO NOTHING;