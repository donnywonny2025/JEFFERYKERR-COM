"use client";

import React from 'react';
import Link from 'next/link';
import MenuWrapper from '../../src/components/MenuWrapper';
import { TextShimmer } from '../../src/components/motion-primitives/text-shimmer';
import { SafeWrapper } from '../../src/components/SafeWrapper';
import { DigitalClock } from '../../src/components/motion-primitives/digital-clock';
import WeatherWidget from '../../src/components/WeatherWidget';
import { Meteors } from '../../src/components/ui/meteors';
import { NoiseSequence } from '../../src/components/ui/noise_sequence';
import LiquidEtherSimple from '../../src/components/LiquidEtherSimple';
import ContactForm from './ContactForm';

const Liquid: React.ComponentType<any> = LiquidEtherSimple as unknown as React.ComponentType<any>;

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="App">
      {/* Background */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        width: '100vw', height: '100vh', minWidth: '100vw', minHeight: '100vh',
        zIndex: 1, overflow: 'hidden', background: '#0a0a0a'
      }}>
        <Liquid
          colors={[ '#000000','#1a1a1a','#3a2a4a','#2a3a5a','#4a4a7a','#5a3a6a','#3a5a5a','#2a2a4a' ]}
          style={{ opacity: 0.75, width: '100%', height: '100%', filter: 'brightness(0.8) contrast(2.0) saturate(1.2)' }}
          enableStars={false}
          initialBrightness={0.25}
          colorIntensity={1.2}
          backgroundDarkness={0.85}
          flowSpeed={0.25}
          turbulence={2.2}
          colorMixing={0.4}
        />
      </div>

      {/* Grain overlay */}
      <div aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 15 }}>
        <NoiseSequence frames={16} tileSize={512} alpha={44} intervalMs={100} fadeMs={180} backgroundSize={420} opacity={0.45} blend={'screen'} rotateDeg={0.3} className="absolute inset-0 pointer-events-none" />
      </div>

      {/* Header */}
      <div className="top-nav-background" aria-hidden="true"></div>
      <header className="header" style={{ padding: '24px 0 0' }}>
        <div className="header-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '1050px', margin: '0 auto', padding: '0 60px' }}>
          <Link href="/" className="logo">
            <TextShimmer duration={3} spread={1.5}>
              <span className="logo-k">k</span>err
            </TextShimmer>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <SafeWrapper>
              <WeatherWidget />
            </SafeWrapper>
            <SafeWrapper>
              <DigitalClock />
            </SafeWrapper>
            <MenuWrapper menuOpen={menuOpen} setMenuOpen={setMenuOpen} onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      </header>

      {/* Local styles for contact page animations */}
      <style jsx global>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
        
        .contact-info-card {
          max-width: 95%;
          margin: 80px auto 0;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 32px 40px;
          backdrop-filter: blur(20px);
        }
        
        .contact-section {
          margin-bottom: 0;
        }
        
        .contact-section:last-child .section-divider {
          display: none;
        }
        
        .section-title {
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6);
          margin: 0 0 16px 0;
          text-transform: none;
          letter-spacing: normal;
        }
        
        .section-content {
          margin-bottom: 24px;
        }
        
        .company-name {
          font-size: 16px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 6px 0;
        }
        
        .address-line {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 4px 0;
          line-height: 1.4;
        }
        
        .contact-email {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
        }
        
        .contact-email:hover {
          color: rgba(255, 255, 255, 1);
        }
        
        .social-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .social-link {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 14px;
        }
        
        .social-link:hover {
          color: rgba(255, 255, 255, 1);
        }
        
        .social-link svg {
          opacity: 0.7;
        }
        
        .section-divider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.2);
          margin: 24px 0;
        }
        
        @media (max-width: 768px) {
          .contact-info-card {
            margin: 32px 16px 0;
            padding: 28px 24px;
          }
        }
      `}</style>

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 20, minHeight: '80vh', padding: '135px 24px 100px' }}>
        <div style={{ width: '100%', maxWidth: '1050px', padding: '0 60px', margin: '0 auto' }}>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '20px' }}>Contact</div>
            {/* Centered vertical divider under overline */}
            <div style={{ width: '1px', height: '28px', margin: '0 auto 28px', background: 'rgba(255,255,255,0.24)' }} />
          </div>
          <h1 className="animate-fade-in-up" style={{ fontFamily: "'Space Mono', monospace", fontSize: '32px', fontWeight: 400, color: 'rgba(255,255,255,0.95)', marginBottom: '36px', animationDelay: '0.2s', animationFillMode: 'forwards', textAlign: 'center' }}>What's up?</h1>

          {/* Constrain the form for better readability */}
          <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
            <ContactForm />
          </div>

          {/* Contact info card - Sam's vertical card design */}
          <div className="contact-info-card">
            <div className="contact-section">
              <h3 className="section-title">Address</h3>
              <div className="section-content">
                <p className="company-name">Jeff Kerr Creative</p>
                <p className="address-line">Grand Rapids, Michigan / World</p>
              </div>
              <div className="section-divider"></div>
            </div>

            <div className="contact-section">
              <h3 className="section-title">Get in touch ••</h3>
              <div className="section-content">
                <a href="mailto:colour8k@mac.com" className="contact-email">
                  colour8k@mac.com
                </a>
              </div>
              <div className="section-divider"></div>
            </div>

            <div className="contact-section">
              <h3 className="section-title">Socials</h3>
              <div className="section-content">
                <div className="social-links">
                  <a href="#" className="social-link">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a href="#" className="social-link">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with meteors overlay (to match homepage) */}
      <div style={{ position: 'relative', background: '#000', overflow: 'hidden', zIndex: 40 }}>
        <footer className="footer" style={{ position: 'relative', zIndex: 41 }}>
          {/* Meteors overlay above black background but below footer content */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden="true">
            <Meteors number={20} />
          </div>
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
              <Link href="/contact">CONTACT</Link>
            </nav>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
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
  );
}
