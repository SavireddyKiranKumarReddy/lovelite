
-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create onboarding_responses table
CREATE TABLE public.onboarding_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  responses JSONB DEFAULT '{}',
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on onboarding_responses
ALTER TABLE public.onboarding_responses ENABLE ROW LEVEL SECURITY;

-- Onboarding policies
CREATE POLICY "Users can view their own onboarding" ON public.onboarding_responses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding" ON public.onboarding_responses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding" ON public.onboarding_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create couples table
CREATE TABLE public.couples (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner1_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  partner2_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  invite_code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  connected_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on couples
ALTER TABLE public.couples ENABLE ROW LEVEL SECURITY;

-- Couples policies
CREATE POLICY "Users can view their couple" ON public.couples
  FOR SELECT USING (auth.uid() = partner1_id OR auth.uid() = partner2_id);

CREATE POLICY "Users can create a couple" ON public.couples
  FOR INSERT WITH CHECK (auth.uid() = partner1_id);

CREATE POLICY "Users can update their couple" ON public.couples
  FOR UPDATE USING (auth.uid() = partner1_id OR auth.uid() = partner2_id);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_onboarding_updated_at
  BEFORE UPDATE ON public.onboarding_responses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.onboarding_responses (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
