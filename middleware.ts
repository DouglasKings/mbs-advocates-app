/**
 * Next.js Middleware
 * ==================
 *
 * This middleware is used to protect routes, specifically the admin dashboard.
 * It checks for user authentication and redirects unauthenticated users to the login page.
 *
 * Learn more: https://nextjs.org/docs/app/building-your-application/routing/middleware
 */

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse, type NextRequest } from "next/server"

/**
 * Middleware function to handle authentication and route protection.
 *
 * @param req - The incoming Next.js request.
 * @returns A NextResponse object, either allowing the request or redirecting.
 */
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Define the path to the admin login page
  const adminLoginUrl = new URL("/admin/login", req.url)
  // Define paths that are allowed without a full session within /admin
  const allowedAdminPaths = [adminLoginUrl.pathname, "/admin/reset-password"]

  // Protect the /admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // If there's no session and the user is not on an allowed path, redirect to login
    if (!session && !allowedAdminPaths.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(adminLoginUrl)
    }
    // If there is a session and the user is trying to access the login or reset-password page, redirect to dashboard
    if (session && allowedAdminPaths.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url))
    }
  }

  return res
}

// Define the matcher to specify which paths the middleware should run on
export const config = {
  matcher: ["/admin/:path*"], // Apply middleware to all paths under /admin
}
