import { createBrowserClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

/**
 * Browser-side Supabase client.
 * Uses `@supabase/ssr` when environment variables are set.
 * Falls back to an in-memory/dummy client during offline or unconfigured hackathon testing
 * so components never throw undefined-reference exceptions.
 */
export function createClient() {
  if (!isSupabaseConfigured) {
    if (typeof window !== 'undefined') {
      console.warn(
        '[OpsFlow] Supabase environment variables not configured. Falling back to local/mock state.'
      );
    }
    // Return a dummy client instance to avoid SSR or client-side runtime crashes
    return createSupabaseClient<Database>(
      'https://placeholder.supabase.co',
      'dummy-key'
    );
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

export const supabase = createClient();
