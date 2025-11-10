-- Create guests table for managing event guest lists
CREATE TABLE public.guests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  rsvp_status TEXT NOT NULL DEFAULT 'pending',
  meal_preference TEXT,
  group_name TEXT,
  table_number INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

-- Create policies for guest access
CREATE POLICY "Users can view their own guests"
ON public.guests
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own guests"
ON public.guests
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own guests"
ON public.guests
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own guests"
ON public.guests
FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all guests"
ON public.guests
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Admins can update all guests"
ON public.guests
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_guests_updated_at
BEFORE UPDATE ON public.guests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_guests_event_id ON public.guests(event_id);
CREATE INDEX idx_guests_user_id ON public.guests(user_id);
CREATE INDEX idx_guests_rsvp_status ON public.guests(rsvp_status);