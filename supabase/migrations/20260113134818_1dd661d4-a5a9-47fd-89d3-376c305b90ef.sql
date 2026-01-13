-- Add blocker_type column to track who initiated the block (admin or user)
ALTER TABLE public.blocked_chat_users 
ADD COLUMN blocker_type text NOT NULL DEFAULT 'admin';

-- Update existing RLS policies to allow users to block admins
DROP POLICY IF EXISTS "Admins can block users" ON public.blocked_chat_users;
DROP POLICY IF EXISTS "Admins can unblock users" ON public.blocked_chat_users;
DROP POLICY IF EXISTS "Admins can view blocked users" ON public.blocked_chat_users;
DROP POLICY IF EXISTS "Users can check own block status" ON public.blocked_chat_users;

-- Admins can view all blocked users
CREATE POLICY "Admins can view all blocked users" 
ON public.blocked_chat_users 
FOR SELECT 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'super_admin'::app_role)
);

-- Users can view their own block status
CREATE POLICY "Users can view own block status" 
ON public.blocked_chat_users 
FOR SELECT 
USING (user_id = auth.uid() OR blocked_by = auth.uid());

-- Admins can block users (blocker_type = 'admin')
CREATE POLICY "Admins can block users" 
ON public.blocked_chat_users 
FOR INSERT 
WITH CHECK (
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role))
  AND blocker_type = 'admin'
);

-- Users can block admins (blocker_type = 'user')
CREATE POLICY "Users can block admins" 
ON public.blocked_chat_users 
FOR INSERT 
WITH CHECK (
  blocked_by = auth.uid() 
  AND blocker_type = 'user'
);

-- Admins can only unblock their own blocks
CREATE POLICY "Admins can unblock their own blocks" 
ON public.blocked_chat_users 
FOR DELETE 
USING (
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role))
  AND blocker_type = 'admin'
);

-- Users can only unblock their own blocks
CREATE POLICY "Users can unblock their own blocks" 
ON public.blocked_chat_users 
FOR DELETE 
USING (
  blocked_by = auth.uid() 
  AND blocker_type = 'user'
);