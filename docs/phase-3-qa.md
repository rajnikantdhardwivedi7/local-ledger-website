# Phase 3 — motion QA and stabilization (2026-11-18)

## Scope
Continues from Phase 2 commit `4baf8ce8c80c130d3d5595455eb0c5a8867ee3b5`. No changes to app logic, marketing copy, branding, routes, or auth.

## Correctness fixes
- Screenshot overlay now renders in a React portal attached to `document.body`. Before this change, a transformed page ancestor caused the mobile sheet's drag handle to render below the visible viewport when the screenshot gallery had been scrolled into view.
- Pointer-cancel now snaps the sheet back rather than accidentally dismissing it.
- Gesture threshold logic is pure and unit-tested; rapid close paths use a single-shot completion guard.
- The existing spring/WAAPI implementation remains dependency-free.

## Automated verification
- `npm ci`: pass.
- `npm run typecheck`: pass.
- `npm run lint`: pass (currently TypeScript checking; not ESLint).
- `npm test`: **5/5** unit tests pass.
- `npm run build`: pass with Vite 8.3.8, JS 232.59 kB (72.52 kB gzip), CSS 24.59 kB (6.32 kB gzip).
- `npm run test:e2e:chromium`: **14/14** desktop/mobile browser tests pass. Tests cover preview open/close, Escape, focus, keyboard tab containment, dragging/snap-back, repeated interactions, reduced motion, viewport rotation, overflow and frame pacing/CLS.
- A GitHub Actions job on Ubuntu 24.04 now provisions Chromium and WebKit and runs the full suite. Its WebKit results were **not** verified in the Vercel QA sandbox.

## Browser limitations
- Chromium desktop and emulated mobile ran headlessly in a Vercel sandbox (Ubuntu 26.04). Mobile touch drags were simulated with Chrome DevTools Protocol; they are not physical-device tests.
- WebKit binaries downloaded but **could not launch** in this Ubuntu 26.04 environment due to missing system libraries (including `libgstreamer-1.0.so.0`, `libicu74`, and `libWPEWebKit`). The system's distribution does not supply all Ubuntu 24.04-targeted packages.
- iOS Safari and real mid-range Android devices remain untested.
- Browser history/navigation was not exercised beyond the existing marketing page's unchanged routes and links.

## Performance observations
The automated frame probe samples `requestAnimationFrame` over approximately 900 ms during screenshot expansion, and observes layout-shift entries. It is a coarse **headless browser** measurement, not GPU compositing telemetry or device FPS.
- A focused run measured **43 FPS desktop** (1 frame above 34 ms; max 50 ms) and **60 FPS mobile emulation** (0 frames above 34 ms; max 17 ms), with **CLS 0** for both.
- In a separate full-suite run the desktop headless sandbox produced **15 FPS**, demonstrating substantial environment contention and measurement variability. Do not treat these results as real-device benchmarks.
- The portal fix eliminates an off-screen mobile panel, and transform/opacity motion avoids layout-dependent per-frame React renders. A full performance trace, memory heap profiling, and long-running leak tests remain outstanding.

## Dependency security
- Updated Vite **8.1.0 → 8.3.8**, preserving major compatibility, and added `@playwright/test@1.58.2` as a dev dependency.
- `npm audit` still reports **four high-severity development dependency findings** for `vite`, `picomatch`, `tinyglobby`, and `fdir`, associated with the picomatch ReDoS advisory `GHSA-fc5q-39xc-vjpf`. Latest available `picomatch` at test time was 4.0.7 and remained within the affected range.
- `npm audit --omit=dev` reported **zero** vulnerabilities.
- No `npm audit fix --force` or incompatible major downgrade was applied.

## Running locally / in CI
```sh
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install --with-deps chromium webkit
npm run test:e2e
```
The Playwright suite uses a local Vite development server. CI is configured for Ubuntu 24.04 because the temporary QA sandbox's Ubuntu 26.04 environment could not satisfy WebKit's binary dependencies.
