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
  return [...visited];
}

module.exports = { bfsSkills };