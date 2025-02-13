import { supabase } from '@/lib/supabase';

export interface AuthResponse {
  success: boolean;
  error?: string;
}

export const authService = {
  signUp: async (email: string, password: string, username: string): Promise<AuthResponse> => {
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError || !authData.user) {
        throw signUpError || new Error('Sign up failed');
      }

      // Insert into profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            username: username,
          },
        ]);

      if (profileError) {
        // If profile creation fails, we should clean up the auth user
        await supabase.auth.signOut();
        throw profileError;
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred during sign up',
      };
    }
  },

  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred during sign in',
      };
    }
  },

  signOut: async (): Promise<AuthResponse> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred during sign out',
      };
    }
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single();

    return {
      id: user.id,
      email: user.email,
      username: profile?.username
    };
  },
}; 