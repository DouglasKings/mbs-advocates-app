/**
 * Admin Dashboard Home Page (Server Component)
 * ==========================================
 *
 * This is the main dashboard page for administrators.
 * It will provide an overview and links to manage various content types.
 *
 * NOTE: This page will eventually be protected by authentication.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

/**
 * Admin Dashboard Home Page
 *
 * Displays a welcome message and navigation cards for content management.
 */
export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to the Admin Dashboard</h1>
      <p className="text-gray-600">Manage your website content, submissions, and team members here.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/testimonials">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Manage Testimonials</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Approve, edit, or delete client testimonials.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/contact-submissions">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>View Contact Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Review messages sent through the contact form.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/team">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Manage Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Add, edit, or remove team profiles.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/services">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Manage Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Update legal service offerings.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
