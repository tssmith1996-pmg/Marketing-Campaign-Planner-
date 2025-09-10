/**
 * Estimate cost given budget, fee and margin percentage.
 * @param {number} budget
 * @param {number} fee
 * @param {number} marginPct
 * @returns {number}
 */
export function estimateCost(budget, fee, marginPct) {
  return Number(((budget || 0) * (marginPct || 0) / 100 + (fee || 0)).toFixed(2));
}

/**
 * Sum an array of numbers, ignoring NaN.
 * @param {number[]} values
 * @returns {number}
 */
export function total(values) {
  return Number(values.reduce((s, v) => s + (Number(v) || 0), 0).toFixed(2));
}
