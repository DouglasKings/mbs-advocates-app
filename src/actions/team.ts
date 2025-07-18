/**
 * Team Member Server Actions
 * =========================
 *
 * Handles server-side operations for team members including:
 * - Fetching all team members for display
 *
 * Features:
 * - Type-safe database operations
 * - Proper error handling
 */

"use server"

import { supabase, hasSupabase } from "@/lib/db"
import { TABLE_NAMES, type TeamMember } from "@/lib/schema"

/* ------------------------------------------------------------------ */
/* Fetch Team Members Server Action                                   */
/* ------------------------------------------------------------------ */

/**
 * Get Team Members
 *
 * Fetches all team members from the database.
 * Orders them by the 'order' column (if available), then by creation date.
 *
 * @returns Array of team members or empty array if none/error
 */
export async function getTeamMembers() {
  // Handle missing database configuration gracefully
  if (!hasSupabase) {
    console.error("Supabase not configured. Cannot fetch team members.")
    return {
      success: false,
      data: [] as TeamMember[],
      message: "Team members unavailable due to database configuration.",
    }
  }

  try {
    const { data, error } = await supabase!
      .from(TABLE_NAMES.TEAM_MEMBERS)
      .select("id, name, title, description, image_url, image_alt, order, created_at")
      .order("order", { ascending: true }) // Order by custom order
      .order("created_at", { ascending: false }) // Fallback order by newest first

    if (error) {
      console.error("Database error (fetching team members):", error)
      return {
        success: false,
        data: [] as TeamMember[],
        message: "Failed to load team members.",
      }
    }

    return {
      success: true,
      data: (data as TeamMember[]) ?? [],
    }
  } catch (err) {
    console.error("Unexpected error fetching team members:", err)
    return {
      success: false,
      data: [] as TeamMember[],
      message: "Failed to load team members.",
    }
  }
}
