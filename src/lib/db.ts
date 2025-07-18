/**
 * Supabase Database Client Configuration
 * ====================================
 *
 * This file initializes and exports the Supabase client for database operations.
 * It includes proper error handling for missing environment variables and uses
 * a singleton pattern to ensure only one client instance exists.
 *
 * Environment Variables Required:
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anonymous key
 *
 * Usage:
 * - Server Actions: Use this client for secure database operations
 * - Client Components: Can use for read operations (with RLS policies)
 */

import { createClient } from "@supabase/supabase-js"

// Retrieve Supabase configuration from environment variables
// These are prefixed with NEXT_PUBLIC_ to be accessible on the client-side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if Supabase environment variables are properly configured
export const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey)

// Initialize the Supabase client only if both URL and key are available
// Using non-null assertion (!) because hasSupabase ensures they are present
export const supabase = hasSupabase ? createClient(supabaseUrl!, supabaseAnonKey!) : null

// Log configuration status during development (only in development mode)
if (process.env.NODE_ENV === "development") {
  console.log("Supabase configuration:", {
    configured: hasSupabase,
    url: supabaseUrl ? "Set" : "Missing",
    key: supabaseAnonKey ? "Set" : "Missing",
  })
}
