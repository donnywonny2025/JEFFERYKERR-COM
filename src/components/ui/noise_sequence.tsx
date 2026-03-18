"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * NoiseSequence: non-flickering film grain using pre-generated frames and crossfade.
 * - Pre-generates N noise tiles (PNG data URLs) once.
 * - Crossfades between frames on a timer (no per-frame reseeding on the same layer).
 * - Uses CSS background-repeat and background-position to tile.
 */
export function NoiseSequence({
  frames = 10,            // number of unique frames
  tileSize = 512,         // px size of each generated tile
  alpha = 44,             // 0-255 per-pixel alpha
  intervalMs = 180,       // ms between frame changes
  fadeMs = 140,           // crossfade duration
  backgroundSize = 420,   // background-size in px (decoupled from tileSize)
  opacity = 0.45,
  blend = "screen",
  rotateDeg = 0.3,
  className = "",
}: {
  frames?: number;
  tileSize?: number;
  alpha?: number;
  intervalMs?: number;
  fadeMs?: number;
  backgroundSize?: number;
  opacity?: number;
  blend?: React.CSSProperties["mixBlendMode"];
  rotateDeg?: number;
  className?: string;
}) {
  const [urls, setUrls] = useState<string[]>([]);
  const [topIndex, setTopIndex] = useState(0);
  const topRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);

  // Generate frames once
  useEffect(() => {
    const out: string[] = [];
    for (let f = 0; f < frames; f++) {
      const c = document.createElement("canvas");
      c.width = tileSize;
      c.height = tileSize;
      const ctx = c.getContext("2d");
      if (!ctx) continue;
      const img = ctx.createImageData(tileSize, tileSize);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255;
        d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = alpha;
      }
      ctx.putImageData(img, 0, 0);
      out.push(c.toDataURL("image/png"));
    }
    setUrls(out);
  }, [frames, tileSize, alpha]);

  // Crossfade timer
  useEffect(() => {
    if (urls.length === 0) return;
    let i = 0;
    const id = window.setInterval(() => {
      const next = (i + 1) % urls.length;
      if (backRef.current && topRef.current) {
        // move current top into back
        backRef.current.style.backgroundImage = `url(${urls[i]})`;
        backRef.current.style.opacity = `${opacity}`; // will fade out
        // set next frame as top and fade it in
        topRef.current.style.backgroundImage = `url(${urls[next]})`;
        topRef.current.style.opacity = `${opacity}`;
        // briefly drop back opacity to 0 to crossfade
        requestAnimationFrame(() => {
          if (backRef.current) {
            backRef.current.style.opacity = "0";
          }
        });
      }
      i = next;
      setTopIndex(i);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [urls, intervalMs, opacity]);

  const layerBase: React.CSSProperties = useMemo(() => ({
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    mixBlendMode: blend as any,
    backgroundRepeat: "repeat",
    backgroundSize: `${backgroundSize}px ${backgroundSize}px`,
    transform: `rotate(${rotateDeg}deg)`,
    transition: `opacity ${fadeMs}ms linear`,
    opacity: 0,
  }), [blend, backgroundSize, rotateDeg, fadeMs]);

  return (
    <div className={className} style={{ position: "absolute", inset: 0 }} aria-hidden>
      <div ref={backRef} style={layerBase} />
      <div ref={topRef} style={{ ...layerBase, opacity }} />
    </div>
  );
}
