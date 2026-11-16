# Local Ledger website

A standalone, mobile-first landing website for Local Ledger, with the daily experience timeline, founder story and personal note by Rajnikant Dhar Dwivedi.

The application stays at https://local-ledger-henna.vercel.app/?app=1. All app CTAs link there. This repository contains marketing code and approved public assets only; it does not contain Supabase credentials, authentication code, database migrations, or the private application's source.

## Development

Use Node.js 24 and run:

```sh
npm ci
npm run dev
npm run build
```

## Vercel

Import this repository using the Vite framework preset, build command `npm run build`, output directory `dist`, and Node.js 24. Pushes to `main` deploy production.

Set the optional build-time variable `VITE_ANDROID_APK_URL` only after publishing and testing a signed APK over HTTPS. Until then, the download button is hidden. No store release badges are shown.

## Assets

- Founder photo: user-supplied photograph, optimized as WebP.
- Product screens: user-supplied map, activity, profile and selfie-comparison screenshots, cropped to remove browser/device chrome. App controls and map attribution are preserved.
- DM Sans: self-hosted, with the Open Font License in `public/fonts/OFL-DM-Sans.txt`.
- Website copy is original. Nomadtable provided visual layout and styling reference only.
