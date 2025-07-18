/**
 * Contact Form Server Action
 * =========================
 *
 * This file handles secure server-side processing of contact form submissions.
 * Uses Next.js Server Actions for type-safe, secure database operations.
 *
 * Features:
 * - Zod schema validation for data integrity
 * - Secure database insertion via Supabase
 * - Proper error handling and user feedback
 * - Server-side only execution (no client-side exposure)
 * - **New:** Sends email notification upon successful submission.
 */

"use server"

import { supabase, hasSupabase } from "@/lib/db"
import { TABLE_NAMES } from "@/lib/schema"
import { z } from "zod"
import { sendEmail } from "./send-email" // Import the new email action

/* ------------------------------------------------------------------ */
/* Validation Schema - Ensures data integrity before database insert  */
/* ------------------------------------------------------------------ */

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
})

/* ------------------------------------------------------------------ */
/* Server Action - Processes contact form submissions                 */
/* ------------------------------------------------------------------ */

/**
 * Submit Contact Form Server Action
 *
 * Validates form data and inserts it into the database.
 * Returns success/error feedback for the client.
 * **Also sends an email notification to the admin.**
 *
 * @param _prev - Previous state (required for useActionState)
 * @param formData - Form data from the submission
 * @returns Object with success status and message
 */
export async function submitContactForm(_prev: unknown, formData: FormData) {
  // Check if Supabase is properly configured
  if (!hasSupabase) {
    return {
      success: false,
      message: "Database configuration error. Please contact support.",
    }
  }

  // Extract form data
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  }

  // Validate form data using Zod schema
  const validation = contactFormSchema.safeParse(rawData)

  if (!validation.success) {
    return {
      success: false,
      message: "Please check your form entries and try again.",
      errors: validation.error.flatten().fieldErrors,
    }
  }

  const { name, email, message } = validation.data

  try {
    // Insert contact submission into database
    const { error } = await supabase!.from(TABLE_NAMES.CONTACT_SUBMISSIONS).insert({ name, email, message })

    if (error) {
      console.error("Database error (contact submission):", error)
      return {
        success: false,
        message: "Failed to send message. Please try again later.",
      }
    }

    // --- Send Email Notification to Admin ---
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "info@mbsadvocates.com" // Use an environment variable for admin email
    const emailSubject = `New Contact Form Submission from ${name}`
    const emailHtml = `
      <p>You have received a new message from your website's contact form:</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <br/>
      <p>Please log in to your admin dashboard to review: <a href="https://yourdomain.com/admin/dashboard">MBS Advocates Admin</a></p>
    `
    await sendEmail({
      to: adminEmail,
      subject: emailSubject,
      htmlContent: emailHtml,
      from: "contact@mbsadvocates.com", // Use a verified sender email from your domain in Resend
    })
    // --- End Email Notification ---

    // Success response
    return {
      success: true,
      message: "Thank you! Your message has been sent successfully. We'll get back to you soon.",
    }
  } catch (err) {
    console.error("Unexpected error in contact form submission:", err)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
