# October Page Handoff

This document captures how the homepage front page is implemented and, specifically, how the hero/list videos are rendered and auto-play on scroll. It includes the exact code paths and recent changes so Claude (or anyone else) can review quickly.

## Files and paths

- Main page: `app/page.tsx`
- Video assets: `public/Videos/`
- Netlify config: `netlify.toml`

## Key component: ScrollTriggeredShowreel (in `app/page.tsx`)

```tsx
// app/page.tsx (excerpt)
// Autoplays a local <video> when sufficiently in view; falls back to poster immediately

type ScrollTriggeredProps = {
  src: string;
  poster: string;
  delayMs?: number;
  playThreshold?: number;
  pauseThreshold?: number;
};

function ScrollTriggeredShowreel({ src, poster, delayMs = 700, playThreshold = 0.7, pauseThreshold = 0.35 }: ScrollTriggeredProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    let timeoutId: number | null = null;

    const playWithDelay = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(async () => {
        try {
          if (videoRef.current) {
            await videoRef.current.play();
            if (!started) setStarted(true);
          }
        } catch {}
      }, delayMs);
    };

    const pauseNow = () => {
      if (timeoutId) { window.clearTimeout(timeoutId); timeoutId = null; }
      try { videoRef.current?.pause(); } catch {}
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;
        if (entry.isIntersecting && ratio >= playThreshold) {
          playWithDelay();
        } else if (!entry.isIntersecting || ratio <= pauseThreshold) {
          pauseNow();
        }
      });
    }, { threshold: [0, pauseThreshold, playThreshold, 1] });

    io.observe(el);
    return () => { if (timeoutId) window.clearTimeout(timeoutId); io.disconnect(); };
  }, [started]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <video 
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        muted
        loop
        preload="metadata"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          border: 0,
          display: 'block',
          borderRadius: 'inherit'
        }}
      />
    </div>
  );
}
```

## Where it’s used (switch inside the list render in `app/page.tsx`)

```tsx
// app/page.tsx (excerpt around the switch that renders each card)
{video.id === 'reel-2024' ? (
  <ScrollTriggeredShowreel src="/Videos/REELQuickLoop.mp4" poster="/Videos/Reel_Poster.jpg" />
) : video.id === 'featured-video' ? (
  <ScrollTriggeredShowreel src="/Videos/DannyQuickLoop.mp4" poster="/Videos/DannyPoster.jpg" />
) : video.id === 'justice-for-lai-dai-han' ? (
  <ScrollTriggeredShowreel src="/Videos/JusticeLoop.mp4" poster="/Videos/JusticePoster.png" />
) : (
  (video.id === 'new-balance-campaign') ? (
    // New Balance now matches others (local video + poster)
    <ScrollTriggeredShowreel src="/Videos/NBQuickLoop.mp4" poster="/Videos/NBPOSTER.jpg" />
  ) : video.id === 'insta360' ? (
    <ScrollTriggeredShowreel src="/Videos/FTCLEANQuickLoop.mp4" poster="/Videos/FTCLEANPoster.jpg" />
  ) : video.id === 'commercial-project' ? (
    <ScrollTriggeredShowreel src="/Videos/CRNQuickLoop.mp4" poster="/Videos/CRNPOSTER.jpg" />
  ) : video.id === 'ai-documentary' ? (
    <ScrollTriggeredShowreel src="/Videos/NASAQuickLoop.mp4" poster="/Videos/NASAPoster.jpg" />
  ) : (
    <img
      src={video.thumbnail}
      alt={video.title}
      width={1920}
      height={1080}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  )
)}
```

## Video data (New Balance item)

```tsx
// app/page.tsx (videos array entry for context)
{
  id: 'new-balance-campaign',
  title: 'New Balance Campaign',
  client: 'New Balance',
  date: '2025',
  thumbnail: 'https://vumbnail.com/1120683744.jpg',
  href: 'https://player.vimeo.com/video/1120683744',
  route: '/projects/new-balance',
  description: 'Essence of movement and performance through innovative technology.'
}
```

Note: Even though `href` is present (legacy), rendering is forced to the local `<video>` path above.

## CSS used by video wrappers (in `app/page.tsx`)

```css
/* Base wrapper used by hero/list cards */
.video-thumbnail {
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

/* Modern browsers use inline aspect-ratio on containers elsewhere in the file */

/* 16:9 fallback for browsers without aspect-ratio support */
@supports not (aspect-ratio: 1) {
  .video-thumbnail { position: relative !important; }
  .video-thumbnail::before {
    content: '';
    display: block;
    padding-top: 56.25%; /* 16:9 ratio */
  }
  /* Ensure media fills the spacer wrapper */
  .video-thumbnail > video,
  .video-thumbnail > img,
  .video-thumbnail > div {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }
}
```

## Recent changes (commits on `main`)

- `e208ea3`: Swap New Balance hero to local `ScrollTriggeredShowreel` with `/Videos/NBQuickLoop.mp4` and poster `/Videos/NBPOSTER.jpg` (matches others).
- `3ba4df6`: Add 16:9 `@supports not (aspect-ratio)` fallback for `.video-thumbnail`.
- `f1dd0a6`: Prior attempt for Vimeo iframe (add `playsinline=1`, remove lazy) — superseded by the local video swap above.

## iPhone/Safari verification steps

1. Load the homepage on an actual iPhone (not just emulation).
2. Open Safari Remote Debugger (Mac Safari → Develop menu → your iPhone → your site).
3. Inspect a `.video-thumbnail` wrapper:
   - If `aspect-ratio` isn’t supported, the `::before` spacer should be present; wrapper height should be non-zero.
   - The `<video>` or poster `<img>` is absolutely positioned and visible.
4. Scroll until ≥70% of the card is visible; the IntersectionObserver will trigger playback. If autoplay is blocked, the poster remains (no blank state).

## Troubleshooting on iOS

- If autoplay is delayed: lower the hero instance `playThreshold` (e.g., `0.35`).
- If playback fails but poster shows: likely codec/profile issue — re-encode the MP4 to H.264 (AVC) High or Baseline, AAC audio (audio is ignored since muted), and progressive.
- If still blank (should not happen after local video swap): confirm the live site deployed the commits above and that no blockers are hiding media.

## Netlify notes

- `netlify.toml` is present with `@netlify/plugin-nextjs`, `build = npm run build`, `publish = .next`.
- Ensure the site tracks `main` and auto-deploys are enabled. If not, trigger a manual deploy from `main`.

---

If you need the full `app/page.tsx`, I can export it verbatim, but the excerpts above contain all logic and styles relevant to video behavior and layout.
