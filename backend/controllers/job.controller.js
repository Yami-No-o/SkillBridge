const supabase = require('../lib/supabaseClient');
const { extractSkills } = require('../algorithms/nlp');
const { bfsSkills } = require('../algorithms/bfs');
const { matchWorkers, filterCandidates } = require('../algorithms/matching');
const { rankWorkers } = require('../algorithms/ranking');
const { knapsack } = require('../algorithms/knapsack');

async function postJob(req, res) {
  const { description_raw, zone_id, budget_day, is_team_job, seeker_id } = req.body;

  // Step 1: NLP
  const skillNames = extractSkills(description_raw);

  // Step 2: Get skill IDs from DB
  const { data: skillRows } = await supabase
    .from('skills')
    .select('id, name')
    .in('name', skillNames);

  const extracted_skills = skillRows ? skillRows.map(s => s.id) : [];

  // Step 3: Save job
  const { data, error } = await supabase
    .from('jobs')
    .insert([{ description_raw, zone_id, budget_day, is_team_job, seeker_id, extracted_skills }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json({ job: data[0], extracted_skills: skillNames });
}

async function getMatches(req, res) {
  const { id } = req.params;

  // Get job
  const { data: job } = await supabase.from('jobs').select('*').eq('id', id).single();
  if (!job) return res.status(404).json({ error: 'Job not found' });

  // Get skill graph
  const { data: edges } = await supabase.from('skill_graph').select('from_skill, to_skill, weight');

  // Build adjacency map
  const graph = {};
  for (const edge of edges || []) {
    if (!graph[edge.from_skill]) graph[edge.from_skill] = [];
    graph[edge.from_skill].push({ skill: edge.to_skill, weight: edge.weight });
  }

  // BFS
  const reachable = bfsSkills(job.extracted_skills || [], graph);

  // Get all workers with their skills
  const { data: workers } = await supabase
    .from('workers')
    .select('*, worker_skills(skill_id)')
    .eq('zone_id', job.zone_id);

  const workersWithSkills = (workers || []).map(w => ({
    ...w,
    skills: w.worker_skills.map(ws => ws.skill_id)
  }));

  // Match + Filter + Rank
  const matched = matchWorkers(workersWithSkills, reachable);
  const filtered = filterCandidates(matched, job);
  const ranked = rankWorkers(filtered, reachable, job.extracted_skills, reachable);

  return res.json({ matches: ranked });
}

async function getTeam(req, res) {
  const { id } = req.params;
  const { data: job } = await supabase.from('jobs').select('*').eq('id', id).single();
  if (!job || !job.is_team_job) return res.status(400).json({ error: 'Not a team job' });

  const { data: workers } = await supabase
    .from('workers')
    .select('*, worker_skills(skill_id)')
    .eq('zone_id', job.zone_id);

  const workersWithSkills = (workers || []).map(w => ({
    ...w,
    skills: w.worker_skills.map(ws => ws.skill_id),
    score: w.rating || 0
  }));

  const team = knapsack(workersWithSkills, job.budget_day || 2000);
  return res.json({ team });
}

async function bookJob(req, res) {
  const { worker_id } = req.body;
  const { data, error } = await supabase
    .from('bookings')
    .insert([{ job_id: req.params.id, worker_id }])
    .select();

  if (error) return res.status(400).json({ error: error.message });

  await supabase.from('jobs').update({ status: 'booked' }).eq('id', req.params.id);
  return res.status(201).json({ booking: data[0] });
}

module.exports = { postJob, getMatches, getTeam, bookJob };