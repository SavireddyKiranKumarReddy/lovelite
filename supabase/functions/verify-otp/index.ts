import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerifyOtpRequest {
  email: string;
  code: string;
  fullName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { email, code, fullName }: VerifyOtpRequest = await req.json();

    if (!email || !code) {
      return new Response(JSON.stringify({ error: "Email and code are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Find valid OTP
    const { data: otpRecord, error: otpError } = await supabase
      .from("otp_codes")
      .select("*")
      .eq("email", email.toLowerCase())
      .eq("code", code)
      .eq("used", false)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (otpError || !otpRecord) {
      return new Response(JSON.stringify({ error: "Invalid or expired verification code" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Mark OTP as used
    await supabase.from("otp_codes").update({ used: true }).eq("id", otpRecord.id);

    // Check if user exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    );

    let session;

    if (existingUser) {
      // User exists - generate a session for them
      const { data: signInData, error: signInError } =
        await supabase.auth.admin.generateLink({
          type: "magiclink",
          email: email.toLowerCase(),
        });

      if (signInError) {
        console.error("Sign in error:", signInError);
        return new Response(JSON.stringify({ error: "Failed to sign in" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Extract token from the link and exchange it for a session
      const url = new URL(signInData.properties.action_link);
      const token = url.searchParams.get("token");
      const type = url.searchParams.get("type");

      if (token && type) {
        const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: type as "magiclink",
        });

        if (verifyError) {
          // Fallback: Create a new session directly
          const { data: sessionData, error: sessionError } = 
            await supabase.auth.admin.createUser({
              email: email.toLowerCase(),
              email_confirm: true,
              user_metadata: { full_name: fullName || existingUser.user_metadata?.full_name },
            });
          
          // User already exists, so we need another approach
        }
        
        session = verifyData?.session;
      }

      // If we couldn't get a session, return success and let frontend handle it
      if (!session) {
        return new Response(
          JSON.stringify({
            success: true,
            isNewUser: false,
            message: "Verified successfully. Please complete sign in.",
            userId: existingUser.id,
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    } else {
      // Create new user
      const { data: createData, error: createError } = await supabase.auth.admin.createUser({
        email: email.toLowerCase(),
        email_confirm: true,
        user_metadata: { full_name: fullName || "" },
      });

      if (createError) {
        console.error("Create user error:", createError);
        return new Response(JSON.stringify({ error: "Failed to create account" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Generate session for new user
      const { data: signInData, error: signInError } =
        await supabase.auth.admin.generateLink({
          type: "magiclink",
          email: email.toLowerCase(),
        });

      if (!signInError && signInData) {
        const url = new URL(signInData.properties.action_link);
        const token = url.searchParams.get("token");
        
        if (token) {
          const { data: verifyData } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: "magiclink",
          });
          session = verifyData?.session;
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          isNewUser: true,
          userId: createData.user.id,
          session,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        session,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("Error in verify-otp function:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);
