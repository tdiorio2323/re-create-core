-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('creator-content', 'creator-content', true),
  ('profiles', 'profiles', true),
  ('messages', 'messages', false);

-- Storage policies for creator content
CREATE POLICY "Public content access" ON storage.objects
  FOR SELECT USING (bucket_id = 'creator-content');

CREATE POLICY "Creators can upload content" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'creator-content' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Creators can update their content" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'creator-content' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for profiles
CREATE POLICY "Profile images public access" ON storage.objects
  FOR SELECT USING (bucket_id = 'profiles');

CREATE POLICY "Users can upload profile images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'profiles' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for private messages
CREATE POLICY "Message files private access" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'messages' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload message files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'messages' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Enable realtime for key tables
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.creator_content REPLICA IDENTITY FULL;
ALTER TABLE public.subscriptions REPLICA IDENTITY FULL;
ALTER TABLE public.transactions REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.creator_content;
ALTER PUBLICATION supabase_realtime ADD TABLE public.subscriptions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;

-- Create messages table for real-time messaging
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL,
  receiver_id UUID NOT NULL,
  content TEXT,
  file_url TEXT,
  message_type TEXT DEFAULT 'text',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_read BOOLEAN DEFAULT false
);

-- Enable RLS on messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Messages policies
CREATE POLICY "Users can view their messages" ON public.messages
  FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id
  );

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their messages" ON public.messages
  FOR UPDATE USING (auth.uid() = sender_id);

-- Add messages to realtime
ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Create message triggers for updated_at
CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();