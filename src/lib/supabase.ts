import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock client if Supabase is not configured
const createMockSupabaseClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signUp: () => Promise.resolve({ data: { user: null }, error: { message: 'Supabase not configured' } }),
    signInWithPassword: () => Promise.resolve({ data: { user: null }, error: { message: 'Supabase not configured' } }),
    signOut: () => Promise.resolve({ error: null })
  }
})

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockSupabaseClient()

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)