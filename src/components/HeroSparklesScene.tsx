'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import { SparklesCore } from './ui/sparkles';

interface HeroSparklesSceneProps {
  particleDensity?: number;
}

export function HeroSparklesScene({ particleDensity = 720 }: HeroSparklesSceneProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(circle at 50% 30%, rgba(18,29,58,0.4), rgba(2,4,10,0.95) 55%, #02040a 85%)',
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
          width: 'min(44rem, 92vw)',
          margin: '0 auto',
          color: '#ffffff',
          fontFamily: "'Space Mono', monospace",
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <span>
            I produce <span className="gradient-text">compelling visual content</span>
          </span>
          <span>
            while building <span className="gradient-text">AI-enhanced workflows</span>
          </span>
          <span>
            that change how <span className="gradient-text">creative work gets done</span>.
          </span>
        </div>

        <div
          style={{
            position: 'relative',
            marginTop: '18px',
            paddingBottom: '18px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.72)',
            }}
          >
            <MapPin size={14} strokeWidth={1.5} color="rgba(255,255,255,0.6)" />
            <span>Grand Rapids, Michigan / World</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <a href="mailto:colour8k@mac.com" style={{ color: 'rgba(255,255,255,0.72)', textDecoration: 'none' }}>
              colour8k@mac.com
            </a>
          </div>

          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: '-14%',
              right: '-14%',
              bottom: '8px',
              height: '3px',
              background:
                'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(56,142,255,0.36) 40%, rgba(0,212,255,0.58) 50%, rgba(56,142,255,0.36) 60%, rgba(0,0,0,0) 100%)',
              boxShadow: '0 0 24px rgba(46, 150, 255, 0.34), 0 0 68px rgba(10, 190, 255, 0.24)',
              filter: 'blur(0.45px)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: '-14%',
              right: '-14%',
              bottom: '-110px',
              height: '115px',
              overflow: 'hidden',
            }}
          >
            <SparklesCore
              background="transparent"
              minSize={0.35}
              maxSize={0.9}
              particleDensity={particleDensity}
              className="w-full h-full"
              particleColor="#ffffff"
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: '-40px -10% 0 -10%',
                background:
                  'radial-gradient(520px 180px at 50% -60px, rgba(46,159,255,0.42) 0%, rgba(8,14,30,0.14) 45%, rgba(0,0,0,0) 70%)',
                mixBlendMode: 'screen',
              }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0) 100%)',
              }}
            />
          </div>

          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: '-8%',
              right: '-8%',
              bottom: '-125px',
              height: '130px',
              background:
                'radial-gradient(ellipse at center, rgba(46,159,255,0.12) 0%, rgba(12,48,118,0.07) 45%, transparent 78%)',
              filter: 'blur(14px)',
              opacity: 0.42,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSparklesScene;
