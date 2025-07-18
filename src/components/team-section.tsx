/**
 * Team Section Component
 * =====================
 *
 * Displays the MBS Advocates team in a responsive grid layout.
 * Features professional team member cards with photos, titles, and descriptions.
 * Fetches team member data dynamically from Supabase.
 */

import { TeamMemberCard } from "@/components/team-member-card"
import { getTeamMembers } from "@/actions/team" // Import the new action
import { TeamMemberCardSkeleton } from "@/components/skeletons" // Import skeleton for team members

/**
 * Team Section Component (Server Component)
 *
 * Renders a grid of team member cards with professional information,
 * fetched dynamically from the database. Includes loading and error states.
 */
export async function TeamSection() {
  const { data: teamMembers, success: teamMembersSuccess } = await getTeamMembers()

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">Meet Our Professional Team</h2>

        {/* Display Team Members dynamically or show loading/error */}
        {teamMembersSuccess && teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id} // Use unique ID from database as key
                name={member.name}
                title={member.title}
                description={member.description}
                imageUrl={member.image_url}
                imageAlt={member.image_alt}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Loading Skeletons for Team Members */}
            {Array.from({ length: 8 }).map((_, i) => (
              <TeamMemberCardSkeleton key={i} />
            ))}
          </div>
        )}
        {!teamMembersSuccess && (
          <p className="text-center text-red-600 mt-8">Failed to load team members. Please try again later.</p>
        )}
      </div>
    </section>
  )
}
