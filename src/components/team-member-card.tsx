/**
 * Team Member Card Component
 * =========================
 *
 * A reusable component for displaying individual team member information
 * including profile photo, name, title, and description.
 */

import { Card, CardContent } from "@/components/ui/card"
import { ImageContainer } from "@/components/image-container"
import type { TeamMemberCardProps } from "@/types/team-member-card"

/**
 * Team Member Card Component
 *
 * Displays a professional card for a team member with their information.
 *
 * @param props - Team member information
 */
export function TeamMemberCard({ name, title, description, imageUrl, imageAlt }: TeamMemberCardProps) {
  return (
    <Card className="flex flex-col items-center text-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
      {/* Professional Profile Photo */}
      <ImageContainer
        src={imageUrl || "/placeholder.svg"}
        alt={imageAlt}
        width={150}
        height={150}
        className="rounded-full object-cover mb-4 aspect-square"
        wrapperClassName="w-36 h-36"
      />

      {/* Team Member Name */}
      <h3 className="text-xl font-semibold text-gray-900 mb-1">{name}</h3>

      {/* Professional Title */}
      <p className="text-sm font-medium text-gray-600 mb-3">{title}</p>

      {/* Description/Bio */}
      <CardContent className="p-0 text-gray-700 text-sm flex-grow">
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}
