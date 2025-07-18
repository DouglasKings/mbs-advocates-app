/**
 * Authentication Server Actions
 * =============================
 *
 * Handles server-side authentication operations using Supabase Auth.
 * Includes actions for signing in and signing out users.
 *
 * Features:
 * - Secure user authentication
 * - Session management
 * - Error handling for authentication failures
 */

"use server"

import { supabase, hasSupabase } from "@/lib/db"
import { redirect } from "next/navigation"
import { z } from "zod"

/* ------------------------------------------------------------------ */
/* Validation Schema for Login                                        */
/* ------------------------------------------------------------------ */

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
})

const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Path of error
  })

/* ------------------------------------------------------------------ */
/* Sign In Server Action                                              */
/* ------------------------------------------------------------------ */

/**
 * Handles user sign-in.
 *
 * @param _prevState - Previous form state (required for useActionState)
 * @param formData - Form data containing email and password
 * @returns Object with success status and message
 */
export async function signIn(_prevState: unknown, formData: FormData) {
  if (!hasSupabase) {
    return { success: false, message: "Authentication service unavailable." }
  }

  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const validation = loginSchema.safeParse(rawData)

  if (!validation.success) {
    return {
      success: false,
      message: "Invalid email or password format.",
      errors: validation.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validation.data

  try {
    const { error } = await supabase!.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Supabase sign-in error:", error.message)
      return { success: false, message: "Invalid credentials. Please try again." }
    }

    // Redirect to admin dashboard on successful login
    redirect("/admin/dashboard")
  } catch (err) {
    console.error("Unexpected error during sign-in:", err)
    return { success: false, message: "An unexpected error occurred during login." }
  }
}

/* ------------------------------------------------------------------ */
/* Sign Out Server Action                                             */
/* ------------------------------------------------------------------ */

/**
 * Handles user sign-out.
 *
 * @returns Redirects to the login page after signing out.
 */
export async function signOut() {
  if (hasSupabase) {
    await supabase!.auth.signOut()
  }
  redirect("/admin") // Redirect to admin login page
}

/* ------------------------------------------------------------------ */
/* Update Password Server Action                                      */
/* ------------------------------------------------------------------ */

/**
 * Handles updating the user's password.
 * This action is typically called from a password reset page.
 *
 * @param _prevState - Previous form state (required for useActionState)
 * @param formData - Form data containing new password and confirmation
 * @returns Object with success status and message
 */
export async function updatePassword(_prevState: unknown, formData: FormData) {
  if (!hasSupabase) {
    return { success: false, message: "Authentication service unavailable." }
  }

  const rawData = {
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  }

  const validation = passwordSchema.safeParse(rawData)

  if (!validation.success) {
    return {
      success: false,
      message: "Please check your password entries.",
      errors: validation.error.flatten().fieldErrors,
    }
  }

  const { password } = validation.data

  try {
    const { error } = await supabase!.auth.updateUser({
      password,
    })

    if (error) {
      console.error("Supabase password update error:", error.message)
      return { success: false, message: "Failed to update password. Please try again." }
    }

    // Supabase automatically signs the user in after a password update
    return { success: true, message: "Password updated successfully!" }
  } catch (err) {
    console.error("Unexpected error during password update:", err)
    return { success: false, message: "An unexpected error occurred during password update." }
  }
}
