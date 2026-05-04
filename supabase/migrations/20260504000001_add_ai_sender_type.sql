-- Update messages table to support 'ai' sender_type
-- Drop existing constraint
ALTER TABLE public.messages DROP CONSTRAINT messages_sender_type_check;

-- Add new constraint that includes 'ai'
ALTER TABLE public.messages ADD CONSTRAINT messages_sender_type_check 
  CHECK (sender_type IN ('user', 'admin', 'ai'));

-- Update INSERT policy for users to allow 'ai' messages (since AI is triggered by user request)
DROP POLICY IF EXISTS "Users can insert their own messages" ON public.messages;

CREATE POLICY "Users can insert their own messages"
ON public.messages
FOR INSERT
WITH CHECK (auth.uid() = user_id AND (
  (auth.uid() = sender_id AND sender_type = 'user') OR
  (sender_id IS NULL AND sender_type = 'ai')
));

-- Update admin insert policy to allow 'ai' messages
DROP POLICY IF EXISTS "Admins can insert messages" ON public.messages;

CREATE POLICY "Admins can insert messages"
ON public.messages
FOR INSERT
WITH CHECK ((
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role)) AND sender_type = 'admin'
) OR (
  sender_type = 'ai' AND sender_id IS NULL
));
