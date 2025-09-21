"use client";

import React, { useEffect, useMemo, useState } from "react";

/**
 * NoiseDrift: high-quality, non-flickering grain overlay.
 * - Generates a single PNG data URL once (with alpha) and tiles it via CSS.
 * - Uses background-position animation for subtle motion (no per-frame regeneration).
 * - Works well over dark content when paired with screen/soft-light blend and moderate opacity.
 */
export function NoiseDrift({
  tileSize = 512,           // base tile size in px (will repeat)
  alpha = 44,               // 0-255 per-pixel alpha inside PNG
  className = "",
  opacity = 0.45,           // overall layer opacity
  blend: blendMode = "screen", // CSS mix-blend-mode (e.g., 'screen', 'soft-light', 'normal')
  backgroundSize = 420,     // CSS background-size in px (decouple from tileSize to avoid visible seams)
  driftPx = 12,             // total drift distance over the animation duration
  durationSec = 24,         // drift cycle duration
}: {
  tileSize?: number;
  alpha?: number;
  className?: string;
  opacity?: number;
  blend?: React.CSSProperties["mixBlendMode"];
  backgroundSize?: number;
  driftPx?: number;
  durationSec?: number;
}) {
  const [dataUrl, setDataUrl] = useState<string>("");

  const animName = useMemo(() => `grainDrift_${Math.random().toString(36).slice(2)}`, []);

  useEffect(() => {
    const c = document.createElement("canvas");
    c.width = tileSize;
    c.height = tileSize;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const img = ctx.createImageData(tileSize, tileSize);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = Math.random() * 255;
      d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = alpha; // grayscale with alpha
    }
    ctx.putImageData(img, 0, 0);

    // Export once to PNG with alpha
    setDataUrl(c.toDataURL("image/png"));
  }, [tileSize, alpha]);

  // Inject a keyframe animation for gentle drift
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `@keyframes ${animName} {
      0% { background-position: 0px 0px; }
      50% { background-position: ${driftPx}px ${-driftPx}px; }
      100% { background-position: 0px 0px; }
    }`;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, [animName, driftPx]);

  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
        mixBlendMode: blendMode,
        backgroundImage: dataUrl ? `url(${dataUrl})` : undefined,
        backgroundRepeat: "repeat",
        backgroundSize: `${backgroundSize}px ${backgroundSize}px`,
        willChange: "background-position",
        animation: `${animName} ${durationSec}s linear infinite` as any,
      }}
    />
  );
}
