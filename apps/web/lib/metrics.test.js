import test from 'node:test';
import assert from 'node:assert';
import { computeMetric } from './metrics.js';

const sample = [
  { spend: 100, impressions: 1000, clicks: 50, conversions: 5 },
  { spend: 50, impressions: 500, clicks: 20, conversions: 2 },
];

test('computeMetric impressions', () => {
  assert.strictEqual(computeMetric(sample, 'IMPRESSIONS'), 1500);
});

test('computeMetric CTR', () => {
  const ctr = computeMetric(sample, 'CTR');
  assert.ok(Math.abs(ctr - 70 / 1500) < 1e-6);
});

test('computeMetric CPC', () => {
  assert.strictEqual(computeMetric(sample, 'CPC'), 150 / 70);
});

test('computeMetric conversion rate', () => {
  const rate = computeMetric(sample, 'CONVERSION_RATE');
  assert.ok(Math.abs(rate - 7 / 70) < 1e-6);
});

test('computeMetric CAC', () => {
  assert.strictEqual(computeMetric(sample, 'CAC'), 150 / 7);
});

test('computeMetric ROI', () => {
  assert.strictEqual(computeMetric(sample, 'ROI'), 7 / 150);
});
