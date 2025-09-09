import test from 'node:test';
import { strict as assert } from 'node:assert';
import { calculatePacing } from './pacing.js';

test('calculate pacing with partial progress', () => {
  const flight = { startDate: new Date('2024-01-01'), endDate: new Date('2024-01-10'), budget: 1000 };
  const actuals = [
    { date: new Date('2024-01-01'), spend: 50 },
    { date: new Date('2024-01-02'), spend: 100 },
  ];
  const { planned, actual, variancePct } = calculatePacing(flight, actuals, new Date('2024-01-05'));
  assert.equal(planned, 500);
  assert.equal(actual, 150);
  assert(Math.abs(variancePct + 70) < 0.0001);
});

test('calculate pacing after flight end', () => {
  const flight = { startDate: new Date('2024-01-01'), endDate: new Date('2024-01-10'), budget: 1000 };
  const actuals = [{ date: new Date('2024-01-10'), spend: 900 }];
  const { planned, actual, variancePct } = calculatePacing(flight, actuals, new Date('2024-01-20'));
  assert.equal(planned, 1000);
  assert.equal(actual, 900);
  assert(Math.abs(variancePct - (-10)) < 0.0001);
});
