-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'belum' CHECK (status IN ('lunas', 'belum')),
  last_payment_date TIMESTAMP,
  total_paid INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL REFERENCES students(name) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  date DATE NOT NULL,
  day TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create spendings table
CREATE TABLE IF NOT EXISTS spendings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item TEXT NOT NULL,
  estimated_cost INTEGER NOT NULL,
  actual_cost INTEGER DEFAULT 0,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'purchased', 'completed')),
  date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date DATE NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  budget INTEGER NOT NULL,
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'confirmed', 'completed')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create memories table
CREATE TABLE IF NOT EXISTS memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  event_name TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE spendings ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (data dapat diakses publik)
CREATE POLICY "Allow public read on students" ON students FOR SELECT USING (true);
CREATE POLICY "Allow public read on payments" ON payments FOR SELECT USING (true);
CREATE POLICY "Allow public read on spendings" ON spendings FOR SELECT USING (true);
CREATE POLICY "Allow public read on events" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read on memories" ON memories FOR SELECT USING (true);

-- Create policies for authenticated admin write access
CREATE POLICY "Allow authenticated insert on students" ON students FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update on students" ON students FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete on students" ON students FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert on payments" ON payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update on payments" ON payments FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete on payments" ON payments FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert on spendings" ON spendings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update on spendings" ON spendings FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete on spendings" ON spendings FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert on events" ON events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update on events" ON events FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete on events" ON events FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert on memories" ON memories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update on memories" ON memories FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete on memories" ON memories FOR DELETE USING (true);

-- Create indexes for better performance
CREATE INDEX idx_payments_student_name ON payments(student_name);
CREATE INDEX idx_payments_date ON payments(date);
CREATE INDEX idx_spendings_date ON spendings(date);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_memories_date ON memories(date);
