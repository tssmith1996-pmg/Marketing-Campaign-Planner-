import test from "node:test";
import assert from "node:assert/strict";
import { estimateCost, total } from "./allocation.js";

test("estimateCost computes margin and fee", () => {
  assert.equal(estimateCost(1000, 50, 10), 150);
  assert.equal(estimateCost(0, 0, 20), 0);
});

test("total sums numbers and ignores NaN", () => {
  assert.equal(total([1, 2, 3]), 6);
  assert.equal(total([10, NaN, 5]), 15);
});
