/**
 * Testimonial Server Actions
 * =========================
 *
 * Handles server-side operations for testimonials including:
 * - Submitting new testimonials (with moderation)
 * - Fetching approved testimonials for display
 *
 * Features:
 * - Form validation with Zod
 * - Moderation system (new testimonials require approval)
 * - Type-safe database operations
 * - Proper error handling
 */

"use server"

import { supabase, hasSupabase } from "@/lib/db"
import { TABLE_NAMES, type Testimonial } from "@/lib/schema"
import { z } from "zod"

/* ------------------------------------------------------------------ */
/* Validation Schema for Testimonial Submissions                      */
/* ------------------------------------------------------------------ */

const testimonialFormSchema = z.object({
  client_name: z.string().min(2, "Name must be at least 2 characters."),
  comment: z.string().min(20, "Comment must be at least 20 characters."),
  rating: z
    .union([z.string(), z.number()])
    .transform((v) => {
      // Handle empty rating (optional field)
      if (v === "" || v === undefined || v === null) return undefined
      return Number(v)
    })
    .refine((v) => v === undefined || (v >= 1 && v <= 5), {
      message: "Rating must be between 1 and 5 stars.",
    })
    .optional(),
})

/* ------------------------------------------------------------------ */
/* Submit Testimonial Server Action                                   */
/* ------------------------------------------------------------------ */

/**
 * Submit Testimonial Server Action
 *
 * Processes new testimonial submissions. All new testimonials are marked
 * as unapproved and require admin moderation before appearing on the site.
 *
 * @param _prevState - Previous form state (required for useActionState)
 * @param formData - Form data from testimonial submission
 * @returns Success/error response with user feedback
 */
export async function submitTestimonial(_prevState: unknown, formData: FormData) {
  // Check database configuration
  if (!hasSupabase) {
    return {
      success: false,
      message: "Service unavailable. Please try again later.",
    }
  }

  // Extract and validate form data
  const rawData = {
    client_name: formData.get("client_name"),
    comment: formData.get("comment"),
    rating: formData.get("rating"),
  }

  const validation = testimonialFormSchema.safeParse(rawData)

  if (!validation.success) {
    return {
      success: false,
      message: "Please check your form entries and try again.",
      errors: validation.error.flatten().fieldErrors,
    }
  }

  const { client_name, comment, rating } = validation.data

  try {
    // Insert testimonial with approved = false (requires moderation)
    const { error } = await supabase!.from(TABLE_NAMES.TESTIMONIALS).insert({
      client_name,
      comment,
      rating: rating ?? null, // Convert undefined to null for database
      approved: false, // All new testimonials require approval
    })

    if (error) {
      console.error("Database error (testimonial submission):", error)
      return {
        success: false,
        message: "Failed to submit testimonial. Please try again later.",
      }
    }

    return {
      success: true,
      message: "Thank you for your feedback! Your testimonial will be reviewed and published shortly.",
    }
  } catch (err) {
    console.error("Unexpected error submitting testimonial:", err)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}

/* ------------------------------------------------------------------ */
/* Fetch Approved Testimonials Server Action                         */
/* ------------------------------------------------------------------ */

/**
 * Get Approved Testimonials
 *
 * Fetches all approved testimonials for display on the website.
 * Orders them by creation date (newest first).
 *
 * @returns Array of approved testimonials or empty array if none/error
 */
export async function getApprovedTestimonials() {
  // Handle missing database configuration gracefully
  if (!hasSupabase) {
    return {
      success: true,
      data: [] as Testimonial[],
      message: "Testimonials unavailable.",
    }
  }

  try {
    const { data, error } = await supabase!
      .from(TABLE_NAMES.TESTIMONIALS)
      .select("id, client_name, comment, rating, created_at")
      .eq("approved", true) // Only fetch approved testimonials
      .order("created_at", { ascending: false }) // Newest first

    if (error) {
      console.error("Database error (fetching testimonials):", error)
      return {
        success: false,
        data: [] as Testimonial[],
        message: "Failed to load testimonials.",
      }
    }

    return {
      success: true,
      data: (data as Testimonial[]) ?? [],
    }
  } catch (err) {
    console.error("Unexpected error fetching testimonials:", err)
    return {
      success: false,
      data: [] as Testimonial[],
      message: "Failed to load testimonials.",
    }
  }
}
