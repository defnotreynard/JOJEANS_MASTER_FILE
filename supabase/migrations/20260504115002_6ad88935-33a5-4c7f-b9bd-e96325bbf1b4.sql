CREATE POLICY "Users can insert their own ai messages"
ON public.messages
FOR INSERT
WITH CHECK (auth.uid() = user_id AND sender_type = 'ai');