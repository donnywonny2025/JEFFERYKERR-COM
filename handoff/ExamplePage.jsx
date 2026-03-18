import React from 'react';
import LiquidEther from './LiquidEther';
import './LiquidEther.css';

/**
 * Minimal, framework-agnostic example of the Liquid Ether background.
 * Drop this file alongside LiquidEther.jsx and LiquidEther.css in any React app
 * and render <ExamplePage /> from your root.
 */
export default function ExamplePage() {
  return (
    <div style={{ minHeight: '200vh' }}>
      {/* Fullscreen, pointer-events: none, fixed behind your content */}
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

      {/* Example foreground content */}
      <main style={{ position: 'relative', zIndex: 10, padding: '48px 24px', color: 'white' }}>
        <h1 style={{ margin: '0 0 16px 0', fontWeight: 600 }}>Liquid Ether Background Demo</h1>
        <p style={{ maxWidth: 640, lineHeight: 1.6, opacity: 0.9 }}>
          This page shows how to mount the animated liquid background with an optional starfield.
          The background is fixed, fills the viewport, and does not block interaction with your UI.
        </p>
        <ul style={{ marginTop: 24, lineHeight: 1.8 }}>
          <li>Toggle stars via <code>enableStars</code></li>
          <li>Tune density/brightness/speed to fit performance and style</li>
          <li>Ensure your foreground content has a higher z-index than the background</li>
        </ul>
        <div style={{ height: 1200 }} />
      </main>
    </div>
  );
}
