# CortexAuto Landing Site (Next.js + Tailwind)

Next.js App Router landing page with a scroll-controlled canvas frame animation loaded from `/public/frames/manifest.json`.

## Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Canvas-based scroll scrubbing

## Features

- Hero + marketing sections (`Available Now`, `Coming Soon`, `Analytics`, `FAQ`, `CTA`)
- Full-screen sticky animation section (`500vh` scroll container)
- Scroll progress maps to frame index with lerp smoothing
- Forward/reverse scrubbing based on scroll direction
- `requestAnimationFrame` render loop
- DevicePixelRatio-aware canvas sizing for crisp output
- Aspect-ratio-safe cover drawing
- Immediate preload of first 10 frames, lazy-load remainder
- Gradient overlay for readable text and smooth fade to next section

## Frame Setup

1. Put sequential frame images in:
   - `Landing Site/public/frames/`
2. Ensure `Landing Site/public/frames/manifest.json` contains:

```json
{
  "files": ["frame_0001.png", "frame_0002.png"]
}
```

The existing build already includes a copied `frames` folder and manifest from your workspace.

## Run

```bash
cd "Landing Site"
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Key File

- `components/ScrollAnimation.tsx`
  - Contains manifest loading, frame preloading strategy, scroll->progress->frame mapping, and canvas drawing logic.