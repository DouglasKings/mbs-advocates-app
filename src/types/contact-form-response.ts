/**
 * @file src/types/contact-form-response.ts
 * @description This file defines the TypeScript type for the state object
 *              used in the contact form's server action (`useActionState`).
 *              It ensures type safety and consistency between the server-side
 *              validation logic and the client-side form component that
 *              displays feedback to the user.
 */

/**
 * Defines the structured response for the contact form server action.
 * This type is crucial for providing clear, type-safe feedback (success, errors)
 * from the server back to the client component.
 */
export type ContactFormResponse = {
  /**
   * Indicates whether the form submission was successful.
   * - `true`: The form was validated and the email was sent successfully.
   * - `false`: There was a validation error or an issue sending the email.
   */
  success: boolean;

  /**
   * A user-friendly message to display in a toast notification.
   * This will contain either a success confirmation (e.g., "Message sent!")
   * or a general error message (e.g., "Please correct the errors below.").
   */
  message: string;

  /**
   * An optional object containing field-specific validation errors.
   * This object is only present if `success` is `false` due to validation issues.
   *
   * @note The properties are typed as `string[]` (an array of strings) to
   *       perfectly match the output of Zod's `flatten().fieldErrors` method,
   *       which allows for multiple potential errors per field.
   */
  errors?: {
    /** An array of error messages for the 'name' field, if any. */
    name?: string[];
    /** An array of error messages for the 'email' field, if any. */
    email?: string[];
    /** An array of error messages for the 'message' field, if any. */
    message?: string[];
  };
};

/*
 * By using this shared type, we ensure that both the client component (`contact-form.tsx`)
 * and the server action (`contact.ts`) agree on the shape of the data being passed back and forth.
 * This strict contract is the key to resolving type errors and enabling robust autocompletion
 * and error-checking in the IDE during development.
 */