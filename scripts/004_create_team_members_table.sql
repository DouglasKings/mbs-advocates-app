-- Create the team_members table
-- This table stores information about the legal team members.
-- Data will be fetched for display on the website.

CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for each team member
    name VARCHAR(255) NOT NULL,                   -- Full name of the team member
    title VARCHAR(255) NOT NULL,                  -- Professional title/position
    description TEXT NOT NULL,                    -- Brief bio or description
    image_url VARCHAR(255) NOT NULL,              -- URL to the team member's profile image
    image_alt VARCHAR(255) NOT NULL,              -- Alt text for the image (accessibility)
    "order" INTEGER DEFAULT 0,                    -- Optional: for custom sorting of team members
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP -- Timestamp of creation
);

-- Add comments for documentation
COMMENT ON TABLE team_members IS 'Stores information about the legal team members.';
COMMENT ON COLUMN team_members.id IS 'Unique identifier for each team member.';
COMMENT ON COLUMN team_members.name IS 'Full name of the team member.';
COMMENT ON COLUMN team_members.title IS 'Professional title or position of the team member.';
COMMENT ON COLUMN team_members.description IS 'Brief biography or description of the team member.';
COMMENT ON COLUMN team_members.image_url IS 'URL to the team member''s profile image.';
COMMENT ON COLUMN team_members.image_alt IS 'Alternative text for the team member''s image, for accessibility.';
COMMENT ON COLUMN team_members."order" IS 'Optional numerical order for displaying team members.';
COMMENT ON COLUMN team_members.created_at IS 'Timestamp when the team member record was created.';

-- Enable RLS for team_members table
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access to team members
CREATE POLICY "Allow public read access to team members" ON team_members
    FOR SELECT
    USING (true);

COMMENT ON POLICY "Allow public read access to team members" ON team_members IS 'Allows anyone to read team member data.';
