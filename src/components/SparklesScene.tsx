'use client';

import React from 'react';
import { SparklesCore } from './ui/sparkles';

interface SparklesSceneProps {
  title?: string;
  subtitle?: string;
  particleDensity?: number;
}

export function SparklesScene({
  title = 'Aceternity',
  subtitle = 'A configurable sparkles experiment inspired by ui.aceternity.com',
  particleDensity = 1100,
}: SparklesSceneProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(circle at 50% 30%, rgba(32,56,107,0.35), rgba(4,7,12,0.95) 55%, #02040a 85%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'min(12vh, 160px) 24px',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 'min(680px, 90vw)',
          height: '340px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          color: '#ffffff',
        }}
      >
        <h1
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            margin: 0,
            textAlign: 'center',
            textShadow: '0 6px 24px rgba(0,0,0,0.45)',
            zIndex: 2,
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 'clamp(0.75rem, 2vw, 1rem)',
              opacity: 0.7,
              margin: 0,
              textAlign: 'center',
              maxWidth: '52ch',
              zIndex: 2,
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Blue horizon line */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '2px',
            background:
              'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(56, 142, 255, 0.8) 45%, rgba(0, 255, 244, 0.55) 50%, rgba(56, 142, 255, 0.8) 55%, rgba(0, 0, 0, 0) 100%)',
            boxShadow: '0 0 24px rgba(48, 145, 255, 0.55), 0 0 64px rgba(15, 204, 255, 0.35)',
            filter: 'blur(0.35px)',
            zIndex: 1,
          }}
        />

        {/* Sparkle field */}
        <div
          style={{
            position: 'absolute',
            inset: '35% 8% 6% 8%',
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1.2}
            particleDensity={particleDensity}
            className="w-full h-full"
            particleColor="#ffffff"
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#000000',
              maskImage:
                'radial-gradient(260px 180px at 50% 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.9) 100%)',
              WebkitMaskImage:
                'radial-gradient(260px 180px at 50% 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.9) 100%)',
            }}
          />
        </div>

        {/* Ambient glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '58%',
            left: '50%',
            transform: 'translate(-50%, 0)',
            width: '60%',
            height: '120px',
            background:
              'radial-gradient(ellipse at center, rgba(46, 159, 255, 0.32) 0%, rgba(20, 67, 133, 0.15) 45%, transparent 70%)',
            filter: 'blur(8px)',
            opacity: 0.9,
          }}
        />
      </div>
    </div>
  );
}

export default SparklesScene;
