/**
 * Service Server Actions
 * =====================
 *
 * Handles server-side operations for legal services including:
 * - Fetching all services for display
 *
 * Features:
 * - Type-safe database operations
 * - Proper error handling
 */

"use server"

import { supabase, hasSupabase } from "@/lib/db"
import { TABLE_NAMES, type Service } from "@/lib/schema"

/* ------------------------------------------------------------------ */
/* Fetch Services Server Action                                       */
/* ------------------------------------------------------------------ */

/**
 * Get Services
 *
 * Fetches all legal services from the database.
 * Orders them by the 'order' column (if available), then by creation date.
 *
 * @returns Array of services or empty array if none/error
 */
export async function getServices() {
  // Handle missing database configuration gracefully
  if (!hasSupabase) {
    console.error("Supabase not configured. Cannot fetch services.")
    return {
      success: false,
      data: [] as Service[],
      message: "Services unavailable due to database configuration.",
    }
  }

  try {
    const { data, error } = await supabase!
      .from(TABLE_NAMES.SERVICES)
      .select("id, title, description, content, order, created_at")
      .order("order", { ascending: true }) // Order by custom order
      .order("created_at", { ascending: false }) // Fallback order by newest first

    if (error) {
      console.error("Database error (fetching services):", error)
      return {
        success: false,
        data: [] as Service[],
        message: "Failed to load services.",
      }
    }

    return {
      success: true,
      data: (data as Service[]) ?? [],
    }
  } catch (err) {
    console.error("Unexpected error fetching services:", err)
    return {
      success: false,
      data: [] as Service[],
      message: "Failed to load services.",
    }
  }
}
