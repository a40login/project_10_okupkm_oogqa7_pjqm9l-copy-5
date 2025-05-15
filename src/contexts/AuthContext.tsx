import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User, AuthError, SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { TablesInsert } from '@/integrations/supabase/types'; // Import TablesInsert

interface SignUpParams {
  email: string;
  password: string;
  options?: SignUpWithPasswordCredentials['options']; // Behalte die options optional
  firstName: string;
  lastName: string;
}

interface SignUpResult {
  user: User | null;
  session: Session | null;
  profile: TablesInsert<'user_profiles'> | null; // Use TablesInsert for profile type
  error: AuthError | Error | null; // Can be AuthError or generic Error
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: typeof supabase.auth.signInWithPassword;
  signUp: (params: SignUpParams) => Promise<SignUpResult>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      // if (_event === 'SIGNED_IN' && session) {
      // }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    navigate('/login');
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const signUp = async (params: SignUpParams): Promise<SignUpResult> => {
    const { email, password, firstName, lastName } = params;

    // 1. Create user in auth.users
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      // options: { data: { first_name: firstName, last_name: lastName } } // You can pass additional metadata here if needed
    });

    if (authError) {
      return { user: null, session: null, profile: null, error: authError };
    }

    if (!authData.user) {
      // This case might happen if email confirmation is required and user object is not immediately returned with session
      // Or if user already exists but is not confirmed.
      return { user: null, session: null, profile: null, error: new Error("User registration initiated, but no user data returned. Please check your email for confirmation.") };
    }
    
    // 2. Create profile in user_profiles table
    const profileData: TablesInsert<'user_profiles'> = {
      user_id: authData.user.id,
      first_name: firstName,
      last_name: lastName,
      email: authData.user.email, // Store email in profile for convenience
    };

    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .insert(profileData)
      .select()
      .single(); // Assuming you want the created profile back

    if (profileError) {
      // If profile creation fails, we have an auth user but no profile.
      // This is a state you might want to handle, e.g., by trying to delete the auth user or flagging for profile completion.
      // For now, we return the auth user data and the profile error.
      console.error("Error creating user profile:", profileError);
      return { user: authData.user, session: authData.session, profile: null, error: profileError };
    }

    return { user: authData.user, session: authData.session, profile, error: null };
  };


  const value = {
    user,
    session,
    isLoading,
    signIn: supabase.auth.signInWithPassword,
    signUp,
    signOut,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
