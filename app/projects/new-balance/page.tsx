"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TextShimmer } from '../../../src/components/motion-primitives/text-shimmer';
import { SafeWrapper } from '../../../src/components/SafeWrapper';
import { DigitalClock } from '../../../src/components/motion-primitives/digital-clock';
import MenuWrapper from '../../../src/components/MenuWrapper';
import WeatherWidget from '../../../src/components/WeatherWidget';
import LiquidEtherSimple from '../../../src/components/LiquidEtherSimple';
import { Meteors } from '../../../src/components/ui/meteors';
import '../../../src/App.css';
import { Instagram, Linkedin } from 'lucide-react';

const Liquid = LiquidEtherSimple as unknown as React.ComponentType<any>;

export default function NewBalanceCampaignPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const vimeoId = '1120683744';
  const embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=0&loop=0&title=0&byline=0&portrait=0`;

  const separatorStyle = {
    width: '100%',
    height: '1px',
    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)'
  } as React.CSSProperties;

  const columnStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '750px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '20px',
    paddingRight: '20px',
  };

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
        <div className="top-nav-background" aria-hidden="true"></div>
        <header className="header" style={{ padding: '24px 0 0' }}>
          <div
            className="header-content"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '1050px',
              margin: '0 auto',
              padding: '0 60px'
            }}
          >
            <Link href="/" className="logo">
              <TextShimmer duration={3} spread={1.5}>
                <span className="logo-k">k</span>err
              </TextShimmer>
            </Link>

            <div
              className="header-right"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
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
                  if (action === 'contact') {
                    router.push('/contact');
                  } else if (action === 'home') {
                    router.push('/');
                  } else if (action === 'work') {
                    router.push('/#more-work');
                  }
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
              padding: '0 24px',
              margin: '0 auto'
            }}
          >
            <section style={{ ...columnStyle, paddingTop: '140px', marginBottom: '40px' }}>
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

            <section style={{ ...columnStyle, marginBottom: '60px' }}>
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
                  title="New Balance Campaign"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: '0' }}
                />
              </div>
            </section>

            <section style={{ ...columnStyle, marginBottom: '60px' }}>
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
                New Balance
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
                Rome, 2025 — A short showcase for New Balance around the Run Roma (2026 edition) marathon in Rome, Italy. Directed by Brian Cibula, this piece leans on tight editorial, advanced cinematography, and 360° camera technology to deliver a focused, high-energy brand vignette.
              </p>
            </section>

            <section style={{ ...columnStyle, marginBottom: '80px' }}>
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
                <div>Client: New Balance</div>
                <div style={separatorStyle}></div>
                <div>Role: Creative Director</div>
                <div style={separatorStyle}></div>
                <div>Director: Brian Cibula</div>
                <div style={separatorStyle}></div>
                <div>Deliverables: TV and web</div>
                <div style={separatorStyle}></div>
                <div>Location: Rome, Italy</div>
                <div style={separatorStyle}></div>
                <div>Published: 2025</div>
              </div>
            </section>
          </div>
        </div>

        <div style={{ position: 'relative', background: '#000', overflow: 'hidden', zIndex: 40 }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden="true">
            <Meteors number={20} />
          </div>
          <footer className="footer" style={{ position: 'relative', zIndex: 41 }}>
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
                <a href="#" aria-label="LinkedIn" title="LinkedIn" style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <Linkedin size={20} strokeWidth={2} color="currentColor" />
                </a>
              </div>
              <div className="footer-copyright">
                &copy; 2025 Jeff Kerr. Dig the site? I vibe-coded it. Click <Link href="/how-i-built-this" style={{ textDecoration: 'underline', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'white')} onMouseLeave={(e) => (e.currentTarget.style.color = '')}>here</Link> to see how.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
