/**
 * Team Member Card Props Interface
 * ===============================
 *
 * Type definition for team member card component props.
 * Ensures consistent data structure for team member display.
 */

export interface TeamMemberCardProps {
  id: string // The unique ID of the team member
  name: string
  title: string
  description: string
  imageUrl: string
  imageAlt: string
}
