/**
 * Team Member Server Actions
 * =========================
 *
 * Handles all server-side database operations related to team members.
 * This includes fetching all members for the main page and fetching a
 * single member by their unique ID for the detail page.
 */

"use server";

import { supabase, hasSupabase } from "@/lib/db";
import { TABLE_NAMES, type TeamMember } from "@/lib/schema";

/* ================================================================= */
/*                  Fetch All Team Members                           */
/* ================================================================= */
export async function getTeamMembers() {
  // Gracefully handle the case where Supabase is not configured.
  if (!hasSupabase) {
    console.error("getTeamMembers Error: Supabase client is not available. Check your .env.local file.");
    return { success: false, data: [] as TeamMember[], message: "Database not configured." };
  }

  try {
    // Perform the database query to get all team members.
    const { data, error } = await supabase!
      .from(TABLE_NAMES.TEAM_MEMBERS)
      .select("*")
      .order("order", { ascending: true })
      .order("created_at", { ascending: false });

    // --- THIS IS THE CRITICAL DEBUGGING STEP ---
    // If the query returns an error, log it to the terminal in detail.
    if (error) {
      console.error("Supabase Database Error (fetching team members):", error.message);
      return { success: false, data: [] as TeamMember[], message: `Database error: ${error.message}` };
    }

    // If the query is successful but returns no data, log that information.
    if (!data || data.length === 0) {
      console.log("Supabase Info: The query was successful, but no team members were found in the database.");
    }

    // If successful, return the data.
    return { success: true, data: (data as TeamMember[]) ?? [] };
  } catch (err) {
    // Catch any other unexpected errors during the process.
    console.error("Unexpected Error in getTeamMembers:", err);
    return { success: false, data: [] as TeamMember[], message: "An unexpected server error occurred." };
  }
}

/* ================================================================= */
/*                  Fetch a Single Team Member by ID                 */
/* ================================================================= */
export async function getTeamMemberById(id: string) {
  if (!hasSupabase) {
    console.error("getTeamMemberById Error: Supabase client is not available.");
    return { success: false, data: null, message: "Database not configured." };
  }
  if (!id || typeof id !== "string") {
    return { success: false, data: null, message: "Invalid ID provided." };
  }

  try {
    const { data, error } = await supabase!
      .from(TABLE_NAMES.TEAM_MEMBERS)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Supabase Database Error (fetching team member with ID ${id}):`, error.message);
      return { success: false, data: null, message: "Team member not found." };
    }

    return { success: true, data: data as TeamMember | null };
  } catch (err) {
    console.error(`Unexpected error in getTeamMemberById for ID ${id}:`, err);
    return { success: false, data: null, message: "An unexpected server error occurred." };
  }
}