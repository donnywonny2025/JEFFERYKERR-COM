'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import MenuWrapper from '../src/components/MenuWrapper';
import { TextShimmer } from '../src/components/motion-primitives/text-shimmer';
import { SafeWrapper } from '../src/components/SafeWrapper';
import { DigitalClock } from '../src/components/motion-primitives/digital-clock';
import '../src/App.css';
import LiquidEther from '../src/components/LiquidEther';
import { MapPin } from 'lucide-react';
// Type helper to allow passing props to JS component without TS types
const Liquid: React.ComponentType<any> = LiquidEther as unknown as React.ComponentType<any>;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Local videos array to drive the simple grid and separators
  const videos = [
    {
      id: 'reel-2024',
      title: 'Featured Showreel',
      client: 'Jeff Kerr',
      date: '2025',
      thumbnail: 'https://vumbnail.com/1029802990.jpg',
      href: 'https://player.vimeo.com/video/1029802990',
      description:
        'A collection of clips from various projects over the years, blending traditional filmmaking with AI-generated content to create stunning visuals.'
    },
    {
      id: 'insta360',
      title: 'Insta360',
      client: 'Insta360',
      date: '2023',
      thumbnail: 'https://vumbnail.com/641527142.jpg',
      href: 'https://player.vimeo.com/video/641527142',
      description: 'Capturing the world in 360 degrees with Insta360 technology, showcasing immersive filmmaking techniques.'
    },
    {
      id: 'commercial-project',
      title: 'Commercial Project',
      client: 'Various',
      date: '2023',
      thumbnail: 'https://vumbnail.com/641502508.jpg',
      href: 'https://player.vimeo.com/video/641502508',
      description: 'High-end commercial work demonstrating expertise in brand storytelling and visual excellence.'
    }
  ];

  // Minimal click handler and refs for grid items
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const handleVideoClick = (video: { href: string }) => {
    if (video?.href) {
      window.open(video.href, '_blank', 'noopener');
    }
  };

  return (
    <div className="App">
      {/* Animated Liquid Ether Background (behind content) */}
      <Liquid
        colors={[ '#5227FF', '#FF9FFC', '#B19EEF', '#00d4ff', '#8b5cf6' ]}
        style={{ opacity: 0.8 }}
        enableStars={false}
        starLayers={3}
        starDensity={0.5}
        starDriftSpeed={0.02}
        starRotationSpeed={0.08}
        starBrightness={2.0}
        starTwinkleSpeed={2.0}
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
            {/* Digital Clock */}
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

      {/* MODERN CENTERED RESPONSIVE CONTAINER */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 60px',
        position: 'relative',
        zIndex: 20
      }}>

        {/* Hero Text Section */}
        <section style={{ 
          paddingTop: '140px',
          marginBottom: '60px'
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: '400',
            lineHeight: '1.3',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '40px',
            maxWidth: '750px'
          }}>
            <div style={{ marginBottom: '0.5rem', whiteSpace: 'nowrap' }}>I produce compelling visual content</div>
            <div style={{ marginBottom: '0.5rem', whiteSpace: 'nowrap' }}>while building AI-enhanced workflows</div>
            <div style={{ whiteSpace: 'nowrap' }}>that change how creative work gets done.</div>
          </div>

          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            fontSize: '11px',
            color: '#cccccc',
            opacity: 0.6,
            fontFamily: "'Space Mono', monospace"
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={14} strokeWidth={1.5} color="rgba(255,255,255,0.6)" />
              <span>Grand Rapids, Michigan / World</span>
            </div>
            <div>
              <a href="mailto:colour8k@mac.com" style={{ color: '#cccccc', textDecoration: 'none' }}>colour8k@mac.com</a>
            </div>
          </div>
        </section>

        {/* Hero Video */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{
            maxWidth: '750px',
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            background: '#000',
            cursor: 'pointer',
            position: 'relative'
          }} onClick={() => handleVideoClick(videos[0])}>
            <img
              src={videos[0].thumbnail}
              alt={videos[0].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            <div className="circular-showreel" role="button" tabIndex={0} onClick={() => handleVideoClick(videos[0])}>
              <div className="circular-showreel-inner">
                <svg className="rotating-text" viewBox="0 0 200 200">
                  <defs><path id="circle" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" /></defs>
                  <text fontSize="14" fontWeight="700" letterSpacing="2px" fontFamily="'Space Mono', monospace">
                    <textPath href="#circle">SHOWREEL • SHOWREEL • SHOWREEL • SHOWREEL •</textPath>
                  </text>
                </svg>
                <div className="play-button-circular"><div className="play-icon-circular"></div></div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Logos - More Spacing */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <img src="https://picsum.photos/120/40?random=1" alt="Canon" style={{ height: '35px', opacity: 0.3, filter: 'brightness(0) invert(1)' }} />
            <img src="https://picsum.photos/120/40?random=2" alt="YouTube" style={{ height: '35px', opacity: 0.3, filter: 'brightness(0) invert(1)' }} />
            <img src="https://picsum.photos/120/40?random=3" alt="DJI" style={{ height: '35px', opacity: 0.3, filter: 'brightness(0) invert(1)' }} />
            <img src="https://picsum.photos/120/40?random=4" alt="Hyundai" style={{ height: '35px', opacity: 0.3, filter: 'brightness(0) invert(1)' }} />
            <img src="https://picsum.photos/120/40?random=5" alt="MusicBed" style={{ height: '35px', opacity: 0.3, filter: 'brightness(0) invert(1)' }} />
          </div>
        </section>

        {/* Featured Video Separator */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontFamily: "'Space Mono', monospace", fontSize: '14px', fontWeight: '300', color: '#ffffff', opacity: 0.8, maxWidth: '750px' }}>
            <div>A collection of clips from various projects over the years, blending traditional filmmaking with AI-generated content to create stunning visuals.</div>
            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)' }}></div>
            <div>Featured Showreel</div>
            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)' }}></div>
            <div>2025</div>
            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)' }}></div>
          </div>
        </section>

        {/* 4 Additional Videos */}
        {videos.slice(1, 5).map((video, index) => (
          <React.Fragment key={video.id}>
            <section style={{ marginBottom: '40px' }}>
              <div onClick={() => handleVideoClick(video)} ref={(el) => { videoRefs.current[index + 1] = el; }} style={{ cursor: 'pointer' }}>
                <div style={{ 
                  maxWidth: '750px', 
                  width: '100%', 
                  aspectRatio: '16/9', 
                  overflow: 'hidden', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}>
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
              </div>
            </section>

            <section style={{ marginBottom: '80px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontFamily: "'Space Mono', monospace", fontSize: '14px', fontWeight: '300', color: '#ffffff', opacity: 0.8, maxWidth: '750px' }}>
                <div>{video.description}</div>
                <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)' }}></div>
                <div>{video.client}</div>
                <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)' }}></div>
                <div>{video.date}</div>
              </div>
            </section>
          </React.Fragment>
        ))}

      </div>

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
            <Link href="/backgrounds">🎨 BACKGROUNDS</Link>
            <a href="#">WORK</a>
            <a href="#">CONTACT</a>
          </nav>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
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
