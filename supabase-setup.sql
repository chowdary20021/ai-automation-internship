-- ====================================
-- AI Weather Reporter Database Setup
-- Execute these commands in Supabase SQL Editor
-- ====================================

-- MIGRATION: Add email_sent column to existing tables
-- Run this if you already have the weather_reports table
ALTER TABLE weather_reports ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT FALSE;

-- 1. Create the main weather_reports table with enhanced schema
CREATE TABLE IF NOT EXISTS weather_reports (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  city text NOT NULL,
  temperature numeric,
  condition text,
  aqi numeric,
  ai_commentary text,
  email_valid boolean DEFAULT false,
  weather_fetch_success boolean DEFAULT false,
  email_sent boolean DEFAULT false,
  timestamp timestamptz DEFAULT now()
);

-- 2. Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_weather_reports_email ON weather_reports(email);
CREATE INDEX IF NOT EXISTS idx_weather_reports_city ON weather_reports(city);
CREATE INDEX IF NOT EXISTS idx_weather_reports_timestamp ON weather_reports(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_weather_reports_email_sent ON weather_reports(email_sent);

-- 3. Add Row Level Security (RLS) policies if needed
-- Uncomment these lines if you want to enable RLS
-- ALTER TABLE weather_reports ENABLE ROW LEVEL SECURITY;

-- 4. Create a policy to allow inserts (for n8n to write data)
-- Uncomment and modify based on your security requirements
-- CREATE POLICY "Allow service role to insert" ON weather_reports
--   FOR INSERT WITH CHECK (true);

-- 5. Create a policy to allow updates (for AI commentary updates)
-- CREATE POLICY "Allow service role to update" ON weather_reports
--   FOR UPDATE USING (true);

-- 6. Optional: Create a view for analytics/reporting
CREATE OR REPLACE VIEW weather_analytics AS
SELECT
  city,
  COUNT(*) as total_reports,
  AVG(temperature) as avg_temperature,
  COUNT(CASE WHEN ai_commentary IS NOT NULL THEN 1 END) as reports_with_ai,
  MAX(timestamp) as last_report
FROM weather_reports
GROUP BY city
ORDER BY total_reports DESC;

-- 7. Verify table creation
SELECT
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'weather_reports'
ORDER BY ordinal_position;

-- ====================================
-- Test the setup with a sample insert
-- ====================================
-- Uncomment to test (remove after testing)
-- INSERT INTO weather_reports (name, email, city, temperature, condition, aqi, ai_commentary, email_valid, weather_fetch_success)
-- VALUES ('Test User', 'test@example.com', 'Test City', 25.5, 'Sunny', 45, 'Beautiful sunny day perfect for outdoor activities!', true, true);

-- Check if the insert worked
-- SELECT * FROM weather_reports WHERE email = 'test@example.com';
