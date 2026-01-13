-- Create a table to store blocked chat users
CREATE TABLE public.blocked_chat_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  blocked_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint to prevent duplicate blocks
CREATE UNIQUE INDEX idx_blocked_chat_users_unique ON public.blocked_chat_users(user_id, blocked_by);

-- Enable RLS
ALTER TABLE public.blocked_chat_users ENABLE ROW LEVEL SECURITY;

-- Admins can view all blocked users
CREATE POLICY "Admins can view blocked users"
ON public.blocked_chat_users
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'super_admin')
  )
);

-- Admins can block users
CREATE POLICY "Admins can block users"
ON public.blocked_chat_users
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'super_admin')
  )
);

-- Admins can unblock users
CREATE POLICY "Admins can unblock users"
ON public.blocked_chat_users
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'super_admin')
  )
);

-- Users can check if they are blocked
CREATE POLICY "Users can check own block status"
ON public.blocked_chat_users
FOR SELECT
USING (user_id = auth.uid());