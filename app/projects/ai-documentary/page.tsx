"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { TextShimmer } from '../../../src/components/motion-primitives/text-shimmer';
import { SafeWrapper } from '../../../src/components/SafeWrapper';
import { DigitalClock } from '../../../src/components/motion-primitives/digital-clock';
import MenuWrapper from '../../../src/components/MenuWrapper';
import WeatherWidget from '../../../src/components/WeatherWidget';
import LiquidEtherSimple from '../../../src/components/LiquidEtherSimple';
import { Meteors } from '../../../src/components/ui/meteors';
import '../../../src/App.css';

const Liquid = LiquidEtherSimple as unknown as React.ComponentType<any>;

export default function AiDocumentaryPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const vimeoId = '641599879';
  const embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=0&loop=0&title=0&byline=0&portrait=0`;

  const separatorStyle = {
    width: '100%',
    height: '1px',
    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)'
  } as React.CSSProperties;

  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh', color: '#ffffff' }}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          background: '#0a0a0a',
          zIndex: 1
        }}
      >
        <Liquid
          colors={['#0a0a0a', '#1a0b2e', '#2d1b4e', '#3d2a5f', '#1a4d72', '#6b46c1', '#c084fc']}
          style={{
            opacity: 0.85,
            width: '100%',
            height: '100%',
            filter: 'brightness(0.8) contrast(1.6) saturate(1.3)'
          }}
          enableStars={false}
          initialBrightness={0.2}
          colorIntensity={0.7}
          backgroundDarkness={0.85}
          flowSpeed={0.4}
          turbulence={0.8}
          colorMixing={0.6}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 20, minHeight: '100vh' }}>
        <header className="header" style={{ background: 'transparent' }}>
          <div
            className="header-content"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <Link href="/" className="logo">
              <TextShimmer duration={3} spread={1.5}>
                <span className="logo-k">k</span>err
              </TextShimmer>
            </Link>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}
            >
              <SafeWrapper>
                <WeatherWidget />
              </SafeWrapper>
              <SafeWrapper>
                <DigitalClock />
              </SafeWrapper>
              <MenuWrapper
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                onNavigate={(action: string) => {
                  setMenuOpen(false);
                }}
              />
            </div>
          </div>
        </header>

        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '1200px',
              padding: '0 60px',
              margin: '0 auto'
            }}
          >
            <section style={{ paddingTop: '140px', marginBottom: '40px' }}>
              <Link
                href="/"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'color 0.3s ease'
                }}
              >
                ← Back
              </Link>
            </section>

            <section style={{ marginBottom: '60px' }}>
              <div
                style={{
                  maxWidth: '800px',
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
              >
                <iframe
                  src={embedUrl}
                  title="AI & The Future of Work"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: '0' }}
                />
              </div>
            </section>

            <section style={{ marginBottom: '60px' }}>
              <h1
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.95)',
                  marginBottom: '20px',
                  lineHeight: '1.2'
                }}
              >
                Apollo 11 — 50th Anniversary
              </h1>

              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                  maxWidth: '750px'
                }}
              >
                Produced for NASA’s 50th Anniversary of Apollo 11 in Washington, D.C. This film served as the central projection during the evening ceremony, accompanied by interactive elements and six supporting videos around the Mall. A special night shared with astronauts, delegates, and guests—an honour to help bring to life.
              </p>
            </section>

            <section style={{ marginBottom: '80px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '14px',
                  fontWeight: '300',
                  color: '#ffffff',
                  opacity: 0.8,
                  maxWidth: '750px'
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '16px',
                    color: 'rgba(255, 255, 255, 0.95)',
                    marginBottom: '10px'
                  }}
                >
                  Details
                </h3>

                <div style={separatorStyle}></div>
                <div>Client: NASA</div>
                <div style={separatorStyle}></div>
                <div>Role: Producer</div>
                <div style={separatorStyle}></div>
                <div>Deliverables: 6 video inserts, multiple animations</div>
                <div style={separatorStyle}></div>
                <div>Notes: Premiered during the official DC ceremony with additional interactive projections</div>
                <div style={separatorStyle}></div>
                <div>Published: 2019</div>
              </div>
            </section>
          </div>
        </div>

        <div style={{ position: 'relative', background: '#000', overflow: 'hidden' }}>
          <Meteors number={20} />
          <footer className="footer" style={{ position: 'relative' }}>
            <div className="footer-content">
              <div className="footer-logo">
                <TextShimmer duration={3} spread={1.5}>
                  <span className="logo-k">k</span>err
                </TextShimmer>
              </div>
              <div className="footer-divider"></div>
              <div className="footer-email">
                <a href="mailto:colour8k@mac.com">colour8k@mac.com</a>
              </div>
              <nav className="footer-nav">
                <Link href="/">HOME</Link>
                <Link href="/backgrounds">🎨 BACKGROUNDS</Link>
                <a href="#">WORK</a>
                <a href="#">CONTACT</a>
              </nav>
              <div className="footer-social">
                <a href="#" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
              <div className="footer-copyright">
                2025 Jeff Kerr. Crafting visual stories that move the world forward.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
