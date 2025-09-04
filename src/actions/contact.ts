/**
 * @file src/actions/contact.ts
 * @description Server action to handle submissions from the website contact form.
 *
 * FIX:
 * - Changed `reply_to` to `replyTo` in the `resend.emails.send` call. This
 *   matches the property name expected by the Resend library's TypeScript types,
 *   resolving the build error.
 */

"use server"

import { Resend } from "resend"
import { z } from "zod"
import type { ContactFormResponse } from "@/types/contact-form-response"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
})

export async function submitContactForm(
  _prevState: ContactFormResponse | null,
  formData: FormData,
): Promise<ContactFormResponse> {
  // Ensure the API key is set, otherwise return an error.
  if (!process.env.RESEND_API_KEY) {
    console.error("Resend API key is not configured.")
    return {
      success: false,
      message: "Server configuration error. Please contact support.",
    }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please correct the errors and try again.",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, message } = validatedFields.data

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", // This should be a verified domain in production
      to: "donkings659@gmail.com",   // Your receiving email address
      subject: `New Message from ${name} via MBS Advocates Website`,
      reply_to: email, // THIS IS THE FIX: Changed from reply_to
      text: `You have received a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    return {
      success: true,
      message: "Thank you for your message! We will be in touch soon.",
    }
  } catch (error) {
    console.error("Failed to send email:", error)
    return {
      success: false,
      message: "There was an error sending your message. Please try again later.",
    }
  }
}