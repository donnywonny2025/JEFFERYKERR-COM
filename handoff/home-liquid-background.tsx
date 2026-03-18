"use client";

// Handoff: Homepage Liquid background replica (Noise overlay optional)
// - This file reproduces the exact background stack from app/page.tsx
// - Colors and parameters match the current homepage configuration
// - The Noise overlay is provided as a commented example for reference

import React from "react";
import LiquidEtherSimple from "../src/components/LiquidEtherSimple";
// Optional foreground grain overlay (commented out for handoff clarity)
// import { Noise } from "../src/components/ui/noise";

export default function HomeLiquidBackgroundDemo() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      {/* Homepage Liquid background settings (exact copy) */}
      <LiquidEtherSimple
        colors={[
          "#0a0a0a", // Deep black
          "#1a0b2e", // Dark purple
          "#2d1b4e", // Medium purple
          "#3d2a5f", // Muted purple
          "#1a4d72", // Darker, muted blue
          "#6b46c1", // Subdued light purple
          "#c084fc", // Softer pink
        ]}
        style={{
          opacity: 0.85,
          width: "100%",
          height: "100%",
          filter: "brightness(0.8) contrast(1.6) saturate(1.3)",
        }}
        enableStars={false}
        initialBrightness={0.2}
        colorIntensity={0.7}
        backgroundDarkness={0.85}
        flowSpeed={0.4}
        turbulence={0.8}
        colorMixing={0.6}
      />

      {/**
       * Optional Noise overlay used on the backgrounds test page and optionally on the homepage
       * Un-comment to enable. Suggested visible settings (documented in README):
       * - patternSize: 269
       * - patternScaleX: 1
       * - patternScaleY: 1.01
       * - patternRefreshInterval: 1
       * - patternAlpha: 40
       * - className: "absolute inset-0 z-[2] opacity-70 mix-blend-overlay pointer-events-none"
       */}
      {false && (
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}
        >
          {/* <Noise
            patternSize={269}
            patternScaleX={1}
            patternScaleY={1.01}
            patternRefreshInterval={1}
            patternAlpha={40}
            className="absolute inset-0 opacity-70 mix-blend-overlay pointer-events-none"
          /> */}
        </div>
      )}
    </div>
  );
}
