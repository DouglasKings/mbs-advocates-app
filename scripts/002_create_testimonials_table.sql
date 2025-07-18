-- Create the testimonials table
-- This table stores client testimonials for display on the website.
-- It includes a moderation flag (`approved`) and an optional rating.
-- Row Level Security (RLS) is crucial for this table to control public read and write access.

CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for each testimonial, auto-generated UUID
    client_name VARCHAR(255) NOT NULL,             -- Name of the client who provided the testimonial (required)
    comment TEXT NOT NULL,                         -- The actual testimonial text (required)
    rating INTEGER CHECK (rating >= 1 AND rating <= 5), -- Optional: 1-5 star rating, with a check constraint
    approved BOOLEAN DEFAULT FALSE,                -- For moderation: TRUE if approved for display, FALSE otherwise (default)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP -- Timestamp when the testimonial was submitted
);

-- Add comments for documentation
COMMENT ON TABLE testimonials IS 'Stores client testimonials for display on the website.';
COMMENT ON COLUMN testimonials.id IS 'Unique identifier for each testimonial.';
COMMENT ON COLUMN testimonials.client_name IS 'Name of the client who provided the testimonial.';
COMMENT ON COLUMN testimonials.comment IS 'The actual testimonial text.';
COMMENT ON COLUMN testimonials.rating IS 'Optional star rating (1-5) given by the client.';
COMMENT ON COLUMN testimonials.approved IS 'Boolean flag to indicate if the testimonial has been approved for public display.';
COMMENT ON COLUMN testimonials.created_at IS 'Timestamp when the testimonial was submitted.';
