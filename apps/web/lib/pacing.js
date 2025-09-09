/**
 * Calculate pacing for a flight or plan.
 * @param {{startDate: Date, endDate: Date, budget: number}} flight
 * @param {Array<{date: Date, spend: number}>} actuals
 * @param {Date} [asOf]
 * @returns {{planned: number, actual: number, variancePct: number}}
 */
export function calculatePacing(flight, actuals, asOf = new Date()) {
  const MS = 24 * 60 * 60 * 1000;
  const start = new Date(flight.startDate);
  const end = new Date(flight.endDate);
  const asOfDate = asOf < start ? start : asOf > end ? end : asOf;
  const totalDays = Math.max(1, Math.ceil((end - start) / MS) + 1);
  const elapsedDays = Math.max(0, Math.min(totalDays, Math.ceil((asOfDate - start) / MS) + 1));
  const planned = Number(flight.budget) * (elapsedDays / totalDays);
  const actual = actuals
    .filter(a => a.date <= asOfDate && a.date >= start && a.date <= end)
    .reduce((sum, a) => sum + Number(a.spend || 0), 0);
  const variancePct = planned ? ((actual - planned) / planned) * 100 : 0;
  return { planned, actual, variancePct };
}
