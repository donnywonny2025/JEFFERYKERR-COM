'use client';

import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../src/App.css';
import { Tilt } from '../src/components/motion-primitives/tilt';
import { TextShimmer } from '../src/components/motion-primitives/text-shimmer';
import { SafeWrapper } from '../src/components/SafeWrapper';
import { DigitalClock } from '../src/components/motion-primitives/digital-clock';
import LiquidEtherWrapper from '../src/components/LiquidEtherWrapper';
import SpacingDebugger from '../src/components/SpacingDebugger';
import StarField from '../src/components/StarField';
import MenuWrapper from '../src/components/MenuWrapper';
import '../src/components/Menu/Menu.css';
import { MapPin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Video {
  id: string;
  title: string;
  client: string;
  date: string;
  thumbnail: string;
  embedUrl: string | null;
  description: string;
  credits: string[];
}

const Home = React.memo(function Home() {
  const debugLayout = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === 'layout';
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [showModal, setShowModal] = useState(false);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Optimized scroll to top on page load/reload
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Single efficient scroll operation
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Execute immediately and once more after a brief delay for safety
    scrollToTop();
    const timeoutId = setTimeout(scrollToTop, 10);

    return () => clearTimeout(timeoutId);
  }, []);

  // Trigger hero animations after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        heroSection.classList.add('hero-loaded');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Optimized GSAP scroll animations - only setup when on home page
    if (currentPage === 'home') {
      // Kill existing triggers first to prevent duplicates
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        videoRefs.current.forEach((video, index) => {
          if (video) {
            // Hint the browser for smoother animation
            gsap.set(video, { willChange: "transform, filter, opacity" });

            // Stagger animations slightly for better performance
            gsap.fromTo(
              video,
              {
                opacity: 0,
                filter: "blur(10px)"
              },
              {
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.9,
                ease: "power2.out",
                delay: index * 0.1, // Stagger by 100ms
                scrollTrigger: {
                  trigger: video,
                  start: "top 85%",
                  end: "top 30%",
                  toggleActions: "play none none reverse",
                  markers: false
                }
              }
            );
          }
        });

        // Single refresh after all animations are set up
        ScrollTrigger.refresh();
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentPage]); // Only depend on currentPage changes

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleVideoClick = (video: Video) => {
    if (video.id === 'showreel') {
      // Show modal for showreel
      const overlay = document.createElement('div');

      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at bottom left, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%);
        backdrop-filter: blur(20px);
        z-index: 9999;
        clip-path: circle(0% at bottom left);
        transition: clip-path 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      `;

      document.body.appendChild(overlay);

      setTimeout(() => {
        overlay.style.clipPath = 'circle(150% at bottom left)';
      }, 50);

      setTimeout(() => {
        setShowModal(true);
        setCurrentVideo(video);
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      }, 800);
    } else {
      // Navigate to individual video page
      const overlay = document.createElement('div');

      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at bottom left, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%);
        backdrop-filter: blur(20px);
        z-index: 9999;
        clip-path: circle(0% at bottom left);
        transition: clip-path 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      `;

      document.body.appendChild(overlay);

      setTimeout(() => {
        overlay.style.clipPath = 'circle(150% at bottom left)';
      }, 50);

      setTimeout(() => {
        setCurrentPage('video');
        setCurrentVideo(video);
        window.scrollTo(0, 0);

        setTimeout(() => {
          overlay.style.clipPath = 'circle(0% at top right)';
          overlay.style.background = 'radial-gradient(circle at top right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)';

          setTimeout(() => {
            if (document.body.contains(overlay)) {
              document.body.removeChild(overlay);
            }
          }, 800);
        }, 100);
      }, 800);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentVideo(null);
  };

  const goHome = () => {
    const overlay = document.createElement('div');

    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%);
      backdrop-filter: blur(20px);
      z-index: 9999;
      clip-path: circle(0% at center);
      transition: clip-path 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;

    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.style.clipPath = 'circle(150% at center)';
    }, 50);

    setTimeout(() => {
      setCurrentPage('home');
      setCurrentVideo(null);
      window.scrollTo(0, 0);

      setTimeout(() => {
        overlay.style.clipPath = 'circle(0% at center)';

        setTimeout(() => {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
          }
        }, 800);
      }, 100);
    }, 800);
  };

  // Memoized videos array for performance
  const videos = useMemo(() => [
    {
      id: 'reel-2024',
      title: 'Featured Showreel',
      client: 'Jeff Kerr',
      date: '2025',
      thumbnail: 'https://vumbnail.com/1029802990.jpg',
      embedUrl: 'https://player.vimeo.com/video/1029802990',
      description: 'A collection of clips from various projects over the years, blending traditional filmmaking with AI-generated content to create stunning visuals.',
      credits: ['Jeff Kerr - Director, Cinematographer', 'Various Clients - Production']
    },
    {
      id: 'insta360',
      title: 'Insta360',
      client: 'Insta360',
      date: '2023',
      thumbnail: 'https://vumbnail.com/641527142.jpg',
      embedUrl: 'https://player.vimeo.com/video/641527142',
      description: 'Capturing the world in 360 degrees with Insta360 technology, showcasing immersive filmmaking techniques.',
      credits: ['Sam Kolder - Director', 'Insta360 - Client']
    },
    {
      id: 'commercial-project',
      title: 'Commercial Project',
      client: 'Various',
      date: '2023',
      thumbnail: 'https://vumbnail.com/641502508.jpg',
      embedUrl: 'https://player.vimeo.com/video/641502508',
      description: 'High-end commercial work demonstrating Sam\'s expertise in brand storytelling and visual excellence.',
      credits: ['Sam Kolder - Director, Editor', 'Client - Production']
    },
    {
      id: 'creative-showcase',
      title: 'Creative Showcase',
      client: 'Jeff Kerr',
      date: '2024',
      thumbnail: 'https://picsum.photos/400/225?random=6',
      embedUrl: null,
      description: 'Innovative visual storytelling showcasing creative cinematography techniques and artistic vision.',
      credits: ['Jeff Kerr - Director, Cinematographer', 'Creative Team - Production']
    }
  ], []); // Empty dependency array since videos never change

  if (currentPage === 'video' && currentVideo) {
    return (
      <div className="App">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <a href="#" onClick={goHome} className="logo">
              <TextShimmer duration={3} spread={1.5} fontSize="36px">
                <span className="logo-k">k</span>err
              </TextShimmer>
            </a>
            <nav className="desktop-nav">
              <a href="#" onClick={goHome}>Home</a>
              <a href="#">Work</a>
              <a href="#">About</a>
              <a href="#" className="nav-contact">Contact</a>
            </nav>
          </div>
        </header>

        {/* Menu Overlay */}
        <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav">
            <a href="#" onClick={() => { toggleMenu(); goHome(); }}>Home</a>
            <a href="#" onClick={toggleMenu}>Work</a>
            <a href="#" onClick={toggleMenu}>About</a>
            <a href="#" onClick={toggleMenu} className="nav-contact">Contact</a>
            <div className="mobile-email">
              <a href="mailto:colour8k@mac.com">colour8k@mac.com</a>
            </div>
          </nav>
        </div>

        {/* Video Page Content */}
        <main className="video-page">
          <div className="video-page-content">
            <h1>{currentVideo.title}</h1>
            <div className="video-meta">
              <span className="video-client">{currentVideo.client}</span>
            <span className="video-date">{currentVideo.date}</span>
            </div>

            <div className="video-player">
              <iframe
                src={currentVideo.embedUrl ?? undefined}
                className="rounded-xl"
                frameBorder="0"
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={currentVideo.title}
                width="100%"
                height="100%"
              ></iframe>
            </div>

            <div className="video-description">
              <p>{currentVideo.description}</p>
            </div>

            <div className="video-credits">
              <h3>Credits</h3>
              <ul>
                {currentVideo.credits.map((credit, index) => (
                  <li key={index}>{credit}</li>
                ))}
              </ul>
            </div>

            <div className="more-work">
              <h3>More Work</h3>
              <div className="related-videos">
                {videos.filter(v => v.id !== currentVideo.id).slice(0, 3).map(video => (
                  <div key={video.id} className="related-video" onClick={() => handleVideoClick(video)}>
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="related-info">
                      <h4>{video.title}</h4>
                      <span>{video.client}</span>
                      <span>{video.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

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
              <a href="/backgrounds">BACKGROUNDS</a>
              <a href="#">WORK</a>
              <a href="#">CONTACT</a>
            </nav>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.948 0-3.204.014-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.689-.072 4.948-.072zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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

  // Render JSX

  return (
    <div className="App">
      {debugLayout && <SpacingDebugger enabled />}
      {/* Liquid Ether Background Effect - Optimized for performance */}
      <LiquidEtherWrapper
        colors={['#5227FF', '#FF9FFC', '#B19EEF', '#00d4ff', '#8b5cf6']}
        style={{ opacity: 0.3 }}
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
          <a href="#" className="logo">
            <TextShimmer duration={3} spread={1.5}>
              <span className="logo-k">k</span>err
            </TextShimmer>
          </a>
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

            {/* Simple Menu Component */}
            <MenuWrapper
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              onNavigate={(action: string) => {
                if (action === 'home') {
                  goHome();
                } else if (action === 'work') {
                  // Handle work navigation
                  setMenuOpen(false);
                } else if (action === 'about') {
                  // Handle about navigation
                  setMenuOpen(false);
                } else if (action === 'contact') {
                  // Handle contact navigation
                  setMenuOpen(false);
                }
              }}
            />
          </div>
        </div>
      </header>


      {/* Showreel Modal */}
      {showModal && currentVideo && (
        <div className="video-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>&times;</button>
            <div className="video-embed">
              <iframe
                src={currentVideo.embedUrl ?? undefined}
                className="rounded-xl"
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Simple and Clean */}
      <section className="hero-simple section pt-hero" data-debug-id="hero" style={{ position: 'relative', zIndex: 20 }}>
        <div className="hero-content-simple container-max left-align" style={{
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--hero-gap)'
        }}>
          {/* Simple Hero Text Block */}
          <div className="hero-text-simple measure-hero hero-copy" style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: '400'
          }}>
            <div style={{ marginBottom: '0.5rem' }}>I produce compelling visual content</div>
            <div style={{ marginBottom: '0.5rem' }}>while building AI-enhanced workflows</div>
            <div style={{ whiteSpace: 'nowrap' }}>that change how creative work gets done.</div>
          </div>

          {/* Simple Meta Block */}
          <div className="hero-meta-simple" style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={14} strokeWidth={1.5} color="rgba(255,255,255,0.6)" />
              <span>Grand Rapids, Michigan / World</span>
            </div>
            <div>
              <a href="mailto:colour8k@mac.com" style={{
                color: 'inherit',
                textDecoration: 'underline'
              }}>
                colour8k@mac.com
              </a>
            </div>
          </div>
        </div>
      </section>

        {/* Hero Video - Using exact same structure as showreel */}
        <section className="hero-video featured-video-section" data-debug-id="featured">
          <div className="featured-video-container">
            <div className="featured-video-card">
              <div className="featured-video-thumbnail">
                <img
                  src={videos[0].thumbnail}
                  alt={videos[0].title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                {/* Circular Showreel Element - positioned within featured video container */}
                <div
                  className="circular-showreel"
                  role="button"
                  tabIndex={0}
                  aria-label={`Open showreel: ${videos[0].title}`}
                  onClick={() => handleVideoClick(videos[0])}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleVideoClick(videos[0]); } }}
                >
                  <div className="circular-showreel-inner">
                    <svg className="rotating-text" viewBox="0 0 200 200">
                      <defs>
                        <path id="circle" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                      </defs>
                      <text fontSize="14" fontWeight="700" letterSpacing="2px" fontFamily="'Space Mono', monospace">
                        <textPath href="#circle">
                          SHOWREEL • SHOWREEL • SHOWREEL • SHOWREEL •
                        </textPath>
                      </text>
                    </svg>
                    <div className="play-button-circular">
                      <div className="play-icon-circular"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Brand Logos Section - After Hero Video */}
      <section className="brand-showcase section mt-3" data-debug-id="brands">
        <div className="brand-logos">
          <img src="https://picsum.photos/120/40?random=1" alt="Canon" className="brand-logo" />
          <img src="https://picsum.photos/120/40?random=2" alt="YouTube" className="brand-logo" />
          <img src="https://picsum.photos/120/40?random=3" alt="DJI" className="brand-logo" />
          <img src="https://picsum.photos/120/40?random=4" alt="Hyundai" className="brand-logo" />
          <img src="https://picsum.photos/120/40?random=5" alt="MusicBed" className="brand-logo" />
        </div>
      </section>

      {/* Separator for Featured Video */}
      <section className="video-separator">
        <div className="separator-content">
          <div className="separator-text">A collection of clips from various projects over the years, blending traditional filmmaking with AI-generated content to create stunning visuals.</div>
          <div className="separator-line"></div>
          <div className="separator-text">Featured Showreel</div>
          <div className="separator-line"></div>
          <div className="separator-text">2025</div>
          <div className="separator-line"></div>
        </div>
      </section>

      {/* Minimal Video Grid Section - Remaining videos */}
      <section className="video-grid-section section mt-2" data-debug-id="grid">
        <div className="video-grid">
          {videos.slice(1, 5).map((video, index) => (
            <React.Fragment key={video.id}>
              <div
                className="video-card video-border-ready"
                onClick={() => handleVideoClick(video)}
                ref={(el) => { videoRefs.current[index + 1] = el; }}
              >
                <div className="video-thumbnail">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>

              {/* Separator for each video */}
              <section className="video-separator">
                <div className="separator-content">
                  <div className="separator-text">{video.description}</div>
                  <div className="separator-line"></div>
                  <div className="separator-text">{video.client}</div>
                  <div className="separator-line"></div>
                  <div className="separator-text">{video.date}</div>
                  <div className="separator-line"></div>
                </div>
              </section>
            </React.Fragment>
          ))}
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
            2025 Jeff Kerr. Crafting visual stories that move the world forward.
          </div>
        </div>
      </footer>
    </div>
  );
});

export default Home;
