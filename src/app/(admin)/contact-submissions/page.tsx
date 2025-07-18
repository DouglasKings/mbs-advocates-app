/**
 * Admin Contact Submissions Page (Server Component)
 * ================================================
 *
 * This page will allow administrators to view contact form submissions.
 *
 * NOTE: This is a basic placeholder. Full functionality will be implemented later.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase, hasSupabase } from "@/lib/db" // Import supabase client
import { TABLE_NAMES, type ContactSubmission } from "@/lib/schema" // Import schema types

/**
 * Admin Contact Submissions Page
 *
 * Displays a list of contact form submissions.
 */
export default async function AdminContactSubmissionsPage() {
  let submissions: ContactSubmission[] = []
  let success = false
  let message = ""

  if (hasSupabase) {
    try {
      // In a real admin panel, you'd use a service role key or authenticated user
      // to bypass RLS for reading all submissions. For now, this will only
      // show submissions if RLS allows SELECT (which it currently doesn't for public).
      // This will be updated with proper admin authentication.
      const { data, error } = await supabase!
        .from(TABLE_NAMES.CONTACT_SUBMISSIONS)
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Database error (fetching contact submissions for admin):", error)
        message = "Failed to load contact submissions."
      } else {
        submissions = data as ContactSubmission[]
        success = true
      }
    } catch (err) {
      console.error("Unexpected error fetching contact submissions for admin:", err)
      message = "An unexpected error occurred."
    }
  } else {
    message = "Database not configured."
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Contact Submissions</h2>
      <p className="text-gray-600">Review messages sent through the website&apos;s contact form.</p>

      <Card>
        <CardHeader>
          <CardTitle>All Submissions ({success ? submissions.length : "Error"})</CardTitle>
        </CardHeader>
        <CardContent>
          {success && submissions.length > 0 ? (
            <ul className="space-y-4">
              {submissions.map((s: ContactSubmission) => (
                <li key={s.id} className="border-b pb-2 last:border-b-0">
                  <p className="font-semibold">
                    {s.name} ({s.email})
                  </p>
                  <p className="text-gray-700 italic">{`"${s.message}"`}</p>
                  <p className="text-sm text-gray-500">{new Date(s.created_at!).toLocaleString()}</p>
                  {/* Add delete/reply buttons here later */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">{success ? "No contact submissions found." : message}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}