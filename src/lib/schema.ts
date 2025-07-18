/**
 * Database Schema Definitions & Constants
 * ======================================
 *
 * This file defines TypeScript interfaces that represent the structure
 * of database tables and exports constants for consistent table name usage.
 *
 * Benefits:
 * - Type safety when working with database data
 * - Consistent table name references
 * - Better IDE support and autocomplete
 * - Reduced runtime errors from typos
 */

// Table names as constants to prevent typos and enable refactoring
export const TABLE_NAMES = {
  CONTACT_SUBMISSIONS: "contact_submissions",
  TESTIMONIALS: "testimonials",
  TEAM_MEMBERS: "team_members", // New table for team members
  SERVICES: "services", // New table for services
} as const

/**
 * Contact Submission Interface
 * Represents a row in the `contact_submissions` table
 */
export interface ContactSubmission {
  id?: string // UUID primary key (optional for inserts)
  name: string // Submitter's full name
  email: string // Submitter's email address
  message: string // Message content
  created_at?: Date // Timestamp (auto-generated)
}

/**
 * Testimonial Interface
 * Represents a row in the `testimonials` table
 */
export interface Testimonial {
  id?: string // UUID primary key (optional for inserts)
  client_name: string // Client's name
  comment: string // Testimonial text
  rating?: number // Optional 1-5 star rating
  approved?: boolean // Moderation flag (default: false)
  created_at?: Date // Timestamp (auto-generated)
}

/**
 * Team Member Interface
 * Represents a row in the `team_members` table
 */
export interface TeamMember {
  id?: string // UUID primary key (optional for inserts)
  name: string // Team member's full name
  title: string // Professional title/position
  description: string // Brief bio or description
  image_url: string // URL to profile image
  image_alt: string // Alt text for accessibility
  order?: number // Optional: for custom sorting
  created_at?: Date // Timestamp (auto-generated)
}

/**
 * Service Interface
 * Represents a row in the `services` table
 */
export interface Service {
  id?: string // UUID primary key (optional for inserts)
  title: string // Title of the legal service
  description: string // Short description of the service
  content: string // Detailed description of the service
  order?: number // Optional: for custom sorting
  created_at?: Date // Timestamp (auto-generated)
}

/**
 * Form Response Types
 * Used for Server Action return values to provide consistent feedback
 */
export type FormResponse = {
  success: boolean
  message: string
  errors?: {
    [key: string]: string
  }
}
