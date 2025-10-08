-- Create events table
CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  reference_id text NOT NULL UNIQUE,
  event_type text NOT NULL,
  guest_count integer,
  guest_count_range text,
  event_date date,
  event_time time,
  date_flexible boolean DEFAULT false,
  venue_booked boolean,
  venue_location text,
  budget_amount decimal,
  budget_range text,
  status text DEFAULT 'active',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own events" 
ON public.events 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own events" 
ON public.events 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own events" 
ON public.events 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own events" 
ON public.events 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add trigger for timestamps
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to generate reference ID
CREATE OR REPLACE FUNCTION generate_event_reference()
RETURNS TEXT AS $$
BEGIN
  RETURN 'EVT-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8));
END;
$$ LANGUAGE plpgsql;