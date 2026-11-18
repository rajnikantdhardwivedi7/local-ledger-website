import test from "node:test";
import assert from "node:assert/strict";
import { springProgress } from "../src/spring-curve.ts";

test("spring starts at rest and settles near the target", () => {
  assert.equal(springProgress(0), 0);
  assert.ok(springProgress(.4) > .99);
  assert.ok(springProgress(1) < 1.000001);
});
test("spring remains bounded and does not bounce", () => {
  let previous = 0;
  for (let ms = 0; ms <= 600; ms += 10) {
    const value = springProgress(ms / 1000);
    assert.ok(value >= previous && value <= 1, `invalid progress at ${ms}ms: ${value}`);
    previous = value;
  }
});
test("spring handles negative time without invalid progress", () => {
  assert.equal(springProgress(-1), 0);
});
