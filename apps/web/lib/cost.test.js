import test from 'node:test';
import assert from 'node:assert';
import { estimateCost } from './cost.js';

test('estimates digital banner cost', () => {
  const cost = estimateCost({
    channel: 'Display',
    format: 'Banner',
    audience: '18-34',
    start: '2024-01-01',
    end: '2024-01-31',
  });
  assert.ok(cost > 0);
});
