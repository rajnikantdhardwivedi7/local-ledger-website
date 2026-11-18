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

import { shouldDismissSheet, sheetDisplacement } from "../src/sheet-gesture.ts";
test("sheet dismissal uses distance or a deliberate quick flick", () => {
  assert.equal(shouldDismissSheet(114, 0.2), false);
  assert.equal(shouldDismissSheet(115, 0.2), true);
  assert.equal(shouldDismissSheet(35, 0.65), true);
  assert.equal(shouldDismissSheet(34, 2), false);
  assert.equal(shouldDismissSheet(60, 0.3), false);
});
test("upward drags cannot pull the sheet past its rest position", () => {
  assert.equal(sheetDisplacement(200, 100), 0);
  assert.equal(sheetDisplacement(200, 220), 20);
});
