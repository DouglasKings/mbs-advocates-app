/**
 * Admin Team Members Page (Server Component)
 * ========================================
 *
 * This page will allow administrators to manage team member profiles.
 *
 * NOTE: This is a basic placeholder. Full CRUD functionality will be implemented later.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTeamMembers } from "@/actions/team" // Re-use existing action
import type { TeamMember } from "@/lib/schema"
import Image from "next/image"

/**
 * Admin Team Members Page
 *
 * Displays a list of team members for management.
 */
export default async function AdminTeamMembersPage() {
  const { data: teamMembers, success } = await getTeamMembers()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Manage Team Members</h2>
      <p className="text-gray-600">Add, edit, or remove profiles of your legal team.</p>

      <Card>
        <CardHeader>
          <CardTitle>All Team Members ({success ? teamMembers.length : "Error"})</CardTitle>
        </CardHeader>
        <CardContent>
          {success && teamMembers.length > 0 ? (
            <ul className="space-y-4">
              {teamMembers.map((member: TeamMember) => (
                <li key={member.id} className="border-b pb-2 last:border-b-0 flex items-center space-x-4">
                  <Image
                    src={member.image_url || "/placeholder.svg"}
                    alt={member.image_alt}
                    width={64}
                    height={64}
                    className="rounded-full object-cover aspect-square"
                  />
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-gray-700 text-sm">{member.title}</p>
                    <p className="text-sm text-gray-500">{member.description.substring(0, 70)}...</p>
                  </div>
                  {/* Add edit/delete buttons here later */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">{success ? "No team members found." : "Error loading team members."}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
