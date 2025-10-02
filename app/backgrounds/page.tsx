'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TextShimmer } from '../../src/components/motion-primitives/text-shimmer';
import { SafeWrapper } from '../../src/components/SafeWrapper';
import { DigitalClock } from '../../src/components/motion-primitives/digital-clock';
import LiquidEther from '../../src/components/LiquidEther';
import LiquidEtherSimple from '../../src/components/LiquidEtherSimple';
import StarField from '../../src/components/StarField';
import { Meteors } from '../../src/components/ui/meteors';
import { Noise } from '../../src/components/ui/noise';
import { NoiseSmooth } from '../../src/components/ui/noise_smooth';
import { NoiseDrift } from '../../src/components/ui/noise_drift';
import { NoiseSequence } from '../../src/components/ui/noise_sequence';
import HeroSparklesScene from '../../src/components/HeroSparklesScene';
import '../../src/App.css';

export default function BackgroundsShowcase() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentBackground, setCurrentBackground] = useState('liquid');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goHome = () => {
    window.location.href = '/';
  };

  const switchBackground = (backgroundId: string) => {
    setCurrentBackground(backgroundId);
  };

  const backgroundOptions = [
    {
      id: 'liquid',
      title: 'LiquidEther',
      description: 'Flowing liquid background with organic animations',
      colors: ['#5227FF', '#FF9FFC', '#B19EEF', '#00d4ff', '#8b5cf6']
    },
    {
      id: 'starfield',
      title: 'Star Field',
      description: 'Animated star field with twinkling effects'
    },
    {
      id: 'sparkles',
      title: 'Hero Sparkles',
      description: 'Homepage hero copy floating above a luminous sparkles horizon'
    },
    {
      id: 'placeholder',
      title: 'New Background',
      description: 'Blank placeholder to test a third background option'
    },
    {
      id: 'home-liquid',
      title: 'Home Liquid + Noise',
      description: 'Replicates the homepage Liquid background with the foreground noise overlay'
    }
  ];

  return (
    <div className="App">
      {/* Dynamic Background Effects */}
      {currentBackground === 'liquid' && (
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF', '#00d4ff', '#8b5cf6']}
          style={{ opacity: 0.3 }}
        />
      )}

      {currentBackground === 'home-liquid' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
          {/* Homepage Liquid background settings */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', background: '#0a0a0a' }}>
            <LiquidEtherSimple
              colors={[
                '#000000', // Pure black (contrast)
                '#1a1a1a', // Very dark gray (base)
                '#3a2a4a', // Visible dark purple
                '#2a3a5a', // Visible dark blue
                '#4a4a7a', // Medium blue (not too bright)
                '#5a3a6a', // Medium purple (edge highlights)
                '#3a5a5a', // Dark teal (accent)
                '#2a2a4a', // Dark blue-purple (transitions)
              ]}
              style={{
                opacity: 0.75, // keep good visibility
                width: '100%',
                height: '100%',
                filter: 'brightness(0.8) contrast(2.0) saturate(1.2)', // higher contrast for sharp edges
              }}
              enableStars={false}
              initialBrightness={0.25}     // restore some brightness
              colorIntensity={1.2}         // keep dynamic shifting
              backgroundDarkness={0.85}    // slightly darker than base, but visible
              flowSpeed={0.25}            // slightly faster for more movement
              turbulence={2.2}            // defined but more flow
              colorMixing={0.4}           // smoother transitions while defined
            />
          </div>
          {/* Foreground Grain: frame sequence with crossfade for speck-level motion (no sweeping) */}
          <NoiseSequence
            frames={16}
            tileSize={512}
            alpha={44}
            intervalMs={100}
            fadeMs={180}
            backgroundSize={420}
            opacity={0.45}
            blend={'screen'}
            rotateDeg={0.3}
            className="absolute inset-0 z-[6] pointer-events-none"
          />
        </div>
      )}

      {currentBackground === 'starfield' && (
        <StarField />
      )}

      {currentBackground === 'sparkles' && (
        <HeroSparklesScene particleDensity={720} />
      )}

      {currentBackground === 'placeholder' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
          {/* Colored background layer */}
          <div
            aria-label="Placeholder Background"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(0,212,255,0.15) 0%, rgba(138,43,226,0.15) 50%, rgba(0,0,0,0.9) 100%)'
            }}
          />
          {/* Centered demo text overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '12px',
              color: 'white',
              textAlign: 'center',
              pointerEvents: 'none'
            }}
          >
            <h1 style={{
              fontFamily: 'Space Mono, monospace',
              fontWeight: 700,
              fontSize: 'min(12vw, 96px)',
              letterSpacing: '-0.02em',
              margin: 0,
              textShadow: '0 4px 24px rgba(0,0,0,0.35)'
            }}>
              DEMO TEXT
            </h1>
            <p style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 'min(4.5vw, 22px)',
              opacity: 0.8,
              margin: 0
            }}>
              Placeholder colored background with centered overlay
            </p>
          </div>

          {/* Foreground grain overlay */}
          <Noise
            patternSize={269}
            patternScaleX={1}
            patternScaleY={1.01}
            patternRefreshInterval={1}
            patternAlpha={40}
            className="absolute inset-0 z-[2] opacity-70 mix-blend-overlay pointer-events-none"
          />
        </div>
      )}

      {/* Header */}
      <header className="header">
        <div className="header-content" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          <Link href="/" className="logo">
            <TextShimmer duration={3} spread={1.5}>
              <span className="logo-k">k</span>err
            </TextShimmer>
          </Link>

          {/* Right side container */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            {/* Digital Clock - Left of hamburger */}
            <SafeWrapper>
              <DigitalClock />
            </SafeWrapper>

            {/* Clean Hamburger Menu - Simple Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                className={`hamburger ${menuOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  width: '40px',
                  height: '40px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  const spans = e.currentTarget.querySelectorAll('span');
                  spans.forEach(span => {
                    span.style.background = 'white';
                  });
                }}
                onMouseLeave={(e) => {
                  const spans = e.currentTarget.querySelectorAll('span');
                  spans.forEach(span => {
                    span.style.background = '#a1a1aa';
                  });
                }}
              >
              <span style={{
                display: 'block',
                height: '2px',
                background: '#a1a1aa',
                width: '100%',
                transition: 'all 0.3s ease',
                transformOrigin: 'center'
              }}></span>
              <span style={{
                display: 'block',
                height: '2px',
                background: '#a1a1aa',
                width: '100%',
                transition: 'all 0.3s ease',
                transformOrigin: 'center'
              }}></span>
              <span style={{
                display: 'block',
                height: '2px',
                background: '#a1a1aa',
                width: '100%',
                transition: 'all 0.3s ease',
                transformOrigin: 'center'
              }}></span>
            </button>

            {/* Clean Dropdown Menu */}
            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  marginTop: '8px',
                  background: 'rgba(0, 0, 0, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '24px',
                  minWidth: '220px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  zIndex: 1000
                }}
              >
                {/* Logo/Name */}
                <div style={{
                  textAlign: 'center',
                  marginBottom: '20px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: '18px',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    letterSpacing: '0.5px'
                  }}>
                    <span style={{
                      fontSize: '22px',
                      fontWeight: '600',
                      verticalAlign: 'baseline',
                      lineHeight: '1'
                    }}>k</span>err
                  </div>
                </div>

                {/* Navigation Links */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Link
                    href="/"
                    onClick={toggleMenu}
                    style={{
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '14px',
                      fontWeight: '400',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      padding: '8px 0',
                      transition: 'all 0.3s ease',
                      borderBottom: '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = '#00d4ff';
                      (e.target as HTMLElement).style.borderBottomColor = 'rgba(0, 212, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = 'var(--text-primary)';
                      (e.target as HTMLElement).style.borderBottomColor = 'transparent';
                    }}
                  >
                    HOME
                  </Link>

                  <Link
                    href="/backgrounds"
                    onClick={toggleMenu}
                    style={{
                      color: '#00d4ff',
                      textDecoration: 'none',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '14px',
                      fontWeight: '500',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      padding: '8px 0',
                      transition: 'all 0.3s ease',
                      borderBottom: '1px solid rgba(0, 212, 255, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = '#00d4ff';
                      (e.target as HTMLElement).style.borderBottomColor = 'rgba(0, 212, 255, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = '#00d4ff';
                      (e.target as HTMLElement).style.borderBottomColor = 'rgba(0, 212, 255, 0.3)';
                    }}
                  >
                    🎨 BACKGROUNDS
                  </Link>

                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); toggleMenu(); }}
                    style={{
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '14px',
                      fontWeight: '400',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      padding: '8px 0',
                      transition: 'all 0.3s ease',
                      borderBottom: '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = '#00d4ff';
                      (e.target as HTMLElement).style.borderBottomColor = 'rgba(0, 212, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = 'var(--text-primary)';
                      (e.target as HTMLElement).style.borderBottomColor = 'transparent';
                    }}
                  >
                    WORK
                  </a>

                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); toggleMenu(); }}
                    style={{
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '14px',
                      fontWeight: '400',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      padding: '8px 0',
                      transition: 'all 0.3s ease',
                      borderBottom: '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = '#00d4ff';
                      (e.target as HTMLElement).style.borderBottomColor = 'rgba(0, 212, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = 'var(--text-primary)';
                      (e.target as HTMLElement).style.borderBottomColor = 'transparent';
                    }}
                  >
                    CONTACT
                  </a>
                </nav>

                {/* Email */}
                <div style={{
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  textAlign: 'center'
                }}>
                  <a
                    href="mailto:colour8k@mac.com"
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '12px',
                      letterSpacing: '0.5px',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = '#00d4ff';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = 'rgba(255, 255, 255, 0.7)';
                    }}
                  >
                    colour8k@mac.com
                  </a>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </header>


      {/* Hero Section */}
      <section className="hero" style={{ position: 'relative' }}>
        <div className="hero-content" style={{ position: 'relative', zIndex: 30 }}>
          <h1>Background Testing Lab</h1>
          <div className="hero-meta">
            <div className="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>Interactive Background Showcase</span>
            </div>
            <div className="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <a href="mailto:colour8k@mac.com">colour8k@mac.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* Background Selection Controls */}
      <section className="background-controls" style={{
        padding: '80px 60px',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 20
      }}>
        <div className="controls-content" style={{
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(20px)',
          borderRadius: '12px',
          padding: '40px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '300',
            color: 'var(--text-primary)',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Background Effects
          </h2>

          {/* Background Selection Buttons */}
          <div className="background-selection" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            {backgroundOptions.map((bg) => (
              <button
                key={bg.id}
                onClick={() => switchBackground(bg.id)}
                style={{
                  padding: '16px 32px',
                  background: currentBackground === bg.id ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  border: `2px solid ${currentBackground === bg.id ? '#00d4ff' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '1rem',
                  fontWeight: currentBackground === bg.id ? '600' : '400',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseEnter={(e) => {
                  if (currentBackground !== bg.id) {
                    (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.15)';
                    (e.target as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentBackground !== bg.id) {
                    (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.1)';
                    (e.target as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }
                }}
              >
                {bg.title}
              </button>
            ))}
          </div>

          {/* Current Background Info */}
          <div className="current-background-info" style={{
            textAlign: 'center',
            padding: '30px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '400',
              color: 'var(--text-primary)',
              marginBottom: '15px'
            }}>
              {backgroundOptions.find(bg => bg.id === currentBackground)?.title}
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              lineHeight: '1.6',
              margin: '0'
            }}>
              {backgroundOptions.find(bg => bg.id === currentBackground)?.description}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="navigation-links" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '40px',
            flexWrap: 'wrap'
          }}>
            <Link href="/" style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
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
            <a href="#" onClick={goHome}>HOME</a>
            <a href="/backgrounds" style={{color: '#00d4ff', fontWeight: '500'}}>🎨 BACKGROUNDS</a>
            <a href="#">WORK</a>
            <a href="#">CONTACT</a>
          </nav>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
          <div className="footer-copyright">
            &copy; 2025 Jeff Kerr. Dig the site? I vibe-coded it. Click <Link href="/how-i-built-this" style={{ textDecoration: 'underline', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>here</Link> to see how.
          </div>
        </div>

        {/* Meteor Effect Overlay */}
        <Meteors number={20} />
      </footer>
    </div>
  );
}
