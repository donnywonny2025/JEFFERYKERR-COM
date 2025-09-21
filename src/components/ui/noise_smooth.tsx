"use client";

import React, { useEffect, useRef } from "react";

/**
 * NoiseSmooth: film-grain overlay with temporal crossfade to minimize flicker.
 * - Generates two tiled noise patterns and crossfades between them on a timer.
 * - Designed for dark backgrounds where per-frame regeneration looks sparkly.
 */
export function NoiseSmooth({
  patternSize = 513,
  patternAlpha = 44, // 0-255 per-pixel alpha
  refreshMs = 200,   // how often to refresh the grain tile
  crossfadeMs = 120, // duration of the crossfade between old/new tiles
  className = "",
}: {
  patternSize?: number;
  patternAlpha?: number;
  refreshMs?: number;
  crossfadeMs?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const patA = document.createElement("canvas");
    const patB = document.createElement("canvas");
    patA.width = patB.width = patternSize;
    patA.height = patB.height = patternSize;
    const ctxA = patA.getContext("2d");
    const ctxB = patB.getContext("2d");
    if (!ctxA || !ctxB) return;

    const fillNoise = (target: CanvasRenderingContext2D) => {
      const img = target.createImageData(patternSize, patternSize);
      const data = img.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v; data[i + 1] = v; data[i + 2] = v; data[i + 3] = patternAlpha;
      }
      target.putImageData(img, 0, 0);
    };

    // initial tiles
    fillNoise(ctxA);
    fillNoise(ctxB);

    let logicalW = 0, logicalH = 0;
    let animId = 0;
    let lastRefresh = performance.now();
    let fading = false;
    let fadeStart = 0;
    let useAOnTop = true;

    const resize = () => {
      logicalW = Math.max(1, window.innerWidth);
      logicalH = Math.max(1, window.innerHeight);
      canvas.width = Math.floor(logicalW * dpr);
      canvas.height = Math.floor(logicalH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loop = (now: number) => {
      const needRefresh = now - lastRefresh >= refreshMs && !fading;
      if (needRefresh) {
        // regenerate the back tile then start crossfade
        if (useAOnTop) fillNoise(ctxB); else fillNoise(ctxA);
        fading = true;
        fadeStart = now;
        lastRefresh = now;
      }

      // draw
      ctx.clearRect(0, 0, logicalW, logicalH);
      const patTop = ctx.createPattern(useAOnTop ? patA : patB, "repeat");
      const patBack = ctx.createPattern(useAOnTop ? patB : patA, "repeat");
      const t = fading ? Math.min(1, (now - fadeStart) / crossfadeMs) : 1;

      // back layer
      if (patBack) {
        ctx.globalAlpha = fading ? (1 - t) : 0; // invisible except during fade
        ctx.fillStyle = patBack;
        ctx.fillRect(0, 0, logicalW, logicalH);
      }
      // top layer
      if (patTop) {
        ctx.globalAlpha = fading ? t : 1;
        ctx.fillStyle = patTop;
        ctx.fillRect(0, 0, logicalW, logicalH);
      }
      ctx.globalAlpha = 1;

      if (fading && t >= 1) {
        fading = false;
        useAOnTop = !useAOnTop;
      }

      animId = requestAnimationFrame(loop);
    };

    resize();
    animId = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [patternSize, patternAlpha, refreshMs, crossfadeMs]);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} />;
}
