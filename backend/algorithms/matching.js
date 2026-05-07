function matchWorkers(workers, reachableSkills) {
  const skillSet = new Set(reachableSkills);
  return workers.filter(worker =>
    worker.skills && worker.skills.some(skill => skillSet.has(skill))
  );
}

function filterCandidates(candidates, job) {
  return candidates.filter(worker =>
    worker.zone_id === job.zone_id
  );
}

module.exports = { matchWorkers, filterCandidates };