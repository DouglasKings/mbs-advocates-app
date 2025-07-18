-- Create the contact_submissions table
-- This table stores messages submitted through the website's contact form.
-- It is designed to be accessed securely via server-side actions,
-- so Row Level Security (RLS) is not strictly necessary if only server-side
-- code with a service role key interacts with it.

CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for each submission, auto-generated UUID
    name VARCHAR(255) NOT NULL,                   -- Name of the person submitting the form (required)
    email VARCHAR(255) NOT NULL,                  -- Email address of the person (required)
    message TEXT NOT NULL,                        -- The message content (required)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP -- Timestamp of submission, defaults to current time
);

-- Add comments for documentation
COMMENT ON TABLE contact_submissions IS 'Stores submissions from the website contact form.';
COMMENT ON COLUMN contact_submissions.id IS 'Unique identifier for each contact submission.';
COMMENT ON COLUMN contact_submissions.name IS 'Name of the person submitting the form.';
COMMENT ON COLUMN contact_submissions.email IS 'Email address of the person submitting the form.';
COMMENT ON COLUMN contact_submissions.message IS 'Message content from the submission.';
COMMENT ON COLUMN contact_submissions.created_at IS 'Timestamp when the submission was created.';
