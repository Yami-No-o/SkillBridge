function knapsack(workers, budget) {
  const n = workers.length;
  const dp = Array(n + 1).fill(null)
    .map(() => Array(budget + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const { rate_day, score } = workers[i - 1];
    const rate = Math.round(rate_day || 0);
    for (let w = 0; w <= budget; w++) {
      dp[i][w] = dp[i - 1][w];
      if (rate <= w) {
        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - rate] + score);
      }
    }
  }

  // Backtrack to find selected workers
  const selected = [];
  let w = budget;
  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(workers[i - 1]);
      w -= Math.round(workers[i - 1].rate_day || 0);
    }
  }

  return selected;
}

module.exports = { knapsack };