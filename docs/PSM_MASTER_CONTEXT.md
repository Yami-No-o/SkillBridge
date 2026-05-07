# PSM_MASTER_CONTEXT.md
# SkillBridge — Hyperlocal Skilled Worker Matching Platform
# Master Project Context Document (Semester Project)

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Project Name** | SkillBridge |
| **Internal Code** | PS M |
| **Type** | Hyperlocal Skilled Worker Matching Platform |
| **Target Geography** | Peri-urban Bengaluru (Anekal, Sarjapura, Kanakapura, Whitefield outskirts) |
| **Business Model** | Zero-commission, direct worker-to-seeker connection |
| **Infrastructure Cost** | ₹0/month (all free-tier services) |
| **Scale** | Semester engineering project — realistic and fully implementable |

---

## 2. Problem Statement

Informal skilled workers in peri-urban Bengaluru are excluded from existing platforms due to:
- High commission rates and mandatory paid onboarding
- App-only access requiring expensive smartphones
- Keyword-only search that misses adjacent/related skills
- No mechanism for team-based bulk job booking

Job seekers simultaneously struggle to find verified, nearby, skill-matched workers efficiently.

**SkillBridge solves this with a graph-powered matching engine, zero-commission model, and a PWA that works on low-end Android devices.**

---

## 3. Core Workflow

```
User Input (free text)
       ↓
  Rule-Based NLP
  (keyword extraction + skill normalization)
       ↓
  Skill Graph Lookup
  (nodes = skills, edges = related skills)
       ↓
  BFS Traversal
  (finds workers with exact + adjacent skills, up to depth 2)
       ↓
  Set Intersection
  (worker skill sets ∩ job required skills)
       ↓
  Filtering
  (availability + location/zone filter)
       ↓
  Ranking
  (score = skill match depth + proximity + rating)
       ↓
  Output
  (ranked list of matched workers with explanation)

--- Team Booking Path (if multiple workers requested) ---

  Filtered Candidates
       ↓
  0/1 Knapsack DP
  (optimal team within budget + skill constraints)
       ↓
  Output: Optimal Team Combination
```

---

## 4. Subject Domain Mapping

| Subject | Concept Used | Where in SkillBridge |
|---|---|---|
| **DAA** | BFS traversal | Skill graph candidate discovery |
| **DAA** | 0/1 Knapsack DP | Budget-optimal team assembly |
| **DAA** | Greedy ranking | Scoring and sorting matched workers |
| **AI** | Rule-based NLP | Extracting skill tags from free-text input |
| **CN** | REST API over HTTP | Frontend ↔ Backend ↔ Supabase communication |
| **CN** | WebSocket | Real-time job notifications to workers |
| **CN** | Client-server model | 3-tier architecture (browser, Node.js, Supabase) |
| **DMS** | Graph (nodes + edges) | Skill graph structure |
| **DMS** | Set operations | Worker skill set ∩ job skill set matching |

---

## 5. User Roles

### 5.1 Worker
- Registers via PWA (Progressive Web App — no app install, works in Chrome)
- Enters skills as free text; NLP normalizes to graph nodes
- Sets availability, zone, and rate
- Receives job notifications in real time

### 5.2 Job Seeker
- Posts a job via free-text description
- Views ranked worker matches with a plain-language explanation
- Can request team booking (triggers Knapsack algorithm)
- Books worker directly — no commission

### 5.3 Admin (NGO Operator)
- Views registered worker count, job posting activity, and booking status
- Manages worker verification and dispute reports
- Simple read-only analytics dashboard (no ML — raw counts and tables)

---

## 6. Algorithm Specifications

### 6.1 Rule-Based NLP (AI)

**Purpose:** Extract and normalize skill keywords from user's free-text input.

**Implementation:**
```
Input: "I need someone to fix leaking pipes behind the bathroom wall"

Step 1 — Tokenize and lowercase input
Step 2 — Remove stopwords (I, need, someone, to, the, a, etc.)
Step 3 — Match remaining tokens against a predefined skill keyword dictionary
         Dictionary example:
           "pipe"       → "pipe_fitting"
           "leak"       → "pipe_fitting"
           "bathroom"   → "bathroom_tiling"
           "wall"       → "wall_plastering"
           "electric"   → "electrical_wiring"
           "paint"      → "painting"
           ...
Step 4 — Return array of normalized skill node IDs

Output: ["pipe_fitting", "bathroom_tiling"]
```

**Implementation:** Pure JavaScript object lookup — no external ML library.  
**Keyword dictionary:** Hardcoded JSON file, ~150–200 entries covering all skills in the graph.

---

### 6.2 Skill Graph (DMS)

**Purpose:** Model relationships between skills so adjacent skills are discoverable.

**Structure:**
- Nodes = standardized skill tags (e.g., `pipe_fitting`, `concealed_piping`)
- Edges = relatedness between skills (stored with a weight 0.0–1.0)
- Graph is **undirected**, stored in Supabase as an edge list table

**Example:**
```
pipe_fitting ──(0.9)── concealed_piping
concealed_piping ──(0.8)── bathroom_tiling
bathroom_tiling ──(0.7)── waterproofing
bathroom_tiling ──(0.6)── tile_grouting
```

**Stored in:** `skill_graph` table in Supabase (`from_skill`, `to_skill`, `weight`)  
**Built once:** Manually defined — ~30–40 skills, ~60–80 edges covering the domain.

---

### 6.3 BFS Traversal (DAA)

**Purpose:** From a seed skill node, find all reachable skills within depth 2 — this is the candidate skill pool.

**Implementation (JavaScript):**
```javascript
function bfsSkills(seedSkills, graph, maxDepth = 2) {
  const visited = new Set(seedSkills);
  const queue = seedSkills.map(s => ({ node: s, depth: 0 }));

  while (queue.length > 0) {
    const { node, depth } = queue.shift();
    if (depth >= maxDepth) continue;
    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.skill)) {
        visited.add(neighbor.skill);
        queue.push({ node: neighbor.skill, depth: depth + 1 });
      }
    }
  }
  return [...visited]; // full reachable skill pool
}
```

**Output:** Array of all skill node IDs reachable within 2 hops from the job's required skills.

---

### 6.4 Set Intersection Matching (DMS)

**Purpose:** From BFS output, find workers whose skill sets overlap with the reachable skill pool.

```javascript
function matchWorkers(workers, reachableSkills) {
  const skillSet = new Set(reachableSkills);
  return workers.filter(worker =>
    worker.skills.some(skill => skillSet.has(skill))
  );
}
```

Workers with at least one skill in the BFS-reachable pool are candidate matches.

---

### 6.5 Filtering

After BFS matching, apply hard filters:
- **Availability:** Worker's availability window must overlap with job's required date/time
- **Zone/Location:** Worker's registered zone must match or be adjacent to the job's zone

```javascript
function filterCandidates(candidates, job) {
  return candidates.filter(worker =>
    worker.zone_id === job.zone_id &&
    isAvailable(worker.availability, job.datetime)
  );
}
```

---

### 6.6 Greedy Ranking (DAA)

**Purpose:** Order filtered candidates by a composite score.

**Scoring Formula:**
```
score = (skillMatchDepth × 0.5) + (proximityScore × 0.3) + (rating × 0.2)

where:
  skillMatchDepth = 1.0 if exact match, 0.7 if depth-1 match, 0.4 if depth-2 match
  proximityScore  = 1 - (zone_distance / max_zone_distance)  [0.0 to 1.0]
  rating          = worker's average rating / 5.0             [0.0 to 1.0]
```

Return top 5 candidates sorted by descending score.  
Each result includes a plain-English explanation: *"Matched because: pipe fitting → concealed piping (1 hop)"*

---

### 6.7 0/1 Knapsack DP — Team Assembly (DAA)

**Triggered only when:** Job seeker requests a team (e.g., "I need 2 electricians + 1 plumber").

**Model:**
```
Items    = filtered, available workers
Weight   = worker's daily rate (cost)
Value    = worker's skill match score (from ranking step)
Capacity = client's stated daily budget
```

**Constraint:** Each worker selected at most once (0/1 Knapsack).

**Output:** The optimal subset of workers maximizing total skill fit within budget — provably optimal (not heuristic).

**Implementation:** Standard bottom-up DP table in JavaScript.

```javascript
function knapsack(workers, budget) {
  const n = workers.length;
  const dp = Array(n + 1).fill(null).map(() => Array(budget + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const { rate, score } = workers[i - 1];
    for (let w = 0; w <= budget; w++) {
      dp[i][w] = dp[i - 1][w];
      if (rate <= w) {
        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - rate] + score);
      }
    }
  }
  // backtrack to find selected workers
  return backtrack(dp, workers, budget);
}
```

---

## 7. System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                   CLIENT LAYER                           │
│  Worker PWA (React)  │  Seeker App (React)  │  Admin     │
└──────────────────────┬───────────────────────────────────┘
                       │  HTTPS / REST API / WebSocket
                       ↓
┌──────────────────────────────────────────────────────────┐
│                   BACKEND LAYER                          │
│              Node.js + Express API                       │
│   Routes → Controllers → Algorithm Engine               │
│   (NLP · BFS · Matching · Ranking · Knapsack)           │
└──────────────────────┬───────────────────────────────────┘
                       │  Supabase JS Client
                       ↓
┌──────────────────────────────────────────────────────────┐
│                   DATA LAYER                             │
│              Supabase (Postgres + Auth)                  │
│   workers · jobs · skills · skill_graph                 │
│   bookings · reviews · zones                            │
└──────────────────────────────────────────────────────────┘
                       │
                       ↓
              OpenStreetMap Routing API
              (zone-to-zone travel time — free)
```

---

## 8. Database Schema (Supabase / Postgres)

### `workers`
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
name        TEXT NOT NULL
phone       TEXT UNIQUE NOT NULL
zone_id     UUID REFERENCES zones(id)
rate_hour   INTEGER          -- in INR
rate_day    INTEGER          -- in INR
availability JSONB           -- { "mon": ["09:00","18:00"], ... }
rating      NUMERIC(3,2)     -- 0.00 to 5.00
is_verified BOOLEAN DEFAULT false
created_at  TIMESTAMPTZ DEFAULT now()
```

### `skills`
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
name        TEXT UNIQUE NOT NULL   -- e.g., "pipe_fitting"
label       TEXT NOT NULL          -- human-readable: "Pipe Fitting"
category    TEXT                   -- e.g., "plumbing", "electrical"
```

### `skill_graph`
```sql
from_skill  UUID REFERENCES skills(id)
to_skill    UUID REFERENCES skills(id)
weight      NUMERIC(3,2)           -- relatedness: 0.0 to 1.0
PRIMARY KEY (from_skill, to_skill)
```

### `worker_skills`
```sql
worker_id   UUID REFERENCES workers(id)
skill_id    UUID REFERENCES skills(id)
PRIMARY KEY (worker_id, skill_id)
```

### `zones`
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
name        TEXT NOT NULL          -- e.g., "Anekal", "Sarjapura"
lat_center  NUMERIC(9,6)
lng_center  NUMERIC(9,6)
```

### `jobs`
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
seeker_id       UUID REFERENCES auth.users(id)
description_raw TEXT                   -- original free-text input
extracted_skills UUID[]                -- skill IDs from NLP step
zone_id         UUID REFERENCES zones(id)
budget_day      INTEGER                -- INR, for team jobs
is_team_job     BOOLEAN DEFAULT false
status          TEXT DEFAULT 'open'    -- open / booked / completed
created_at      TIMESTAMPTZ DEFAULT now()
```

### `bookings`
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
job_id      UUID REFERENCES jobs(id)
worker_id   UUID REFERENCES workers(id)
status      TEXT DEFAULT 'pending'   -- pending / confirmed / completed / cancelled
booked_at   TIMESTAMPTZ DEFAULT now()
completed_at TIMESTAMPTZ
```

### `reviews`
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
booking_id  UUID REFERENCES bookings(id)
reviewer_id UUID REFERENCES auth.users(id)
worker_id   UUID REFERENCES workers(id)
rating      INTEGER CHECK (rating BETWEEN 1 AND 5)
comment     TEXT
created_at  TIMESTAMPTZ DEFAULT now()
```

---

## 9. API Endpoints

### Worker Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/worker/register` | Create worker profile |
| PUT | `/api/worker/:id/skills` | Update worker skill list |
| PUT | `/api/worker/:id/availability` | Update availability |
| GET | `/api/worker/:id` | Get worker profile |

### Job Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/job/post` | Post a new job (NLP runs here) |
| GET | `/api/job/:id/matches` | Get ranked matched workers (BFS + ranking) |
| POST | `/api/job/:id/team` | Get optimal team (Knapsack — team jobs only) |
| PUT | `/api/job/:id/book` | Confirm a booking |

### Admin Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/workers` | List all workers with status |
| GET | `/api/admin/jobs` | List all jobs with status |
| GET | `/api/admin/bookings` | Booking activity log |
| PUT | `/api/admin/worker/:id/verify` | Mark worker as verified |

### Auth (Supabase handles directly)
| Action | Method |
|---|---|
| Worker/Seeker OTP login | Supabase Phone Auth |
| Admin login | Supabase Email/Password Auth |
| Token refresh | Supabase JS Client (automatic) |

---

## 10. Authentication Flow

```
Worker / Seeker:
  Enter phone number
       ↓
  Supabase sends OTP via SMS
       ↓
  User enters OTP
       ↓
  Supabase issues JWT
       ↓
  JWT stored in localStorage
       ↓
  Sent as Authorization: Bearer <token> on every API request
       ↓
  Backend validates via Supabase Admin SDK

Admin:
  Email + Password
       ↓
  Supabase issues JWT with role = "admin"
       ↓
  Backend checks role claim before serving /api/admin/* routes
```

**Row Level Security (RLS):**
- Workers can only read/update their own row in `workers`
- Seekers can only read/update their own jobs in `jobs`
- Reviews are readable by all, writable only by the reviewer
- Admin role bypasses RLS via service role key (server-side only)

---

## 11. Frontend Architecture

### Shared
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **State:** React Context + useState (no Redux needed at this scale)
- **Auth:** Supabase JS Client (`@supabase/supabase-js`)
- **HTTP:** Fetch API / Axios to backend

### Worker PWA (`/worker-app`)
- Manifest + service worker for "Add to Home Screen" installability
- Screens: Onboarding → Skill Entry → Availability → Notification Feed → Booking History

### Job Seeker App (`/seeker-app`)
- Screens: Job Description Input → Match Results → Worker Profile → Booking Confirmation → Team Assembly (if team job)

### Admin Dashboard (`/admin-app`)
- Screens: Worker List → Job Activity → Booking Log → Verify Workers

---

## 12. Backend Architecture

```
backend/
  server.js               ← Express app entry point
  routes/
    worker.routes.js
    job.routes.js
    admin.routes.js
  controllers/
    worker.controller.js
    job.controller.js
    admin.controller.js
  algorithms/
    nlp.js                ← Rule-based keyword extraction
    skillGraph.js         ← Graph loader + adjacency map builder
    bfs.js                ← BFS traversal
    matching.js           ← Set intersection + filtering
    ranking.js            ← Greedy composite score
    knapsack.js           ← 0/1 Knapsack DP
  data/
    keyword-dictionary.json   ← NLP keyword → skill_id map (~150 entries)
    skill-graph-seed.json     ← Initial graph edges for seeding DB
  middleware/
    auth.js               ← JWT validation via Supabase Admin SDK
    roleCheck.js          ← Admin role enforcement
  lib/
    supabaseClient.js     ← Supabase client init
```

---

## 13. Folder Structure (Full Project)

```
skillbridge/
├── frontend/
│   ├── worker-app/         ← React PWA (workers)
│   ├── seeker-app/         ← React web app (job seekers)
│   └── admin-app/          ← React dashboard (NGO admin)
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── algorithms/
│   ├── data/
│   ├── middleware/
│   └── lib/
├── database/
│   ├── schema.sql          ← All CREATE TABLE statements
│   ├── rls_policies.sql    ← Row Level Security rules
│   └── seed/
│       ├── skills.json     ← ~30–40 standardized skill nodes
│       ├── skill_graph.json ← ~60–80 edges with weights
│       ├── zones.json      ← Bengaluru peri-urban zones
│       └── workers.json    ← 20 sample worker profiles
└── docs/
    ├── PSM_MASTER_CONTEXT.md   ← This file
    └── api_spec.md             ← Full API documentation
```

---

## 14. Deployment Architecture

| Component | Platform | Notes |
|---|---|---|
| Worker PWA | Vercel | React build, auto-deploy from GitHub |
| Seeker App | Vercel | React build, auto-deploy from GitHub |
| Admin Dashboard | Vercel | React build, auto-deploy from GitHub |
| Backend API | Vercel Serverless Functions or Railway (free tier) | Node.js + Express |
| Database + Auth | Supabase (free tier) | Managed Postgres, 500MB limit |
| Road routing | OpenStreetMap Nominatim / OSRM | Free, no API key needed |

**Deployment flow:**
```
GitHub push → Vercel auto-build → live at skillbridge.vercel.app
Supabase stays always-on (free tier, no cold start)
```

---

## 15. Real-Time Notifications

- **Mechanism:** Supabase Realtime (built-in, no extra setup)
- **Flow:** New job inserted into `jobs` table → Supabase broadcasts change → Worker PWA subscribed to relevant zone channel receives notification
- **Fallback:** Polling every 30 seconds if Realtime connection drops

```javascript
// Worker PWA subscribes to their zone's job channel
supabase
  .channel('zone-jobs')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'jobs',
    filter: `zone_id=eq.${worker.zone_id}`
  }, handleNewJob)
  .subscribe();
```

---

## 16. Testing Strategy

| Layer | What to Test | How |
|---|---|---|
| NLP | Given raw text → assert correct skill IDs extracted | Jest unit tests, 15–20 test strings |
| BFS | Given seed skill → assert all expected nodes reached at correct depth | Jest unit tests with mock graph |
| Knapsack | Given workers + budget → assert optimal team matches expected selection | Jest unit tests with known inputs |
| Ranking | Given candidates → assert ordering by composite score | Jest unit tests |
| API | All endpoints return correct status and shape | Postman collection, automated with Newman |
| Auth | OTP flow, JWT validation, RLS enforcement | Manual test + Supabase dashboard |
| End-to-end | Worker registers → Seeker posts job → Match returned → Booking confirmed | Manual walkthrough, recorded for demo |

---

## 17. Seed Data Plan

To demonstrate the system at submission/demo:

- **Skills:** 30–40 nodes across categories: plumbing, electrical, painting, carpentry, tiling
- **Skill graph edges:** ~60–80 edges with relatedness weights
- **Zones:** 6 peri-urban Bengaluru zones (Anekal, Sarjapura, Kanakapura, Electronic City fringe, Whitefield outskirts, Attibele)
- **Worker profiles:** 20 profiles across zones with varied skill sets, rates, and availability
- **Sample jobs:** 5–10 pre-seeded jobs to demonstrate matching

---

## 18. Key Implementation Decisions

| Decision | Choice | Reason |
|---|---|---|
| NLP approach | Rule-based keyword dictionary | No training data needed; fully implementable in one JS file; academically mapped to AI |
| Graph storage | Supabase edge table | Queryable, persistent, easy to seed |
| BFS execution | Server-side in Node.js | Graph may be too large to send to client; keeps algorithm logic centralized |
| Knapsack trigger | Only for `is_team_job = true` | Keeps single-worker flow fast; Knapsack used purposefully |
| Auth provider | Supabase Phone OTP | Low barrier for workers (no email required) |
| Realtime | Supabase Realtime (built-in) | No additional infra; free at this scale |
| Deployment | Vercel + Supabase | Both free tier; zero ops overhead for semester project |
| Frontend | Three separate React apps | Clean separation of concerns; each deployable independently |

---

## 19. Limitations (Honest)

- NLP keyword dictionary covers only predefined skills — novel or very informal terms may not map
- BFS depth is fixed at 2 — deeper traversal may return irrelevant matches
- Knapsack DP runs in O(n × budget) — practical for budgets under ₹10,000 and worker counts under 50
- Zone-based proximity is an approximation — not precise GPS routing
- No automated fraud detection — admin manually reviews flagged reports

---

## 20. Future Scope (Realistic, Post-Semester)

- Kannada language support for worker-facing screens (Web Speech API for voice input)
- GPS-based proximity using device location instead of zone approximation
- Aadhaar-linked worker verification via DigiLocker API
- UPI payout integration for direct worker earnings transfer
- Expand skill graph to 100+ nodes covering more trade categories
- Mobile app (React Native) wrapping the same backend

---


*End of PSM_MASTER_CONTEXT.md*
*Version: 1.0 — Semester IV Engineering Project*
*Use this document as the starting context for all workstream-specific chats (frontend, backend, database, algorithms, deployment, testing).*
