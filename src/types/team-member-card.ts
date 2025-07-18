/**
 * Team Member Card Props Interface
 * ===============================
 *
 * Type definition for team member card component props.
 * Ensures consistent data structure for team member display.
 */

export interface TeamMemberCardProps {
  name: string // Team member's full name
  title: string // Professional title/position
  description: string // Brief bio or description
  imageUrl: string // URL to profile image
  imageAlt: string // Alt text for accessibility
}
