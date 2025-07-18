/**
 * Admin Password Reset Page (Client Component)
 * ===========================================
 *
 * Allows authenticated users (via password recovery link) to set a new password.
 * This page listens for Supabase's PASSWORD_RECOVERY event.
 */

"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { updatePassword } from "@/actions/auth" // New action for updating password
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from 'lucide-react'
import toast from "react-hot-toast"
import { supabase } from "@/lib/db" // Import the Supabase client

/**
 * Admin Password Reset Page Component
 *
 * Renders a form for users to set a new password after clicking a recovery link.
 */
export default function AdminResetPasswordPage() {
  // State for form submission feedback
  const [state, formAction, isPending] = useActionState(updatePassword, null)
  const formRef = useRef<HTMLFormElement>(null)
  const [passwordRecoveryActive, setPasswordRecoveryActive] = useState(false)

  useEffect(() => {
    // Listen for Supabase auth state changes
    const { data: authListener } = supabase!.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        // If the user arrived via a password recovery link and has a session
        setPasswordRecoveryActive(true)
        toast.success("Please set your new password.")
      } else if (event === "SIGNED_IN" && session && passwordRecoveryActive) {
        // If password was successfully updated and user is signed in
        toast.success("Password updated successfully! Redirecting to dashboard...")
        // Redirect to dashboard after a short delay to show toast
        setTimeout(() => {
          window.location.href = "/admin/dashboard"
        }, 1500)
      }
    })

    // Handle form submission feedback
    if (state?.message) {
      if (state.success) {
        // Success message handled by SIGNED_IN event and redirect
      } else {
        toast.error(state.message)
      }
    }

    // Cleanup listener on component unmount
    return () => {
      authListener.data.subscription.unsubscribe()
    }
  }, [state, passwordRecoveryActive])

  if (!passwordRecoveryActive) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <Card className="w-full max-w-md shadow-lg text-center">
          <CardHeader>
            <CardTitle>Password Reset</CardTitle>
            <CardDescription>Waiting for password recovery link...</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Please click the password reset link from your email to continue.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="pb-4 text-center">
          <CardTitle className="text-2xl">Set New Password</CardTitle>
          <CardDescription>Enter and confirm your new password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            {/* New Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="New Password"
                  className="pl-10"
                  required
                  disabled={isPending}
                  aria-describedby={state?.errors?.password ? "password-error" : undefined}
                />
              </div>
              {state?.errors?.password && (
                <p id="password-error" className="mt-1 text-sm text-red-500">
                  {state.errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm New Password"
                  className="pl-10"
                  required
                  disabled={isPending}
                  aria-describedby={state?.errors?.confirmPassword ? "confirm-password-error" : undefined}
                />
              </div>
              {state?.errors?.confirmPassword && (
                <p id="confirm-password-error" className="mt-1 text-sm text-red-500">
                  {state.errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white" disabled={isPending}>
              {isPending ? "Setting Password..." : "Set New Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}