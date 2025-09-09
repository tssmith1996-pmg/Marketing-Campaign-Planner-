import { estimateCost } from "./cost";

test("estimates digital banner cost", () => {
  const cost = estimateCost({
    channel: "Display",
    format: "Banner",
    audience: "18-34",
    start: "2024-01-01",
    end: "2024-01-31",
  });
  expect(cost).toBeGreaterThan(0);
});
