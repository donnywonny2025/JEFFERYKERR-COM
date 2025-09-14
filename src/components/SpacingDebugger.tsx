"use client";

import React, { useEffect, useState } from "react";

/**
 * SpacingDebugger
 * Overlay that measures vertical gaps between key front-page sections.
 * How to use: open the site with ?debug=layout (or pass enabled=true) and
 * the overlay will render pixel readouts between targets with data-debug-id
 * attributes: hero, featured, brands, grid.
 */
export default function SpacingDebugger({ enabled = false }: { enabled?: boolean }) {
  const [active, setActive] = useState(enabled);
  const [metrics, setMetrics] = useState<
    Array<{ from: string; to: string; pixels: number; midX: number; y1: number; y2: number }>
  >([]);

  useEffect(() => {
    // allow keyboard toggle with 'D'
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "d" || e.key === "D") && (e.ctrlKey || e.metaKey)) {
        setActive((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!active) return;

    const compute = () => {
      const ids = ["hero", "featured", "brands", "grid"] as const;
      const rects: Record<string, DOMRect | null> = {};
      ids.forEach((id) => {
        const el = document.querySelector<HTMLElement>(`[data-debug-id="${id}"]`);
        rects[id] = el ? el.getBoundingClientRect() : null;
      });

      const m: Array<{ from: string; to: string; pixels: number; midX: number; y1: number; y2: number }> = [];
      const pairs: Array<[string, string]> = [
        ["hero", "featured"],
        ["featured", "brands"],
        ["brands", "grid"],
      ];

      pairs.forEach(([a, b]) => {
        const ra = rects[a];
        const rb = rects[b];
        if (!ra || !rb) return;
        const y1 = Math.round(ra.bottom);
        const y2 = Math.round(rb.top);
        const pixels = Math.max(0, y2 - y1);
        const midX = Math.round((Math.max(ra.left, rb.left) + Math.min(ra.right, rb.right)) / 2);
        m.push({ from: a, to: b, pixels, midX, y1, y2 });
      });

      setMetrics(m);
    };

    compute();
    const ro = new ResizeObserver(() => compute());
    ro.observe(document.body);
    const t = setInterval(compute, 500);
    return () => {
      ro.disconnect();
      clearInterval(t);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 99999,
        fontFamily: "'Space Mono', monospace",
      }}
    >
      {/* vertical rulers */}
      {metrics.map((m, i) => (
        <div key={i}>
          <div
            style={{
              position: "fixed",
              left: 0,
              top: m.y1,
              width: "100%",
              height: 1,
              background: "rgba(0, 212, 255, 0.5)",
            }}
          />
          <div
            style={{
              position: "fixed",
              left: 0,
              top: m.y2,
              width: "100%",
              height: 1,
              background: "rgba(255, 159, 252, 0.5)",
            }}
          />
          <div
            style={{
              position: "fixed",
              left: m.midX,
              top: m.y1,
              width: 1,
              height: Math.max(0, m.y2 - m.y1),
              background: "rgba(255, 255, 255, 0.25)",
            }}
          />
          <div
            style={{
              position: "fixed",
              left: m.midX + 8,
              top: m.y1 + (m.y2 - m.y1) / 2 - 10,
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              padding: "2px 6px",
              fontSize: 12,
              borderRadius: 6,
            }}
          >
            {m.from} → {m.to}: {m.pixels}px
          </div>
        </div>
      ))}

      {/* legend */}
      <div
        style={{
          position: "fixed",
          right: 12,
          bottom: 12,
          background: "rgba(0,0,0,0.65)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.2)",
          padding: "6px 10px",
          borderRadius: 8,
          pointerEvents: "auto",
        }}
      >
        <div style={{ fontSize: 12, marginBottom: 4 }}>Spacing Debugger</div>
        <div style={{ fontSize: 12, opacity: 0.8 }}>⌘/Ctrl + D to toggle</div>
        <div style={{ fontSize: 12, opacity: 0.8 }}>Targets: hero, featured, brands, grid</div>
      </div>
    </div>
  );
}
