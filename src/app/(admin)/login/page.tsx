/**
 * Admin Login Page (Client Component)
 * ===================================
 *
 * Provides a login form for administrators to access the dashboard.
 * Uses Server Actions for authentication and displays feedback.
 */

"use client"

import { useActionState, useEffect, useRef } from "react"
import { signIn } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock } from "lucide-react"
import toast from "react-hot-toast"

/**
 * Admin Login Page Component
 *
 * Renders a login form for admin users.
 */
export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(signIn, null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.message && !state.success) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="pb-4 text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
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

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
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

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white" disabled={isPending}>
              {isPending ? "Logging In..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
