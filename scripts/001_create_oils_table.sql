-- Create the oils table for the AI Aroma Master app
CREATE TABLE IF NOT EXISTS oils (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ko TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  usage_methods TEXT[] DEFAULT '{}',
  usage_recipes JSONB DEFAULT '[]',
  safety_warnings TEXT[],
  synergy_oils TEXT[],
  symptoms TEXT[] DEFAULT '{}',
  diamond_tip TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster symptom searches
CREATE INDEX IF NOT EXISTS idx_oils_symptoms ON oils USING GIN (symptoms);
CREATE INDEX IF NOT EXISTS idx_oils_category ON oils (category);

-- Enable RLS but allow public read access (no auth required for viewing)
ALTER TABLE oils ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read oils (public data)
CREATE POLICY "Allow public read access" ON oils
  FOR SELECT
  USING (true);
