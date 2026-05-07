const supabase = require('../lib/supabaseClient');

async function registerWorker(req, res) {
  const { name, phone, zone_id, rate_hour, rate_day, availability } = req.body;
  const { data, error } = await supabase
    .from('workers')
    .insert([{ name, phone, zone_id, rate_hour, rate_day, availability }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json({ worker: data[0] });
}

async function getWorker(req, res) {
  const { data, error } = await supabase
    .from('workers')
    .select('*, worker_skills(skill_id)')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: error.message });
  return res.json({ worker: data });
}

async function updateSkills(req, res) {
  const { skill_ids } = req.body;
  const worker_id = req.params.id;

  await supabase.from('worker_skills').delete().eq('worker_id', worker_id);

  const rows = skill_ids.map(skill_id => ({ worker_id, skill_id }));
  const { error } = await supabase.from('worker_skills').insert(rows);

  if (error) return res.status(400).json({ error: error.message });
  return res.json({ message: 'Skills updated' });
}

async function updateAvailability(req, res) {
  const { availability } = req.body;
  const { error } = await supabase
    .from('workers')
    .update({ availability })
    .eq('id', req.params.id);

  if (error) return res.status(400).json({ error: error.message });
  return res.json({ message: 'Availability updated' });
}

module.exports = { registerWorker, getWorker, updateSkills, updateAvailability };