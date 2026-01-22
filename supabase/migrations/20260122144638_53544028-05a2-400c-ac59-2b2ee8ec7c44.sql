-- Remove overly permissive policy; service role bypasses RLS so no policy is needed
DROP POLICY IF EXISTS "Service role can manage OTP codes" ON public.otp_codes;