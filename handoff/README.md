# Front Page Handoff

This folder documents exactly what controls the front page layout, spacing, and background effects so another engineer (or model) can quickly understand and modify it.

## Primary Files

- `app/page.tsx`
  - The main page composition. Sections are tagged for measurement with `data-debug-id`: `hero`, `featured`, `brands`, `grid`.
  - Uses layout utilities (`section`, `pt-hero`, `container-max`, `mt-*`) so spacing is controlled by CSS tokens.
  - Imports the spacing overlay debugger: `src/components/SpacingDebugger.tsx` (toggle with `?debug=layout`).

- `src/App.css`
  - Single source of truth for spacing tokens and layout utilities.
  - Important tokens (edit these to reflow top-of-page spacing):
    - `--hero-top`: distance under the fixed header to hero content
    - `--hero-gap`: internal gap inside the hero stack (headline ↔ meta)
    - `--hero-to-featured`: gap from hero section to the featured video section
    - `--featured-to-grid`: gap from featured video section to the video grid
    - `--grid-gap`: vertical spacing between grid items
  - Utility classes used by `app/page.tsx`: `.section`, `.pt-hero`, `.container-max`, `.left-align`, `.mt-*`, `.stack-*`, `.measure-hero`, `.hero-copy`.

- `src/components/SpacingDebugger.tsx`
  - Visual overlay to measure exact pixel gaps between hero → featured → brands → grid.
  - Toggle: visit the page with `?debug=layout` or press `Cmd/Ctrl + D`.

- `src/components/LiquidEther.jsx`
  - WebGL background (with safe fallback if context fails).
  - Does not affect vertical layout; only visuals.

## Current Token Values (defaults)

Defined in `src/App.css :root`:

```
--hero-top: 56px;
--hero-gap: 12px;
--hero-to-featured: 24px;
--featured-to-grid: 24px;
--grid-gap: 40px;
```

Adjust these numbers to tune spacing globally without touching component code.

## How to Inspect and Measure Spacing

1. Open the site with `?debug=layout` appended to the URL, e.g. `http://localhost:3001/?debug=layout`.
2. Read the overlay chips:
   - `hero → featured`
   - `featured → brands`
   - `brands → grid`
3. Edit tokens in `src/App.css`, save, and watch the pixels update.

## Hero Text Measure and Wrap

- The hero uses `.measure-hero .hero-copy` for a clean text measure and rhythm.
- The third line of the headline is kept on one line via `style={{ whiteSpace: 'nowrap' }}` on that final line.
- If you want a different measure at specific breakpoints, add a media query around `.measure-hero` in `src/App.css`.

## Known Pitfalls and Fixes

- If the hero appears to push the page down, ensure it is not using `min-height: 100vh`. We use `min-height: auto` in `app/page.tsx`.
- The fixed header height changed? Update `--hero-top` accordingly.
- If spacing doesn’t change, check specificity: we consolidated to tokenized selectors (e.g., `.hero-video.featured-video-section`), so tokens should always win.

## Quick Tasks for External Reviewers

- To tighten hero → featured to 16px: set `--hero-to-featured: 16px` in `src/App.css`.
- To reduce overall top offset under the header: set `--hero-top: 48px` (or desired value).
- To pack the grid: set `--grid-gap: 32px`.

## How to run

```
npm run dev
# open http://localhost:3001/?debug=layout to see the spacing overlay
```

## Contact

- Primary owner: `app/page.tsx` (front page composition)
- Styling system: `src/App.css`
- Debug tooling: `src/components/SpacingDebugger.tsx`

---

## Liquid Ether Background (handoff)

This section documents the moving background used across background demo pages. It is a self-contained React component powered by Three.js shaders with a graceful CSS fallback if WebGL initialization fails.

### Files

- `handoff/LiquidEther.jsx` (original complex version)
- `handoff/LiquidEtherSimple.jsx` ⭐ **NEW OPTIMIZED VERSION**
- `handoff/LiquidEther.css`
- `handoff/ExamplePage.jsx` (usage example without Next.js)

The same implementation also exists in `src/components/LiquidEtherSimple.jsx` for production usage inside this repo.

### ⭐ LiquidEtherSimple - Enhanced Performance Version

**Location**: `handoff/LiquidEtherSimple.jsx`

This is the new optimized version with enhanced organic visuals and better performance:

**Key Features:**
- **Wispy Organic Flow**: Enhanced fragment shader with smooth noise functions
- **Multiple Liquid Layers**: Three different liquid layers with varying scales and speeds
- **Organic Distortion**: UV coordinates distorted for natural flowing movement
- **Performance Optimized**: 15fps animation, 0.5 pixel ratio, mobile CSS fallback
- **Enhanced Visuals**: Flowing turbulence, shimmer effects, organic edge variation

**Performance Improvements:**
- Mobile detection with automatic CSS fallback
- Reduced pixel ratio (0.5) for better performance
- Frame rate limited to 15fps
- Simple noise functions (not expensive fbm operations)
- Graceful WebGL error handling

**Usage:**
```jsx
import LiquidEtherSimple from './LiquidEtherSimple';

<LiquidEtherSimple
  colors={['#5227FF', '#FF9FFC', '#B19EEF', '#00d4ff', '#8b5cf6']}
  style={{ opacity: 0.65 }}
  className="custom-background"
/>
```

### Complete Page Implementation

**Location**: `handoff/page-with-LiquidEtherSimple.tsx`

This file contains the complete main page implementation showing how LiquidEtherSimple is integrated into the full portfolio site. It demonstrates:

- **Background Integration**: How to import and use LiquidEtherSimple as the page background
- **Color Palette**: The exact color scheme used (`#5227FF`, `#FF9FFC`, `#B19EEF`, `#00d4ff`, `#8b5cf6`)
- **Styling**: Opacity settings and positioning for optimal visual effect
- **Page Structure**: Complete layout with header, hero section, video grid, and footer
- **Component Props**: All the props and configuration used in production

### Dependencies

- `react` (18+)
- `react-dom`
- `three` (0.15x+)
- `prop-types` (optional but included in this example)

Install in any React/Next project:

```
npm install react react-dom three prop-types
```

### Usage

```
import LiquidEther from './LiquidEther';
import './LiquidEther.css';

export default function Page() {
  return (
    <div>
      <LiquidEther
        className="liquid-ether-fullscreen"
        colors={["#5227FF", "#FF9FFC", "#B19EEF", "#00d4ff", "#8b5cf6"]}
        enableStars={true}
        starLayers={6}
        starDensity={0.75}
        starDriftSpeed={0.035}
        starRotationSpeed={0.15}
        starBrightness={3.5}
        starTwinkleSpeed={3.2}
        style={{ opacity: 0.5 }}
      />
      {/* Your page content here */}
    </div>
  );
}
```

For a live example in this repo, see `app/backgrounds/liquid-stars/page.tsx`, which demonstrates the same props inside a Next.js route.

### Props

- `colors: string[]` — color palette used to generate the liquid shader.
- `enableStars: boolean` — toggles starfield overlay on top of the liquid.
- `starLayers: number` — number of parallax layers for stars (default 6).
- `starDensity: number` — how dense the starfield is (0–1 typical range).
- `starDriftSpeed: number` — slow drift movement factor for stars.
- `starRotationSpeed: number` — orbital rotation speed around an anchor.
- `starBrightness: number` — overall star brightness multiplier.
- `starTwinkleSpeed: number` — twinkle frequency.
- `className?: string` — append classes to the container (positioned fixed fullscreen by default).
- `style?: React.CSSProperties` — inline styles merged into the container.

### Notes and behavior

- The component mounts a transparent WebGL canvas that fills the viewport, positioned behind content (`z-index: -1`) and non-interactive (`pointer-events: none`).
- It includes a CSS fallback (animated gradients) when WebGL cannot initialize.
- Performance optimizations include conservative pixel ratio, frame skipping under load, and pause on tab visibility change.

### Troubleshooting

- If nothing renders, confirm `three` is installed and your bundler isn’t tree-shaking shader strings.
- If the canvas overlaps clickable UI, ensure your content has a higher `z-index` than the background (the component uses `z-index: -1`).
- If you see stutters on low-power devices, reduce `starLayers` and/or `starDensity`, or set `enableStars={false}`.

