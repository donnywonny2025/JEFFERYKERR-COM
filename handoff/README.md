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
