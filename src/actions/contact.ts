"use server"

import { Resend } from "resend"
import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
})

export async function submitContactForm(prevState: any, formData: FormData) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const result = schema.safeParse({
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    const data = await resend.emails.send({
      from: "donkings659@gmail.com", // Replace with your actual verified email
      to: "donkings659@gmail.com", // Replace with your actual email
      subject: result.data.subject,
      text: result.data.message,
      reply_to: result.data.email,
    })

    return {
      data,
    }
  } catch (error) {
    return {
      message: "Something went wrong",
    }
  }
}
