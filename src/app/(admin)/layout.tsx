/**
 * Admin Layout Component
 * =====================
 *
 * This layout wraps all pages within the admin route group.
 * It will eventually include authentication checks and admin-specific navigation.
 *
 * NOTE: This is a basic placeholder. Full authentication and admin UI
 * will be implemented in subsequent steps.
 */

import type React from "react"
import Link from "next/link"
import { signOut } from "@/actions/auth" // Import the signOut action

/**
 * Admin Layout Component
 *
 * Provides a basic structure for admin pages.
 *
 * @param children - Admin page content
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">MBS Advocates Admin</h1>
          <nav>
            <ul className="flex space-x-4 items-center">
              {" "}
              {/* Added items-center for alignment */}
              <li>
                <Link href="/admin/dashboard" className="hover:text-gray-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/testimonials" className="hover:text-gray-300">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/admin/contact-submissions" className="hover:text-gray-300">
                  Contact Submissions
                </Link>
              </li>
              <li>
                <Link href="/admin/team" className="hover:text-gray-300">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/admin/services" className="hover:text-gray-300">
                  Services
                </Link>
              </li>
              <li>
                {/* Logout Button */}
                <form action={signOut}>
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </form>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4 py-8">{children}</main>
    </div>
  )
}
