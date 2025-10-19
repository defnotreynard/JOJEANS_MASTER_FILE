-- Create website_settings table
CREATE TABLE IF NOT EXISTS public.website_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for website_settings
CREATE POLICY "Admins can view all settings"
  ON public.website_settings
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Admins can insert settings"
  ON public.website_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Admins can update settings"
  ON public.website_settings
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Admins can delete settings"
  ON public.website_settings
  FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_website_settings_updated_at
  BEFORE UPDATE ON public.website_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.website_settings (setting_key, setting_value) VALUES
  ('general', '{"site_name": "JOJEANS Events", "tagline": "Creating Unforgettable Moments", "description": "Professional event planning and management services"}'::jsonb),
  ('contact', '{"email": "info@jojeans.com", "phone": "+1234567890", "address": "123 Event Street, City, Country"}'::jsonb),
  ('social_media', '{"facebook": "", "instagram": "", "twitter": "", "youtube": "", "tiktok": ""}'::jsonb),
  ('business_hours', '{"monday": "9:00 AM - 6:00 PM", "tuesday": "9:00 AM - 6:00 PM", "wednesday": "9:00 AM - 6:00 PM", "thursday": "9:00 AM - 6:00 PM", "friday": "9:00 AM - 6:00 PM", "saturday": "10:00 AM - 4:00 PM", "sunday": "Closed"}'::jsonb),
  ('seo', '{"meta_description": "Professional event planning services for weddings, corporate events, and celebrations", "meta_keywords": "event planning, wedding planning, corporate events"}'::jsonb)
ON CONFLICT (setting_key) DO NOTHING;