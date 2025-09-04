/**
 * Contact Form Component (Client Component)
 * ========================================
 *
 * FIX:
 * - The `useActionState` hook is now typed with `ContactFormResponse` for better type safety.
 * - The `useEffect` logic now correctly checks for `state.success` to display the
 *   appropriate success or error toast notification.
 * - Removed the unused 'X' icon import to clean up the code.
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
import type { ContactFormResponse } from "@/types/contact-form-response"

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<ContactFormResponse | null, FormData>(
    submitContactForm,
    null,
  )
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message)
        formRef.current?.reset()
      } else {
        toast.error(state.message)
      }
    }
  }, [state])

  return (
    <Card className="p-6 shadow-lg">
      <CardHeader className="pb-4 text-center">
        <CardTitle className="text-2xl">Send Us a Message</CardTitle>
        <CardDescription>Fill out the form below and we&apos;ll get back to you promptly.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
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
            {state?.errors?.name && (
              <p id="name-error" className="mt-1 text-sm text-red-500">
                {state.errors.name}
              </p>
            )}
          </div>
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
            {state?.errors?.email && (
              <p id="email-error" className="mt-1 text-sm text-red-500">
                {state.errors.email}
              </p>
            )}
          </div>
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
            {state?.errors?.message && (
              <p id="message-error" className="mt-1 text-sm text-red-500">
                {state.errors.message}
              </p>
            )}
          </div>
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