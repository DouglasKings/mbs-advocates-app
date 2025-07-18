-- Create the services table
-- This table stores information about the legal services offered by the firm.
-- Data will be fetched for display on the website.

CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for each service
    title VARCHAR(255) NOT NULL,                  -- Title of the legal service
    description VARCHAR(500) NOT NULL,            -- Short description of the service
    content TEXT NOT NULL,                        -- Detailed description of the service
    "order" INTEGER DEFAULT 0,                    -- Optional: for custom sorting of services
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP -- Timestamp of creation
);

-- Add comments for documentation
COMMENT ON TABLE services IS 'Stores information about the legal services offered by the firm.';
COMMENT ON COLUMN services.id IS 'Unique identifier for each service.';
COMMENT ON COLUMN services.title IS 'Title of the legal service.';
COMMENT ON COLUMN services.description IS 'Short description of the service.';
COMMENT ON COLUMN services.content IS 'Detailed content describing the legal service.';
COMMENT ON COLUMN services."order" IS 'Optional numerical order for displaying services.';
COMMENT ON COLUMN services.created_at IS 'Timestamp when the service record was created.';

-- Enable RLS for services table
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access to services
CREATE POLICY "Allow public read access to services" ON services
    FOR SELECT
    USING (true);

COMMENT ON POLICY "Allow public read access to services" ON services IS 'Allows anyone to read service data.';
