-- Enable Row Level Security (RLS) for Contact Submissions
-- This is CRITICAL for security - prevents unauthorized access to contact form data

-- Enable RLS on contact_submissions table
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow INSERT operations (for form submissions)
-- Only allows inserting new records, no reading/updating/deleting
CREATE POLICY "Allow contact form submissions" ON contact_submissions
    FOR INSERT 
    WITH CHECK (true);

-- Enable RLS on testimonials table as well
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Policy for testimonial submissions (INSERT only)
CREATE POLICY "Allow testimonial submissions" ON testimonials
    FOR INSERT 
    WITH CHECK (true);

-- Policy to allow reading approved testimonials (for public display)
CREATE POLICY "Allow reading approved testimonials" ON testimonials
    FOR SELECT 
    USING (approved = true);

-- Add comments for documentation
COMMENT ON POLICY "Allow contact form submissions" ON contact_submissions IS 'Allows public form submissions while protecting existing data';
COMMENT ON POLICY "Allow testimonial submissions" ON testimonials IS 'Allows public testimonial submissions';
COMMENT ON POLICY "Allow reading approved testimonials" ON testimonials IS 'Allows public to read only approved testimonials';
