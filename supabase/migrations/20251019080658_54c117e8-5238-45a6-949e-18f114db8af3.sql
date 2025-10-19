-- Function to check if a user is a regular user (not admin or super_admin)
CREATE OR REPLACE FUNCTION public.is_regular_user(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NOT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'super_admin')
  )
$$;

-- Function to create notifications for all admins
CREATE OR REPLACE FUNCTION public.notify_admins(
  _title text,
  _message text,
  _type text DEFAULT 'info',
  _link text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type, link)
  SELECT ur.user_id, _title, _message, _type, _link
  FROM public.user_roles ur
  WHERE ur.role IN ('admin', 'super_admin');
END;
$$;

-- Function to handle new event notifications
CREATE OR REPLACE FUNCTION public.handle_new_event_notification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_name text;
BEGIN
  -- Only notify if the user is a regular user (not admin/super_admin)
  IF public.is_regular_user(NEW.user_id) THEN
    -- Get user name from profiles
    SELECT full_name INTO user_name
    FROM public.profiles
    WHERE user_id = NEW.user_id;
    
    -- If no name found, use email or 'A user'
    IF user_name IS NULL OR user_name = '' THEN
      user_name := 'A user';
    END IF;
    
    -- Notify all admins about the new event
    PERFORM public.notify_admins(
      '📅 New Event Created',
      user_name || ' created a new ' || NEW.event_type || ' event (Ref: ' || NEW.reference_id || ')',
      'info',
      '/admin/events'
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Function to handle event update notifications
CREATE OR REPLACE FUNCTION public.handle_event_update_notification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_name text;
  changes text := '';
BEGIN
  -- Only notify if the user is a regular user (not admin/super_admin)
  IF public.is_regular_user(NEW.user_id) THEN
    -- Get user name from profiles
    SELECT full_name INTO user_name
    FROM public.profiles
    WHERE user_id = NEW.user_id;
    
    -- If no name found, use email or 'A user'
    IF user_name IS NULL OR user_name = '' THEN
      user_name := 'A user';
    END IF;
    
    -- Build change description
    IF OLD.event_date IS DISTINCT FROM NEW.event_date THEN
      changes := 'event date';
    END IF;
    
    IF OLD.event_time IS DISTINCT FROM NEW.event_time THEN
      IF changes != '' THEN
        changes := changes || ', event time';
      ELSE
        changes := 'event time';
      END IF;
    END IF;
    
    IF OLD.guest_count IS DISTINCT FROM NEW.guest_count OR OLD.guest_count_range IS DISTINCT FROM NEW.guest_count_range THEN
      IF changes != '' THEN
        changes := changes || ', guest count';
      ELSE
        changes := 'guest count';
      END IF;
    END IF;
    
    IF OLD.venue_location IS DISTINCT FROM NEW.venue_location THEN
      IF changes != '' THEN
        changes := changes || ', venue location';
      ELSE
        changes := 'venue location';
      END IF;
    END IF;
    
    IF OLD.budget_amount IS DISTINCT FROM NEW.budget_amount OR OLD.budget_range IS DISTINCT FROM NEW.budget_range THEN
      IF changes != '' THEN
        changes := changes || ', budget';
      ELSE
        changes := 'budget';
      END IF;
    END IF;
    
    IF OLD.services IS DISTINCT FROM NEW.services THEN
      IF changes != '' THEN
        changes := changes || ', services';
      ELSE
        changes := 'services';
      END IF;
    END IF;
    
    -- Only notify if there are actual changes
    IF changes != '' THEN
      PERFORM public.notify_admins(
        '✏️ Event Updated',
        user_name || ' updated their ' || NEW.event_type || ' event (' || changes || ') - Ref: ' || NEW.reference_id,
        'info',
        '/admin/events'
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for new events
DROP TRIGGER IF EXISTS on_event_created ON public.events;
CREATE TRIGGER on_event_created
  AFTER INSERT ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_event_notification();

-- Create trigger for event updates
DROP TRIGGER IF EXISTS on_event_updated ON public.events;
CREATE TRIGGER on_event_updated
  AFTER UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_event_update_notification();

-- Enable realtime for notifications table
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;