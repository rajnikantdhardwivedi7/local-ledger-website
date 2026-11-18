import { test, expect } from "@playwright/test";

async function swipe(page, x, y, distance) {
  if (page.context().browser().browserType().name() === "chromium" && await page.evaluate(() => matchMedia("(pointer: coarse)").matches)) {
    const session = await page.context().newCDPSession(page);
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y, id: 1 }] });
    for (let i = 1; i <= 8; i++) {
      await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: y + distance * i / 8, id: 1 }] });
      await page.waitForTimeout(20);
    }
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await session.detach();
  } else {
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y + distance, { steps: 8 });
    await page.mouse.up();
  }
}
async function openPreview(page) {
  const trigger = page.getByRole("button", { name: /Preview explore screenshot/i });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Screenshot preview" });
  await expect(dialog).toBeVisible();
  return { trigger, dialog };
}

test("thumbnail opens and Escape restores focus, without horizontal overflow", async ({ page }) => {
  await page.goto("/");
  const { trigger, dialog } = await openPreview(page);
  await expect(dialog.locator("img")).toHaveAttribute("src", /app-map.webp/);
  await expect(dialog.getByRole("button", { name: "Close preview" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("dragging the handle down dismisses, short drag snaps back", async ({ page }) => {
  await page.goto("/");
  const { dialog } = await openPreview(page);
  const handle = dialog.locator(".ll-sheet-drag-zone");
  const rect = await handle.boundingBox();
  expect(rect).toBeTruthy();
  const x = rect.x + rect.width / 2, y = rect.y + rect.height / 2;
  await swipe(page, x, y, 22);
  await expect(dialog).toBeVisible();
  await expect.poll(async () => dialog.evaluate(el => Math.abs(new DOMMatrix(getComputedStyle(el).transform).m42)), { timeout: 1500 }).toBeLessThan(2);
  const next = await handle.boundingBox();
  const nx = next.x + next.width / 2, ny = next.y + next.height / 2;
  await swipe(page, nx, ny, 180);
  await expect(dialog).toHaveCount(0);
});

test("rapid open-close cycles preserve body scroll and focus", async ({ page }) => {
  await page.goto("/");
  for (let i = 0; i < 4; i++) {
    const { trigger, dialog } = await openPreview(page);
    await dialog.getByRole("button", { name: "Close preview" }).click();
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("reduced motion avoids running preview image animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const { dialog } = await openPreview(page);
  const animations = await dialog.locator("img").evaluate(img => img.getAnimations().length);
  expect(animations).toBe(0);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});

test("viewport rotation does not cause horizontal scrolling", async ({ page }) => {
  await page.goto("/");
  for (const [width, height] of [[390, 844], [844, 390], [375, 667], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(80);
    const delta = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(delta, `overflow at ${width}x${height}`).toBeLessThanOrEqual(1);
  }
});



test("focus stays inside the dialog while tabbing", async ({ page }) => {
  await page.goto("/");
  const { dialog } = await openPreview(page);
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("button", { name: "Close preview" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("button", { name: "Close preview" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});

test("record compositor frame pacing and cumulative layout shift", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: /Preview explore screenshot/i });
  await trigger.scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    window.__motionQA = { timestamps: [], cls: 0 };
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__motionQA.cls += entry.value;
      }
    });
    try { observer.observe({ type: "layout-shift", buffered: false }); } catch {}
    const start = performance.now();
    const tick = t => {
      window.__motionQA.timestamps.push(t);
      if (t - start < 900) requestAnimationFrame(tick);
      else observer.disconnect();
    };
    requestAnimationFrame(tick);
  });
  await trigger.click();
  await page.waitForTimeout(1000);
  const result = await page.evaluate(() => {
    const { timestamps, cls } = window.__motionQA;
    const gaps = timestamps.slice(1).map((t, i) => t - timestamps[i]);
    const duration = timestamps.at(-1) - timestamps[0];
    return { frames: gaps.length, avgFps: Math.round(gaps.length * 1000 / duration), slowFramesOver34ms: gaps.filter(x => x > 34).length, maxFrameMs: Math.round(Math.max(...gaps)), cls };
  });
  console.log("MOTION_METRICS", JSON.stringify(result));
  expect(result.frames).toBeGreaterThan(5);
  expect(result.cls).toBeLessThan(0.1);
});
