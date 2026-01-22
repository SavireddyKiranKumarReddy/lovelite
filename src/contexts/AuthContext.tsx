import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  sendOtp: (email: string) => Promise<{ error: Error | null }>;
  verifyOtp: (email: string, code: string, fullName?: string) => Promise<{ error: Error | null; isNewUser?: boolean }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const sendOtp = async (email: string) => {
    try {
      const response = await supabase.functions.invoke('send-otp', {
        body: { email },
      });

      if (response.error) {
        return { error: new Error(response.error.message) };
      }

      if (response.data?.error) {
        return { error: new Error(response.data.error) };
      }

      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('Failed to send code') };
    }
  };

  const verifyOtp = async (email: string, code: string, fullName?: string) => {
    try {
      const response = await supabase.functions.invoke('verify-otp', {
        body: { email, code, fullName },
      });

      if (response.error) {
        return { error: new Error(response.error.message) };
      }

      if (response.data?.error) {
        return { error: new Error(response.data.error) };
      }

      // If we got a session back, set it
      if (response.data?.session) {
        await supabase.auth.setSession(response.data.session);
      } else {
        // For existing users, we might need to do a sign in
        // The verify-otp function has already verified the code
        // We can use signInWithOtp with a magic link approach
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: false,
          },
        });
        
        // Even if this errors, the OTP was verified, so we check session
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session) {
          setSession(sessionData.session);
          setUser(sessionData.session.user);
        }
      }

      return { error: null, isNewUser: response.data?.isNewUser };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('Failed to verify code') };
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        sendOtp,
        verifyOtp,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
