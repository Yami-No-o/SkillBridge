function rankWorkers(candidates, reachableSkills, depth1Skills, depth2Skills) {
  const scored = candidates.map(worker => {
    const workerSkills = worker.skills || [];

    let skillMatchDepth = 0;
    if (workerSkills.some(s => depth1Skills && depth1Skills.includes(s))) {
      skillMatchDepth = 1.0;
    } else if (workerSkills.some(s => depth2Skills && depth2Skills.includes(s))) {
      skillMatchDepth = 0.7;
    } else {
      skillMatchDepth = 0.4;
    }

    const rating = (worker.rating || 0) / 5.0;
    const score = (skillMatchDepth * 0.5) + (rating * 0.5);

    return { ...worker, score };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 5);
}

module.exports = { rankWorkers };