'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TextShimmer } from '../../../src/components/motion-primitives/text-shimmer';
import { SafeWrapper } from '../../../src/components/SafeWrapper';
import { DigitalClock } from '../../../src/components/motion-primitives/digital-clock';
import LiquidEther from '../../../src/components/LiquidEther';
import '../../../src/App.css';

export default function LiquidStarsBackgroundPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="App">
      {/* Liquid Ether Background Effect with Stars */}
      <LiquidEther
        className="liquid-ether-fullscreen"
        colors={['#5227FF', '#FF9FFC', '#B19EEF', '#00d4ff', '#8b5cf6']}
        style={{ opacity: 0.5 }}
        enableStars={true}
        starLayers={6}
        starDensity={0.75}
        starDriftSpeed={0.035}
        starRotationSpeed={0.15}
        starBrightness={3.5}
        starTwinkleSpeed={3.2}
      />

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
          <h1>Liquid Ether with Stars</h1>
          <div className="hero-meta">
            <div className="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>Flowing Liquid with Animated Stars</span>
            </div>
            <div className="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <a href="mailto:colour8k@mac.com">colour8k@mac.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* Background Controls Section */}
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
            Liquid Ether with Stars
          </h2>

          <div className="control-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
          }}>
            <div className="control-item">
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>Liquid Animation</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                WebGL-powered fluid simulation with organic flow patterns
              </p>
            </div>

            <div className="control-item">
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>Star Field</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Animated star field with twinkling effects and orbital motion
              </p>
            </div>

            <div className="control-item">
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>Performance</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Optimized for 60fps with adaptive quality and star layer management
              </p>
            </div>
          </div>

          <div className="navigation-links" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <Link href="/backgrounds" style={{
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
              ← Back to Backgrounds
            </Link>

            <Link href="/backgrounds/liquid" style={{
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
              Liquid Ether (No Stars)
            </Link>

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
              Home
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
            <Link href="/">HOME</Link>
            <Link href="/backgrounds">BACKGROUNDS</Link>
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
            2025 Jeff Kerr. Crafting visual stories that move the world forward.
          </div>
        </div>
      </footer>
    </div>
  );
}