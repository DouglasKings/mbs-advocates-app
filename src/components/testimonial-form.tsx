/**
 * Testimonial Form Component (Client Component)
 * ============================================
 *
 * Allows clients to submit testimonials with optional star ratings.
 * Features include:
 * - Interactive star rating system
 * - Form validation and error handling
 * - Server Action integration
 * - Toast notifications for feedback
 * - Moderation system (submissions require approval)
 */

"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { submitTestimonial } from "@/actions/testimonials"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, User } from "lucide-react"
import toast from "react-hot-toast"

/**
 * Testimonial Form Component
 *
 * Renders a form for clients to share their experience with MBS Advocates.
 * Includes an interactive star rating system and proper validation.
 */
export function TestimonialForm() {
  // Form state management with Server Actions
  const [state, formAction, isPending] = useActionState(submitTestimonial, null)

  // Local state for interactive star rating
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  // Form reference for reset functionality
  const formRef = useRef<HTMLFormElement>(null)

  // Handle form submission feedback
  useEffect(() => {
    if (!state?.message) return

    if (state.success) {
      toast.success(state.message)
      formRef.current?.reset()
      setRating(0) // Reset star rating
    } else {
      toast.error(state.message)
    }
  }, [state])

  return (
    <Card className="p-6 shadow-lg">
      {/* Form Header */}
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">Share Your Experience</CardTitle>
        <CardDescription>
          Help others by sharing your experience with MBS Advocates. Your feedback will be reviewed before publication.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          {/* Client Name Input */}
          <div>
            <label htmlFor="client_name" className="sr-only">
              Your Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="client_name"
                name="client_name"
                placeholder="Your Name"
                className="pl-10"
                required
                disabled={isPending}
                aria-describedby={state?.errors?.client_name ? "name-error" : undefined}
              />
            </div>
            {/* Error display for name field */}
            {state?.errors?.client_name && (
              <p id="name-error" className="mt-1 text-sm text-red-500">
                {state.errors.client_name}
              </p>
            )}
          </div>

          {/* Testimonial Comment */}
          <div>
            <label htmlFor="comment" className="sr-only">
              Your Testimonial
            </label>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Please share your experience with our legal services..."
              rows={5}
              required
              disabled={isPending}
              aria-describedby={state?.errors?.comment ? "comment-error" : undefined}
            />
            {/* Error display for comment field */}
            {state?.errors?.comment && (
              <p id="comment-error" className="mt-1 text-sm text-red-500">
                {state.errors.comment}
              </p>
            )}
          </div>

          {/* Interactive Star Rating System */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Rating (optional)</label>
            <div className="flex space-x-1" role="radiogroup" aria-label="Star rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className={`h-6 w-6 cursor-pointer transition-colors ${
                    (hover || rating) >= star
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                  role="radio"
                  aria-checked={rating === star}
                  aria-label={`${star} star${star !== 1 ? "s" : ""}`}
                />
              ))}
              {/* Hidden input to submit rating with form */}
              <input type="hidden" name="rating" value={rating} />
            </div>
            {/* Error display for rating field */}
            {state?.errors?.rating && <p className="mt-1 text-sm text-red-500">{state.errors.rating}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            name="testimonialSubmit"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white"
            disabled={isPending}
          >
            {isPending ? "Submitting Your Review..." : "Submit Your Testimonial"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
