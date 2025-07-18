/**
 * Contact Form Component (Client Component)
 * ========================================
 *
 * A functional contact form that handles user inquiries with:
 * - Form validation and error display
 * - Server Action integration for secure submission
 * - Toast notifications for user feedback
 * - Responsive design with accessible form controls
 * - Loading states and form reset on success
 */

"use client"

import { useActionState, useEffect, useRef } from "react"
import { submitContactForm } from "@/actions/contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, User, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import toast from "react-hot-toast"

/**
 * Contact Form Component
 *
 * Renders a professional contact form with proper validation,
 * error handling, and user feedback.
 */
export function ContactForm() {
  // Form state management using Next.js useActionState hook
  const [state, formAction, isPending] = useActionState(submitContactForm, null)

  // Form reference for resetting after successful submission
  const formRef = useRef<HTMLFormElement>(null)

  // Handle form submission feedback with toast notifications
  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message)
        formRef.current?.reset() // Clear form on success
      } else {
        toast.error(state.message)
      }
    }
  }, [state])

  return (
    <Card className="p-6 shadow-lg">
      {/* Form Header */}
      <CardHeader className="pb-4 text-center">
        <CardTitle className="text-2xl">Send Us a Message</CardTitle>
        <CardDescription>Fill out the form below and we&apos;ll get back to you promptly.</CardDescription>
      </CardHeader>

      <CardContent>
        {/* Contact Form with Server Action */}
        <form ref={formRef} action={formAction} className="space-y-4">
          {/* Name Input Field */}
          <div>
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                name="name"
                placeholder="Your Full Name"
                className="pl-10"
                required
                disabled={isPending}
                aria-describedby={state?.errors?.name ? "name-error" : undefined}
              />
            </div>
            {/* Field-specific error display */}
            {state?.errors?.name && (
              <p id="name-error" className="mt-1 text-sm text-red-500">
                {state.errors.name}
              </p>
            )}
          </div>

          {/* Email Input Field */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                className="pl-10"
                required
                disabled={isPending}
                aria-describedby={state?.errors?.email ? "email-error" : undefined}
              />
            </div>
            {/* Field-specific error display */}
            {state?.errors?.email && (
              <p id="email-error" className="mt-1 text-sm text-red-500">
                {state.errors.email}
              </p>
            )}
          </div>

          {/* Message Textarea Field */}
          <div>
            <label htmlFor="message" className="sr-only">
              Your Message
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                id="message"
                name="message"
                placeholder="Please describe your legal inquiry or how we can assist you..."
                rows={5}
                className="pl-10"
                required
                disabled={isPending}
                aria-describedby={state?.errors?.message ? "message-error" : undefined}
              />
            </div>
            {/* Field-specific error display */}
            {state?.errors?.message && (
              <p id="message-error" className="mt-1 text-sm text-red-500">
                {state.errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            name="contactSubmit"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white"
            disabled={isPending}
          >
            {isPending ? "Sending Your Message..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
