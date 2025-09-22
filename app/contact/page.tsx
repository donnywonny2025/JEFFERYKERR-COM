"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

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
            <MenuWrapper 
              menuOpen={menuOpen} 
              setMenuOpen={setMenuOpen} 
              onNavigate={(action: string) => {
                setMenuOpen(false);
                if (action === 'contact') {
                  router.push('/contact');
                } else if (action === 'home') {
                  router.push('/');
                }
              }} 
            />
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
        /* Stats card uses same base as contact-info-card, with visual tweaks */
        .contact-stats-card {
          margin-top: 28px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 95%; /* Match .contact-info-card width */
          padding: 42px 36px; /* Proper internal spacing */
        }
        .contact-stats-inner {
          position: relative;
          z-index: 2;
          width: min(96%, 950px);
          margin: 0 auto;
          text-align: center; /* center-align all content */
        }
        .stats-title {
          font-family: 'Space Mono', monospace;
          font-size: 10px; /* Smaller title */
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.72);
          text-align: center;
          margin: 0 0 35px; /* Reduce title spacing */
        }
        .stats-divider {
          width: 1px;
          height: 32px;
          margin: 0 auto 48px; /* breathing room above first metric */
          background: rgba(255,255,255,0.32);
        }
        .metric-row {
          display: flex;
          flex-direction: column; /* Stack number ABOVE label */
          align-items: center;
          gap: 4px; /* Tight gap between number and its label */
          justify-content: center;
          margin: 50px 0; /* More generous spacing between stat blocks */
        }
        .metric-value {
          font-family: 'Space Mono', monospace;
          font-size: clamp(24px, 3.5vw, 32px); /* Refined, smaller numbers */
          font-weight: 500; /* Lighter weight, not heavy */
          letter-spacing: 0.01em;
          font-variant-numeric: tabular-nums lining-nums;
          color: rgba(255,255,255,0.98);
          line-height: 1.1;
        }
        .metric-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px; /* Smaller, cleaner labels */
          font-weight: 400;
          color: rgba(255,255,255,0.7); /* More muted */
          white-space: nowrap;
          letter-spacing: 0.02em;
          text-align: center;
        }
        .metric-hr {
          width: 70%; /* Slightly wider separators */
          height: 1px;
          background: rgba(255,255,255,0.22); /* subtle divider */
          margin: 28px auto; /* Tighter separator spacing */
        }
        .stats-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 26px; /* pill button */
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
          background: #ffffff;
          color: #111111;
          box-shadow: 0 6px 24px rgba(0,0,0,0.22);
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          cursor: pointer;
          user-select: none;
          transition: transform 0.18s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .stats-cta:hover { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(0,0,0,0.28); }
        .stats-cta .arrow { width: 22px; height: 1px; background: #111; position: relative; }
        .stats-cta .arrow::after { content: ''; position: absolute; right: -2px; top: -3px; width: 7px; height: 7px; border-top: 1px solid #111; border-right: 1px solid #111; transform: rotate(45deg); }

        /* Soft vignette + subtle gradient backdrop for the stats card */
        .stats-backdrop {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            radial-gradient(1200px 600px at 20% 85%, rgba(107,70,193,0.16), transparent 70%),
            radial-gradient(1000px 600px at 80% 20%, rgba(192,132,252,0.12), transparent 70%),
            linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
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
          <div id="contact-form" style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
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
          {/* Stats card (below existing contact card) */}
          <div className="contact-info-card contact-stats-card animate-fade-in-up" style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}>
            {/* Background Vimeo video (full opacity) */}
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden', pointerEvents: 'none', borderRadius: 'inherit' }}>
              <iframe
                title="Stats background video"
                src="https://player.vimeo.com/video/1120798857?autoplay=1&muted=1&background=1&loop=1&controls=0&autopause=0&dnt=1&playsinline=1"
                style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%', transform: 'translate(-50%, -50%) scale(1.6)', transformOrigin: 'center', border: 0, display: 'block' }}
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
            <div className="contact-stats-inner">
              <div className="stats-title">LET'S CHAT</div>
              <div className="stats-divider" aria-hidden="true" />

              <div className="metric-row">
                <div className="metric-value">20+</div>
                <div className="metric-label">Years Creating</div>
              </div>
              <div className="metric-hr" aria-hidden="true" />

              <div className="metric-row">
                <div className="metric-value">Millions</div>
                <div className="metric-label">Have Watched</div>
              </div>
              <div className="metric-hr" aria-hidden="true" />

              <div className="metric-row">
                <div className="metric-value">Stories</div>
                <div className="metric-label">That Connect</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '26px' }}>
                <a
                  href="mailto:colour8k@mac.com?subject=Quick%20hello%2C%20just%20checked%20out%20your%20website&body=Hi%20Jeffrey"
                  className="stats-cta"
                  aria-label="Email Jeff Kerr"
                >
                  CONTACT
                  <span className="arrow" aria-hidden="true" />
                </a>
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
