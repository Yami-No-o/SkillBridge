-- Enable RLS on all tables
ALTER TABLE workers      ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs         ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings     ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews      ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_skills ENABLE ROW LEVEL SECURITY;

-- Workers: can only read/update their own row
CREATE POLICY "Worker reads own profile"
  ON workers FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Worker updates own profile"
  ON workers FOR UPDATE
  USING (auth.uid() = id);

-- Jobs: seekers can read/update their own jobs; all can read open jobs
CREATE POLICY "Seeker manages own jobs"
  ON jobs FOR ALL
  USING (auth.uid() = seeker_id);

CREATE POLICY "Anyone can read open jobs"
  ON jobs FOR SELECT
  USING (status = 'open');

-- Reviews: anyone can read; only reviewer can write
CREATE POLICY "Anyone reads reviews"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Reviewer writes own review"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

-- Bookings: worker or seeker involved can read
CREATE POLICY "Involved parties read booking"
  ON bookings FOR SELECT
  USING (
    auth.uid() = worker_id OR
    auth.uid() IN (SELECT seeker_id FROM jobs WHERE id = job_id)
  );
