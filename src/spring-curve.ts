/** Normalized critically damped spring, with no overshoot. */
export function springProgress(seconds: number, response = 18): number {
  const time = Math.max(0, seconds);
  return 1 - (1 + response * time) * Math.exp(-response * time);
}
