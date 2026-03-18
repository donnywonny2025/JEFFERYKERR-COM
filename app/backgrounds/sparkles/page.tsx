'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TextShimmer } from '../../../src/components/motion-primitives/text-shimmer';
import { SafeWrapper } from '../../../src/components/SafeWrapper';
import { DigitalClock } from '../../../src/components/motion-primitives/digital-clock';
import HeroSparklesScene from '../../../src/components/HeroSparklesScene';
import '../../../src/App.css';

export default function SparklesBackgroundPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="App">
      <HeroSparklesScene particleDensity={720} />

      <header className="header">
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <SafeWrapper>
              <DigitalClock />
            </SafeWrapper>

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
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  const spans = e.currentTarget.querySelectorAll('span');
                  spans.forEach((span) => {
                    span.style.background = 'white';
                  });
                }}
                onMouseLeave={(e) => {
                  const spans = e.currentTarget.querySelectorAll('span');
                  spans.forEach((span) => {
                    span.style.background = '#a1a1aa';
                  });
                }}
              >
                <span style={{ display: 'block', height: '2px', background: '#a1a1aa', width: '100%', transition: 'all 0.3s ease', transformOrigin: 'center' }}></span>
                <span style={{ display: 'block', height: '2px', background: '#a1a1aa', width: '100%', transition: 'all 0.3s ease', transformOrigin: 'center' }}></span>
                <span style={{ display: 'block', height: '2px', background: '#a1a1aa', width: '100%', transition: 'all 0.3s ease', transformOrigin: 'center' }}></span>
              </button>

              {menuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
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
                  <div
                    style={{
                      textAlign: 'center',
                      marginBottom: '20px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div
                      style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
                        fontSize: '18px',
                        fontWeight: '500',
                        color: 'var(--text-primary)',
                        letterSpacing: '0.5px'
                      }}
                    >
                      <span style={{ fontSize: '22px', fontWeight: '600', verticalAlign: 'baseline', lineHeight: '1' }}>k</span>err
                    </div>
                  </div>

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
                  </nav>

                  <div
                    style={{
                      marginTop: '20px',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      textAlign: 'center'
                    }}
                  >
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

      <section className="hero" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content" style={{ position: 'relative', zIndex: 30 }}>
          <h1>Sparkles Background</h1>
          <div className="hero-meta">
            <div className="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>Luminous particles inspired by Aceternity UI</span>
            </div>
            <div className="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <a href="mailto:colour8k@mac.com">colour8k@mac.com</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer" style={{ position: 'relative', zIndex: 2 }}>
        <div className="footer-content">
          <div className="footer-logo">
            <TextShimmer duration={3} spread={1.5}>
              <span className="logo-k">k</span>err
            </TextShimmer>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-email">
            <a href="tel:4076203618" style={{ display: 'block', marginBottom: 6 }}>407-620-3618</a>
            <a href="mailto:colour8k@mac.com">colour8k@mac.com</a>
          </div>
          <nav className="footer-nav">
            <Link href="/">HOME</Link>
            <a href="#">WORK</a>
            <Link href="/contact">CONTACT</Link>
          </nav>
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/jefferykerrcreative" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
          <div className="footer-copyright">
            &copy; 2025 Jeff Kerr. Dig the site? I vibe-coded it. Click <Link href="/how-i-built-this" style={{ textDecoration: 'underline', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'white'} onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = ''}>here</Link> to see how.
          </div>
        </div>
      </footer>
    </div>
  );
}
