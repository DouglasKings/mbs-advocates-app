/**
 * Admin Testimonials Page (Server Component)
 * =========================================
 *
 * This page will allow administrators to view, approve, and manage client testimonials.
 *
 * NOTE: This is a basic placeholder. Full CRUD functionality will be implemented later.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getApprovedTestimonials } from "@/actions/testimonials" // Re-use existing action
import type { Testimonial } from "@/lib/schema"

/**
 * Admin Testimonials Page
 *
 * Displays a list of testimonials (both approved and unapproved) for management.
 */
export default async function AdminTestimonialsPage() {
  // For admin, we might want to fetch all testimonials, not just approved ones.
  // For now, we'll use getApprovedTestimonials, but this would be updated.
  const { data: testimonials, success } = await getApprovedTestimonials()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Manage Testimonials</h2>
      <p className="text-gray-600">Review and approve client feedback.</p>

      <Card>
        <CardHeader>
          <CardTitle>All Testimonials ({success ? testimonials.length : "Error"})</CardTitle>
        </CardHeader>
        <CardContent>
          {success && testimonials.length > 0 ? (
            <ul className="space-y-4">
              {testimonials.map((t: Testimonial) => (
                <li key={t.id} className="border-b pb-2 last:border-b-0">
                  <p className="font-semibold">{t.client_name}</p>
                  <p className="text-gray-700 italic">{`"${t.comment}"`}</p>
                  <p className="text-sm text-gray-500">
                    Rating: {t.rating || "N/A"} | Approved: {t.approved ? "Yes" : "No"}
                  </p>
                  {/* Add approve/delete buttons here later */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">{success ? "No testimonials found." : "Error loading testimonials."}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
