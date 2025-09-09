/**
 * @typedef {Object} LineItemFactors
 * @property {string} channel
 * @property {string} format
 * @property {string} audience
 * @property {string} start
 * @property {string} end
 */

const DIGITAL_CHANNELS = ["Display", "Video", "Social", "Search", "Audio"];
const BASE_RATES = { digital: 5, traditional: 20 };
const FORMAT_FACTORS = {
  Banner: 1,
  PreRoll: 1.2,
  TV30: 2,
  Radio: 1.5,
};
const AUDIENCE_FACTORS = {
  "18-34": 1,
  "35-54": 1.1,
  "55+": 0.9,
};

/**
 * Estimate line item cost based on factors.
 * @param {LineItemFactors} factors
 * @returns {number}
 */
export function estimateCost(factors) {
  const days =
    (new Date(factors.end).getTime() - new Date(factors.start).getTime()) /
      (1000 * 60 * 60 * 24) +
    1;
  const type = DIGITAL_CHANNELS.includes(factors.channel)
    ? "digital"
    : "traditional";
  const base = BASE_RATES[type];
  const format = FORMAT_FACTORS[factors.format] ?? 1;
  const audience = AUDIENCE_FACTORS[factors.audience] ?? 1;
  return days * base * format * audience;
}
