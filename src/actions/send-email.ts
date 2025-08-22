/**
 * Email Sending Server Action
 * ===========================
 * Uses the Resend API to send transactional emails.
 */

"use server"

import { Resend } from "resend"

// Grab the key up-front
const RESEND_API_KEY = process.env.RESEND_API_KEY

// Lazily instantiate the client only if a key exists
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

/**
 * Sends an email via Resend.
 *
 * @param to         - Recipient email(s)
 * @param subject    - Email subject
 * @param html       - HTML body
 * @param from       - Verified sender address (defaults to onboarding@resend.dev)
 */
export async function sendEmail({
  to,
  subject,
  html,
  from = "onboarding@resend.dev", // This is the default
}: {
  to: string | string[]
  subject: string
  html: string
  from?: string
}) {
  // Bail out early if the key is missing
  if (!resend) {
    console.error("RESEND_API_KEY not set — email not sent.")
    return { success: false, message: "Email service not configured." }
  }

  try {
    const { error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, message: "Email failed to send." }
    }

    return { success: true, message: "Email sent." }
  } catch (err) {
    console.error("Unexpected email error:", err)
    return { success: false, message: "Unexpected email error." }
  }
}
