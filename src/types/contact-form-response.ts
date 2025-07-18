/**
 * Contact Form Response Type
 * =========================
 *
 * Defines the structure for contact form submission responses.
 * Used with useActionState hook for type-safe form handling.
 */

export type ContactFormResponse = {
  message: string // Success or error message to display
  success: boolean // Whether the submission was successful
  errors?: {
    // Field-specific validation errors
    [key: string]: string
  }
}
