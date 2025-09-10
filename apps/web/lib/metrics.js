/**
 * Compute a metric value from campaign actuals.
 * @param {Array<{spend:number, impressions?:number, clicks?:number, conversions?:number}>} actuals
 * @param {string} metric one of IMPRESSIONS, REACH, WEBSITE_TRAFFIC, CTR, CPC, LEADS, CONVERSION_RATE, CAC, ROI
 * @returns {number}
 */
export function computeMetric(actuals, metric) {
  const totals = actuals.reduce(
    (acc, cur) => {
      acc.spend += Number(cur.spend || 0);
      acc.impressions += cur.impressions || 0;
      acc.clicks += cur.clicks || 0;
      acc.conversions += cur.conversions || 0;
      return acc;
    },
    { spend: 0, impressions: 0, clicks: 0, conversions: 0 }
  );
  switch (metric) {
    case "IMPRESSIONS":
      return totals.impressions;
    case "CTR":
      return totals.impressions ? totals.clicks / totals.impressions : 0;
    case "CPC":
      return totals.clicks ? totals.spend / totals.clicks : 0;
    case "CONVERSION_RATE":
      return totals.clicks ? totals.conversions / totals.clicks : 0;
    case "CAC":
      return totals.conversions ? totals.spend / totals.conversions : 0;
    case "ROI":
      return totals.spend ? totals.conversions / totals.spend : 0;
    case "REACH":
    case "WEBSITE_TRAFFIC":
    case "LEADS":
    default:
      return 0;
  }
}
