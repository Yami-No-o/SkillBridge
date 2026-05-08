-- ZONES
CREATE TABLE zones (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  lat_center  NUMERIC(9,6),
  lng_center  NUMERIC(9,6)
);

-- WORKERS
CREATE TABLE workers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  phone        TEXT UNIQUE NOT NULL,
  zone_id      UUID REFERENCES zones(id),
  rate_hour    INTEGER,
  rate_day     INTEGER,
  availability JSONB,
  rating       NUMERIC(3,2) DEFAULT 0.00,
  is_verified  BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- SKILLS
CREATE TABLE skills (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name     TEXT UNIQUE NOT NULL,
  label    TEXT NOT NULL,
  category TEXT
);

-- SKILL GRAPH
CREATE TABLE skill_graph (
  from_skill  UUID REFERENCES skills(id),
  to_skill    UUID REFERENCES skills(id),
  weight      NUMERIC(3,2),
  PRIMARY KEY (from_skill, to_skill)
);

-- WORKER SKILLS (junction table)
CREATE TABLE worker_skills (
  worker_id  UUID REFERENCES workers(id),
  skill_id   UUID REFERENCES skills(id),
  PRIMARY KEY (worker_id, skill_id)
);

-- JOBS
CREATE TABLE jobs (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seeker_id        UUID REFERENCES auth.users(id),
  description_raw  TEXT,
  extracted_skills UUID[],
  zone_id          UUID REFERENCES zones(id),
  budget_day       INTEGER,
  is_team_job      BOOLEAN DEFAULT false,
  status           TEXT DEFAULT 'open',
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- BOOKINGS
CREATE TABLE bookings (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id       UUID REFERENCES jobs(id),
  worker_id    UUID REFERENCES workers(id),
  status       TEXT DEFAULT 'pending',
  booked_at    TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- REVIEWS
CREATE TABLE reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id  UUID REFERENCES bookings(id),
  reviewer_id UUID REFERENCES auth.users(id),
  worker_id   UUID REFERENCES workers(id),
  rating      INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment     TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);
