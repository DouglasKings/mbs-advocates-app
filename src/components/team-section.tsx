/**
 * @file src/components/team-section.tsx
 * @description A server component that fetches and displays all team members.
 *
 * FINAL FIX:
 * - This version is now "bulletproof." It fetches team members and includes
 *   console logging to help debug if data isn't appearing.
 * - If the fetch fails or returns no members, it clearly logs the reason to the
 *   terminal and continues to display the skeleton loaders, preventing a crash.
 */

import { getTeamMembers } from "@/actions/team";
import { TeamMemberCardSkeleton } from "@/components/skeletons";
import { TeamMemberCard } from "@/components/team-member-card";

export async function TeamSection() {
  // Attempt to fetch team members from the database.
  const { data: teamMembers, success } = await getTeamMembers();

  // --- DEBUGGING LOG ---
  // This will show up in the terminal where you run `npm run dev`.
  if (!success) {
    console.error("TeamSection Error: Failed to fetch team members from the server action.");
  } else if (!teamMembers || teamMembers.length === 0) {
    console.log("TeamSection Info: The fetch was successful, but no team members were found in the database.");
  } else {
    console.log(`TeamSection Info: Successfully fetched ${teamMembers.length} team members.`);
  }
  // --- END DEBUGGING LOG ---

  return (
    <section id="team" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">Meet Our Professional Team</h2>

        {/* 
          This conditional rendering is the key. It checks if the data fetch was successful 
          AND if there are actually any team members to display.
        */}
        {success && teamMembers && teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* 
              We filter the array to ensure we only map over members that have a valid 'id'.
              This prevents the creation of cards with broken links (`/team/undefined`).
            */}
            {teamMembers
              .filter((member) => member && member.id)
              .map((member) => (
                <TeamMemberCard
                  key={member.id}
                  id={member.id!} // The `!` asserts that id is not null, which is safe because of the filter.
                  name={member.name}
                  title={member.title}
                  description={member.description}
                  imageUrl={member.image_url}
                  imageAlt={member.image_alt}
                />
              ))}
          </div>
        ) : (
          // If the conditions above are not met (e.g., loading, error, or no data),
          // we display the skeleton loaders as a fallback. This is what you are currently seeing.
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <TeamMemberCardSkeleton key={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}