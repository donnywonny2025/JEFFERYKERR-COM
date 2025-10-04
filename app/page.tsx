"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MenuWrapper from '../src/components/MenuWrapper';
import { TextShimmer } from '../src/components/motion-primitives/text-shimmer';
import { SafeWrapper } from '../src/components/SafeWrapper';
import { DigitalClock } from '../src/components/motion-primitives/digital-clock';
import LiquidEtherSimple from '../src/components/LiquidEtherSimple';
import { MapPin, Linkedin } from 'lucide-react';
import FooterStars from '../src/components/FooterStars';
import { Meteors } from '../src/components/ui/meteors';
import WeatherWidget from '../src/components/WeatherWidget';
import { NoiseSequence } from '../src/components/ui/noise_sequence';

const Liquid: React.ComponentType<any> = LiquidEtherSimple as unknown as React.ComponentType<any>;

// Character-level text splitting component
const CharacterHoverText = ({ children, className = "" }: { children: string; className?: string }) => {
  const text = typeof children === 'string' ? children : '';
  
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className="char-hover"
          style={{
            display: 'inline-block',
            transition: 'all 0.15s ease',
            cursor: 'pointer'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

/* ----- Homepage-only: Scroll-triggered showreel playback ----- */
type ScrollTriggeredProps = {
  src: string;
  poster: string;
  delayMs?: number;
  playThreshold?: number;
  pauseThreshold?: number;
};

function ScrollTriggeredShowreel({ src, poster, delayMs = 700, playThreshold = 0.7, pauseThreshold = 0.35 }: ScrollTriggeredProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    let timeoutId: number | null = null;
    const playWithDelay = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(async () => {
        try {
          if (videoRef.current) {
            await videoRef.current.play();
            if (!started) setStarted(true); // poster used only on very first start
          }
        } catch {}
      }, delayMs);
    };
    const pauseNow = () => {
      if (timeoutId) { window.clearTimeout(timeoutId); timeoutId = null; }
      try { videoRef.current?.pause(); } catch {}
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;
        if (entry.isIntersecting && ratio >= playThreshold) {
          playWithDelay();
        } else if (!entry.isIntersecting || ratio <= pauseThreshold) {
          pauseNow();
        }
      });
    }, { threshold: [0, pauseThreshold, playThreshold, 1] });
    io.observe(el);
    return () => { if (timeoutId) window.clearTimeout(timeoutId); io.disconnect(); };
  }, [started]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <video 
        ref={videoRef} 
        src={src}
        poster={poster}
        playsInline 
        muted 
        loop 
        preload="metadata"
        style={{ 
          position: 'absolute', 
          inset: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          border: 0, 
          display: 'block', 
          borderRadius: 'inherit' 
        }} 
      />
    </div>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const router = useRouter();
  // Defer heavy embeds (like YouTube) until after first paint to avoid
  // an initial reflow that can look like a flicker in dev
  const [showFeaturedEmbed, setShowFeaturedEmbed] = useState(false);
  const [showMeteors, setShowMeteors] = useState(false);
  const nbHeroVideoRef = useRef<HTMLVideoElement | null>(null);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Staggered animation sequence for centered layout - optimized for LCP
  useEffect(() => {
    // Use requestIdleCallback to defer non-critical animations
    const scheduleAnimation = (callback: () => void, delay: number) => {
      setTimeout(() => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(callback);
        } else {
          callback();
        }
      }, delay);
    };

    const timers = [
      setTimeout(() => setAnimationStage(1), 400),   // Hero line 1 - faster for LCP
      setTimeout(() => setAnimationStage(2), 600),   // Hero line 2 - faster for LCP
      setTimeout(() => setAnimationStage(3), 800),   // Hero line 3 - faster for LCP
      scheduleAnimation(() => setAnimationStage(4), 1000),  // Contact info - deferred
      scheduleAnimation(() => setAnimationStage(5), 1200),  // Featured video - deferred
      scheduleAnimation(() => setAnimationStage(6), 1400),  // Sponsor placeholder - deferred
      scheduleAnimation(() => setAnimationStage(7), 1600),  // "More Work" heading - deferred
      // Defer heavy animations until after page load
      setTimeout(() => setShowMeteors(true), 3000),
    ];

    return () => timers.forEach(timer => timer && clearTimeout(timer));
  }, []);

  // Enable Featured iframe shortly after first paint to keep initial render
  // visually stable (prevents appear-disappear when the iframe initializes)
  useEffect(() => {
    let id = window.setTimeout(() => setShowFeaturedEmbed(true), 350);
    return () => window.clearTimeout(id);
  }, []);

  // Seamless loop guard for New Balance hero: avoid gap at loop point
  useEffect(() => {
    if (!showFeaturedEmbed) return;
    const v = nbHeroVideoRef.current;
    if (!v) return;
    const onTimeUpdate = () => {
      if (!v.duration || Number.isNaN(v.duration)) return;
      const remaining = v.duration - v.currentTime;
      if (remaining <= 0.12) { // reset just before end to prevent glitch
        try {
          v.currentTime = 0;
          // Ensure continuous playback without flashing poster
          if (v.paused) v.play().catch(() => {});
        } catch {}
      }
    };
    v.addEventListener('timeupdate', onTimeUpdate);
    return () => v.removeEventListener('timeupdate', onTimeUpdate);
  }, [showFeaturedEmbed]);

  // Expanded videos array with 5 videos and internal routes
  const videos = [
    // Index 0 is not rendered in the list; it's used conceptually for the hero.
    // Move New Balance into index 0 to designate it as the hero piece.
    {
      id: 'new-balance-campaign',
      title: 'New Balance Campaign',
      client: 'New Balance',
      date: '2025',
      thumbnail: 'https://vumbnail.com/1120683744.jpg',
      href: 'https://player.vimeo.com/video/1120683744',
      route: '/projects/new-balance',
      description: 'Essence of movement and performance through innovative technology.'
    },
    // First visible list item below the hero: Danny Was Here TV
    {
      id: 'featured-video',
      title: 'Danny Was Here TV',
      client: 'Jeff Kerr',
      date: '2025',
      thumbnail: 'https://vumbnail.com/1120721555.jpg',
      href: 'https://player.vimeo.com/video/1120721555',
      route: '/projects/DannyWasHereTV',
      description: 'Danny Was Here TV video showcase.'
    },
    // Next item: Featured Showreel
    {
      id: 'reel-2024',
      title: 'Featured Showreel',
      client: 'Jeff Kerr',
      date: '2025',
      thumbnail: 'https://vumbnail.com/1120706636.jpg',
      href: 'https://player.vimeo.com/video/1120706636',
      route: '/projects/showreel-2025',
      description: 'A sweeping cut of work over the years across commercial, corporate, government, and documentary.'
    },
    {
      id: 'commercial-project',
      title: 'Council for Responsible Nutrition',
      client: 'Council for Responsible Nutrition (CRN)',
      date: '2022',
      thumbnail: 'https://vumbnail.com/641502508.jpg',
      href: 'https://player.vimeo.com/video/641502508',
      route: '/projects/commercial',
      description: 'An animation-led explainer produced for a national release across web and social.'
    },
    {
      id: 'insta360',
      title: 'FTC — LeanSpa',
      client: 'Federal Trade Commission (FTC)',
      date: '2023',
      thumbnail: 'https://vumbnail.com/641503564.jpg',
      href: 'https://player.vimeo.com/video/641503564',
      route: '/projects/insta360',
      description: 'National campaign series addressing deceptive diet ads; this 1:31 spot was one of several with TV, radio, web, and social cutdowns.'
    },
    {
      id: 'justice-for-lai-dai-han',
      title: 'Justice for Lai Dai Han',
      client: 'The Kerr Media Group',
      date: '2021',
      thumbnail: 'https://vumbnail.com/641889858.jpg',
      href: 'https://player.vimeo.com/video/641889858',
      route: '/projects/justice-for-lai-dai-han',
      description: 'Documentary work highlighting the stories of the Lai Dai Han and advocating for acknowledgment, justice, and reconciliation.'
    },
    {
      id: 'ai-documentary',
      title: 'Apollo 11 — 50th Anniversary',
      client: 'NASA',
      date: '2019',
      thumbnail: 'https://vumbnail.com/641599879.jpg',
      href: 'https://player.vimeo.com/video/641599879',
      route: '/projects/ai-documentary',
      description: 'Central projection film produced for NASA’s Apollo 11 50th Anniversary ceremony in Washington, D.C.'
    }
  ];

  const columnStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '750px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '20px',
    paddingRight: '20px',
  };

  // Refs for scroll animations
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [videoStates, setVideoStates] = useState<boolean[]>(new Array(videos.length).fill(false));

  // Simple click handler to navigate to the route
  const handleVideoClick = (video: { route: string }) => {
    if (video?.route) {
      router.push(video.route);
    }
  };

  // Scroll to the Showreel section (the next video below the hero)
  const scrollToShowreel = () => {
    const el = videoRefs.current[1]; // videos[1] is the first item in the list below the hero
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Scroll animation setup
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    videoRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setVideoStates(prev => {
              const newStates = [...prev];
              newStates[index] = entry.isIntersecting;
              return newStates;
            });
          },
          { threshold: 0.2, rootMargin: '50px' }
        );
        
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <div className="App">
      {/* Background from Testing Lab: LiquidEtherSimple tuned variant */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        minWidth: '100vw',
        minHeight: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        background: '#0a0a0a'
      }}>
        <Liquid
          colors={[
            '#000000',
            '#1a1a1a',
            '#3a2a4a',
            '#2a3a5a',
            '#4a4a7a',
            '#5a3a6a',
            '#3a5a5a',
            '#2a2a4a'
          ]}
          style={{
            opacity: 0.75,
            width: '100%',
            height: '100%',
            filter: 'brightness(0.8) contrast(2.0) saturate(1.2)'
          }}
          enableStars={false}
          initialBrightness={0.25}
          colorIntensity={1.2}
          backgroundDarkness={0.85}
          flowSpeed={0.25}
          turbulence={2.2}
          colorMixing={0.4}
        />
      </div>

      {/* Grain from Testing Lab: NoiseSequence (smooth, non-flicker) */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 15
        }}
      >
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
          className="absolute inset-0 pointer-events-none"
        />
      </div>

      {/* Header */}
      <div className="top-nav-background" aria-hidden="true"></div>
      <header
        className="header"
        style={{
          padding: '24px 0 0'
        }}
      >
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
                  try {
                    if (typeof window !== 'undefined' && window.location.pathname === '/') {
                      const el = document.getElementById('more-work');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        return;
                      }
                    }
                  } catch {}
                  router.push('/#more-work');
                }
                // Add other navigation cases as needed
              }}
            />
          </div>
        </div>
      </header>

      {/* Add styles for animations and enhancements */}
      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(135deg, #00d4ff 0%, #8b5cf6 50%, #FF9FFC 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: continuousFlow 20s ease-in-out infinite;
        }

        /* Prevent horizontal scroll and ensure full viewport sizing */
        html, body, #__next {
          width: 100%;
          min-height: 100%;
          overflow-x: hidden;
        }
        .App {
          min-width: 100vw;
        }

        /* Removed CSS grain styles in favor of Canvas-based Noise overlay */

        @keyframes continuousFlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          33% {
            background-position: 100% 50%;
          }
          66% {
            background-position: 200% 50%;
          }
        }

        /* Simple fade-in-up used for section reveals with delay */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .hero-line {
          white-space: nowrap;
        }

        @media (max-width: 900px) {
          .hero-line {
            white-space: normal;
          }
        }

        .contact-info {
          position: relative;
          display: inline-flex;
          align-items: center;
          transition: opacity 0.3s ease;
          cursor: pointer;
          border-radius: 6px;
          padding: 2px 0;
          overflow: visible;
        }

        /* Shimmer sweep as an overlay so no background line remains */
        .contact-info::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 140%;
          left: -60%;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0) 100%);
          opacity: 0;
          pointer-events: none;
          transform: translateX(-20%);
        }

        .contact-info:hover::after {
          animation: shimmerSweep 900ms ease-out;
        }

        @keyframes shimmerSweep {
          0% { opacity: 0; transform: translateX(-40%); }
          20% { opacity: 0.25; }
          80% { opacity: 0.12; }
          100% { opacity: 0; transform: translateX(60%); }
        }
        
        .video-container {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          filter: blur(4px);
          opacity: 0.4;
          transform: translateY(20px);
        }
        
        .video-container.visible {
          filter: blur(0px);
          opacity: 1;
          transform: translateY(0px);
        }
        
        .video-thumbnail {
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          cursor: pointer;
        }
        
        .metadata-section {
          transition: all 0.4s ease;
        }
        
        .metadata-section:hover {
          opacity: 1 !important;
        }

        /* Play Featured Video button */
        .play-featured-btn {
          position: absolute;
          bottom: 16px;
          left: 16px;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(6px);
          color: #fff;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.2s ease, opacity 0.25s ease;
          opacity: 0.95;
          overflow: hidden;
        }

        .play-featured-btn::after {
          content: '';
          position: absolute;
          inset: -60% -120%;
          background: linear-gradient(120deg,
            rgba(255,255,255,0) 20%,
            rgba(255,255,255,0.35) 45%,
            rgba(255,255,255,0.65) 50%,
            rgba(255,255,255,0.35) 55%,
            rgba(255,255,255,0) 80%
          );
          transform: translateX(-120%) rotate(10deg);
          transition: transform 0.6s ease;
          pointer-events: none;
        }

        .play-featured-btn:hover {
          background: rgba(255,255,255,0.08);
        }

        .play-featured-btn:hover::after {
          transform: translateX(130%) rotate(10deg);
        }

        /* Frosted pill button for CONTACT (same visuals as play button, no absolute positioning) */
        .frosted-pill-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(6px);
          color: #fff;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.2s ease, opacity 0.25s ease;
          opacity: 0.95;
          overflow: hidden;
          text-decoration: none;
        }
        .frosted-pill-btn::after {
          content: '';
          position: absolute;
          inset: -60% -120%;
          background: linear-gradient(120deg,
            rgba(255,255,255,0) 20%,
            rgba(255,255,255,0.35) 45%,
            rgba(255,255,255,0.65) 50%,
            rgba(255,255,255,0.35) 55%,
            rgba(255,255,255,0) 80%
          );
          transform: translateX(-120%) rotate(10deg);
          transition: transform 0.6s ease;
          pointer-events: none;
        }
        .frosted-pill-btn:hover { background: rgba(255,255,255,0.08); }
        .frosted-pill-btn:hover::after { transform: translateX(130%) rotate(10deg); }

        /* Page load animations */
        .hero-animate {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .hero-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .contact-animate {
          opacity: 0;
          transform: translateY(15px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .contact-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .video-animate {
          opacity: 0;
          transform: translateY(25px) scale(0.98);
          transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .video-animate.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        
        .metadata-animate {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .metadata-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Character-level hover effects */
        .char-hover:hover {
          color: #ffffff !important;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
          transform: translateY(-1px);
        }

        /* Add intrinsic size to list thumbnails */
        .video-thumbnail {
          width: intrinsic;
          height: intrinsic;
        }

        /* Optimized repeated styles */
        .video-card-container {
          width: 100%;
          marginBottom: 80px;
          cursor: pointer;
          borderRadius: 12px;
          overflow: hidden;
          backgroundColor: #111;
          position: relative;
          aspectRatio: 16/9;
        }

        .video-overlay-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          padding: 60px 40px 40px;
          color: white;
        }

        /* Add prefers-reduced-motion guard for animation classes */
        @media (prefers-reduced-motion: reduce) {
          .hero-animate, .contact-animate, .video-animate, .metadata-animate {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

          /* ----- Mobile-only video title treatment (Option B) ----- */
          @media (max-width: 600px) {
          /* Pull the below-video title closer by shrinking the section gap */
          .home-featured-video { margin-bottom: 6px !important; }
          /* For list items, tighten the gap below each video container */
          .video-container { margin-bottom: 6px !important; }

          /* Hide the large overlay title on the video */
          .overlay-title { display: none !important; }
          /* Hide the on-video meta as well */
          .overlay-meta { display: none !important; }

          /* Show the separate title below the video */
          .mobile-title { display: block !important; }

          /* Keep metadata readable, single-line */
          .video-overlay-info .overlay-meta {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            letter-spacing: -0.01em;
          }

          /* Slightly stronger gradient for readability */
          .video-overlay-info {
            background: linear-gradient(transparent, rgba(0,0,0,0.88)) !important;
          }

          /* Move play pill to top-right to avoid covering metadata at tight widths */
          .hero-play-button {
            top: 50% !important;
            left: 50% !important;
            right: auto !important;
            bottom: auto !important;
            transform: translate(-50%, -50%) !important;
            padding: 10px 14px !important;
          }

          /* Hide list item overlays and show simplified blocks for mobile */
          .list-overlay-title, .list-overlay-meta, .list-overlay-desc { display: none !important; }
          .mobile-list-title { display: block !important; }

          /* Fallback: center any circular play button on list items */
          .video-container .play-button-circular {
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
          }
        }

        /* Keep contact line on a single row on small screens */
        @media (max-width: 600px) {
          .contact-info { white-space: nowrap; overflow: hidden; }
          .contact-info .contact-loc,
          .contact-info .contact-email-text {
            display: inline-block;
            max-width: calc(50% - 18px); /* split space around the divider */
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: middle;
          }
          .contact-info a { color: #cccccc; text-decoration: none; }
        }

        /* Respect users who prefer reduced motion (no change for others) */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up { animation: none !important; opacity: 1 !important; transform: none !important; }
          .rotating-text { animation: none !important; }
        }

        /* (Reverted) No navbar-specific responsive overrides to preserve original desktop layout */

        /* Stats card styles (moved here from inner section to avoid nested styled-jsx) */
        .contact-info-card { max-width: 95%; margin: 0 auto; background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px 40px; backdrop-filter: blur(20px); }
        .contact-stats-card { position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; max-width: 95%; padding: 42px 36px; }
        .contact-stats-inner { position: relative; z-index: 2; width: min(96%, 950px); margin: 0 auto; text-align: center; }
        .stats-title { font-family: 'Space Mono', monospace; font-size: 36px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.72); text-align: center; margin: 0 0 35px; }
        .stats-divider { width: 1px; height: 32px; margin: 0 auto 48px; background: rgba(255,255,255,0.32); }
        .metric-row { display: flex; flex-direction: column; align-items: center; gap: 4px; justify-content: center; margin: 50px 0; }
        .metric-value { font-family: 'Space Mono', monospace; font-size: clamp(24px, 3.5vw, 32px); font-weight: 500; letter-spacing: 0.01em; font-variant-numeric: tabular-nums lining-nums; color: rgba(255,255,255,0.98); line-height: 1.1; }
        .metric-label { font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.7); white-space: nowrap; letter-spacing: 0.02em; text-align: center; }
        .metric-hr { width: 70%; height: 1px; background: rgba(255,255,255,0.22); margin: 28px auto; }
        .stats-cta { display: inline-flex; align-items: center; gap: 12px; padding: 14px 26px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.06); background: #ffffff; color: #111111; box-shadow: 0 6px 24px rgba(0,0,0,0.22); font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: 0.08em; cursor: pointer; user-select: none; transition: transform 0.18s ease, box-shadow 0.25s ease, background 0.25s ease; }
        .stats-cta:hover { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(0,0,0,0.28); }
        .stats-cta .arrow { width: 22px; height: 1px; background: #111; position: relative; }
        .stats-cta .arrow::after { content: ''; position: absolute; right: -2px; top: -3px; width: 7px; height: 7px; border-top: 1px solid #111; border-right: 1px solid #111; transform: rotate(45deg); }

        /* Homepage-only tweaks to ensure top content is visible */
        .home-stats-card .contact-stats-card {
          padding-top: 140px;           /* ensure top title stays visible */
          padding-bottom: 84px;         /* prevent bottom CTA from clipping */
          min-height: 640px;            /* guarantee vertical room regardless of bg scale */
        }
        .home-stats-card .metric-row:first-of-type { margin-top: 12px; }
      `}</style>

      {/* MODERN CENTERED RESPONSIVE CONTAINER */}
      <div style={{
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 20,
        minHeight: '100vh'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '0 24px',
          margin: '0 auto'
        }}>

        {/* Left-aligned Hero Text Section (flush with video left edge) */}
        <section style={{
          ...columnStyle,
          textAlign: 'left',
          marginBottom: '24px',
          paddingTop: '140px'
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: '400',
            lineHeight: '1.1',
            color: 'rgba(255, 255, 255, 0.95)',
            maxWidth: 'min(44rem, 100%)'
          }}>
            <div
              className={`hero-animate ${animationStage >= 1 ? 'animate-in' : ''}`}
              style={{
                marginBottom: '0.5rem',
                opacity: animationStage >= 1 ? 1 : 0,
                transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              I produce <span className="gradient-text">compelling visual content</span>
            </div>
            <div
              className={`hero-animate ${animationStage >= 2 ? 'animate-in' : ''}`}
              style={{
                marginBottom: '0.5rem',
                opacity: animationStage >= 2 ? 1 : 0,
                transform: animationStage >= 2 ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              while building <span className="gradient-text">AI-enhanced workflows</span>
            </div>
            <div
              className={`hero-animate ${animationStage >= 3 ? 'animate-in' : ''}`}
              style={{
                opacity: animationStage >= 3 ? 1 : 0,
                transform: animationStage >= 3 ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              that change how <span className="gradient-text">creative work gets done</span>.
            </div>
          </div>
        </section>

        

        

        {/* Left-aligned Contact Info (flush with video left edge) */}
        <section
          className={`contact-animate ${animationStage >= 4 ? 'animate-in' : ''}`}
          style={{
            ...columnStyle,
            marginTop: '40px',
            marginBottom: '70px',
            opacity: animationStage >= 4 ? 1 : 0,
            transform: animationStage >= 4 ? 'translateY(0)' : 'translateY(15px)'
          }}
        >
          <div
            className="contact-info"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '11px',
              color: '#cccccc',
              fontFamily: "'Space Mono', monospace",
              overflow: 'visible'
            }}
          >
            <MapPin
              size={14}
              strokeWidth={1.5}
              color="rgba(255,255,255,0.6)"
              style={{ marginRight: '8px' }}
            />
            <span className="contact-loc">
              <CharacterHoverText>Grand Rapids, Michigan / World</CharacterHoverText>
            </span>
            <span style={{ opacity: 0.6 }}>|</span>
            <span className="contact-email-text">
              <a href="mailto:colour8k@mac.com" style={{ color: '#cccccc', textDecoration: 'none' }}>
                <CharacterHoverText>colour8k@mac.com</CharacterHoverText>
              </a>
            </span>
          </div>
        </section>

        {/* Featured Video Hero (reference for left edge) */}
        <section className="home-featured-video" style={{
          ...columnStyle,
          marginBottom: '60px'
        }}>
          <div
            className={`video-thumbnail video-animate ${animationStage >= 5 ? 'animate-in' : ''}`}
            style={{
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#111',
              position: 'relative',
              aspectRatio: '16/9',
              opacity: animationStage >= 5 ? 1 : 0,
              transform: animationStage >= 5 ? 'translateY(0) scale(1)' : 'translateY(25px) scale(0.98)'
            }}
            role="button"
            aria-label="Open Featured Video details"
            onClick={() => router.push('/projects/new-balance')}
          >
            {/* Autoplaying local hero loop for New Balance Campaign */}
            {showFeaturedEmbed ? (
              <video
                ref={nbHeroVideoRef}
                src="/Videos/NBQuickLoop.mp4"
                poster="/Videos/NBPOSTER.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: 0,
                  display: 'block',
                  borderRadius: 'inherit'
                }}
              />
            ) : (
              <img
                src="/Videos/NBPOSTER.jpg"
                alt="New Balance Campaign poster"
                width={1920}
                height={1080}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', display: 'block' }}
                loading="eager"
              />
            )}

            {/* Frosted glass Play button (legacy style) */}
            <div
              className="hero-play-button"
              role="button"
              tabIndex={0}
              aria-label={`Play featured video: ${videos[0].title}`}
              onClick={(e) => { e.stopPropagation(); router.push('/projects/new-balance'); }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); router.push('/projects/new-balance'); } }}
            >
              <div className="hero-play-content">
                <div className="hero-play-icon" aria-hidden="true"></div>
                <span className="hero-play-text">PLAY FEATURED VIDEO</span>
              </div>
            </div>

            {/* Video overlay info */}
            <div className="video-overlay-info" style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              padding: '60px 30px 30px', color: 'white'
            }}>
              <div className="overlay-meta" style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', opacity: 0.8, marginBottom: '5px' }}>
                New Balance • 2025
              </div>
              <h2 className="overlay-title" style={{ fontFamily: "'Space Mono', monospace", fontSize: '24px', fontWeight: '400', margin: 0, color: 'white' }}>
                New Balance Campaign
              </h2>
            </div>
          </div>
        </section>

        {/* Mobile-only: render full title + meta below the video for clean readability */}
        <div className="mobile-title animate-fade-in-up" style={{
          ...columnStyle,
          marginTop: '0px',
          marginBottom: '52px',
          display: 'none'
        }}>
          <h2 style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(18px, 5vw, 22px)',
            fontWeight: 400,
            lineHeight: 1.25,
            margin: 0,
            color: 'rgba(255,255,255,0.95)'
          }}>
            {videos[0].title}
          </h2>
          <div className="mobile-meta" style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '12px',
            color: 'rgba(255,255,255,0.8)',
            marginTop: '4px'
          }}>
            New Balance • 2025
          </div>
    </div>
        {/* Placeholder for Centered Sponsor Logos */}
        <section
          className={`animate-fade-in-up`}
          style={{
            ...columnStyle,
            marginBottom: '80px',
            animationDelay: '1.5s',
            animationFillMode: 'both',
            opacity: animationStage >= 6 ? 1 : 0,
            transform: animationStage >= 6 ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 0'
            }}
          >
            {/* Use the SVG as a luminance mask so we get pure transparent background and crisp white logos */}
            <div
              role="img"
              aria-label="Sponsor logo"
              style={{
                width: 'min(95%, 1400px)',
                height: 'clamp(90px, 13.5vw, 200px)',
                backgroundColor: 'rgba(255,255,255,0.96)',
                WebkitMaskImage: 'url(/logos/sponsor.svg)',
                maskImage: 'url(/logos/sponsor.svg)',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.45))',
              }}
            />
          </div>
        </section>

        {/* Full Video Portfolio List - Scrollable */}
        <section id="more-work" className="home-stats" style={{
          ...columnStyle,
          marginBottom: '100px'
        }}>
          <h2 
            className="animate-fade-in-up"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '18px',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '60px',
              textAlign: 'center',
              animationDelay: '1.8s',
              animationFillMode: 'both',
              opacity: animationStage >= 7 ? 1 : 0,
              transform: animationStage >= 7 ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            More Work
          </h2>
          {/* Full video list - each video gets scroll animation */}
          {videos.slice(1).map((video, index) => (
            <React.Fragment key={video.id}>
            <div
              ref={(el) => { videoRefs.current[index + 1] = el; }}
              className={`video-container ${videoStates[index + 1] ? 'visible' : ''}`}
              style={{
                width: '100%',
                marginBottom: '80px',
                cursor: 'pointer',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#111',
                position: 'relative',
                aspectRatio: '16/9',
                filter: videoStates[index + 1] ? 'blur(0px)' : 'blur(4px)',
                opacity: videoStates[index + 1] ? 1 : 0.4,
                transform: videoStates[index + 1] ? 'translateY(0)' : 'translateY(20px)',
                transition: 'filter 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onClick={() => {
                if (video?.route) {
                  handleVideoClick(video);
                } else if (video?.href) {
                  window.open(video.href, '_blank');
                }
              }}
            >
              {video.id === 'reel-2024' ? (
                <ScrollTriggeredShowreel src="/Videos/REELQuickLoop.mp4" poster="/Videos/Reel_Poster.jpg" />
              ) : video.id === 'featured-video' ? (
                <ScrollTriggeredShowreel src="/Videos/DannyQuickLoop.mp4" poster="/Videos/DannyPoster.jpg" />
              ) : (
                (video.id === 'new-balance-campaign') ? (
                  <iframe
                    title="Autoplay video"
                    src={`${video.href}?autoplay=1&muted=1&background=1&loop=1&controls=0&autopause=0&dnt=1`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                      display: 'block',
                      transform: video.id === 'new-balance-campaign' ? 'scale(1.28)' : undefined,
                      transformOrigin: 'center center'
                    }}
                    loading="lazy"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                ) : video.id === 'insta360' ? (
                  <ScrollTriggeredShowreel src="/Videos/FTCLEANQuickLoop.mp4" poster="/Videos/FTCLEANPoster.jpg" />
                ) : video.id === 'commercial-project' ? (
                  <ScrollTriggeredShowreel src="/Videos/CRNQuickLoop.mp4" poster="/Videos/CRNPOSTER.jpg" />
                ) : video.id === 'ai-documentary' ? (
                  <ScrollTriggeredShowreel src="/Videos/NASAQuickLoop.mp4" poster="/Videos/NASAPoster.jpg" />
                ) : (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    width={1920}
                    height={1080}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: 'auto',
                      aspectRatio: '16/9',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                )
              )}
              {/* Special rotating Showreel overlay for showreel item */}
              {video.id === 'reel-2024' && (
                <div className="circular-showreel" onClick={(e) => { e.stopPropagation(); handleVideoClick(video); }}>
                  <div className="circular-showreel-inner">
                    <svg viewBox="0 0 100 100" className="rotating-text" aria-hidden="true">
                      <defs>
                        <path id="textcircle" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" />
                      </defs>
                      <text>
                        <textPath xlinkHref="#textcircle" startOffset="0%">
                          • SHOWREEL • SHOWREEL • SHOWREEL • SHOWREEL • SHOWREEL • SHOWREEL • SHOWREEL • SHOWREEL • SHOWREEL • SHOWREEL •
                        </textPath>
                      </text>
                    </svg>
                    <div className="play-button-circular">
                      <div className="play-icon-circular" />
                    </div>
                  </div>
                </div>
              )}
              {/* Video overlay info (list items) */}
              <div className="list-overlay-info" style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                padding: '60px 40px 40px',
                color: 'white'
              }}>
                <div className="list-overlay-meta" style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '14px',
                  opacity: 0.7,
                  marginBottom: '8px'
                }}>
                  {video.client} • {video.date}
                </div>
                <h3 className="list-overlay-title" style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '28px',
                  fontWeight: '400',
                  margin: 0,
                  color: 'white',
                  marginBottom: '12px'
                }}>
                  {video.title}
                </h3>
                {video.description && (
                  <p className="list-overlay-desc" style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '14px',
                    opacity: 0.8,
                    margin: 0,
                    maxWidth: '600px',
                    lineHeight: '1.4'
                  }}>
                    {video.description}
                  </p>
                )}
              </div>

              {/* Default play button overlay for non-showreel items */}
              {video.id !== 'reel-2024' && (
                <div
                  className="play-button-circular"
                  role="button"
                  aria-label={`Open ${video.title}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (video?.route) {
                      handleVideoClick(video);
                    } else if (video?.href) {
                      window.open(video.href, '_blank');
                    }
                  }}
                >
                  <div className="play-icon-circular" aria-hidden="true" />
                </div>
              )}
            </div>

            {/* Mobile-only simplified below-video text block for all list items */}
            <div className="mobile-list-title animate-fade-in-up" style={{
              width: '100%',
              paddingLeft: 0,
              paddingRight: 0,
              marginTop: '0px',
              marginBottom: '52px',
              display: 'none'
            }}>
              <h3 style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 'clamp(18px, 5vw, 22px)',
                fontWeight: 400,
                lineHeight: 1.25,
                margin: 0,
                color: 'rgba(255,255,255,0.95)'
              }}>
                {video.id === 'reel-2024' ? 'Featured Showreel' :
                 video.id === 'featured-video' ? 'Danny Was Here TV' : video.title}
              </h3>
              <div className="mobile-list-meta" style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '12px',
                color: 'rgba(255,255,255,0.8)',
                marginTop: '4px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {video.id === 'reel-2024' ? 'Featured Showreel • 2025' :
                 video.id === 'featured-video' ? '2025' : `${video.client || ''}${video.client && video.date ? ' • ' : ''}${video.date || ''}`}
              </div>
            </div>
            </React.Fragment>
          ))}
        </section>

        {/* Contact Stats Card (placed directly under Apollo 11 list) */}
        <section className="home-stats-card" style={{
          ...columnStyle,
          marginBottom: '100px'
        }}>
          <div className="contact-info-card contact-stats-card animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', position: 'relative', width: '100%', maxWidth: '100%' }}>
            {/* Background Vimeo video (full opacity) */}
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden', pointerEvents: 'none', borderRadius: 'inherit' }}>
              <video
                src="/Videos/StatQuickLoop.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%', transform: 'translate(-50%, -50%) scale(2.0)', transformOrigin: 'center', border: 0, display: 'block', objectFit: 'cover' }}
              />
            </div>
            <div className="contact-stats-inner">
              <div className="stats-title">HI, I'M JEFF</div>
              <div className="stats-divider" aria-hidden="true" />

              <div className="metric-row">
                <div className="metric-value">15+</div>
                <div className="metric-label">Years Creating</div>
              </div>
              <div className="metric-hr" aria-hidden="true" />

              <div className="metric-row">
                <div className="metric-value">Entertainment</div>
                <div className="metric-label">To Defense</div>
              </div>
              <div className="metric-hr" aria-hidden="true" />

              <div className="metric-row">
                <div className="metric-value">Let's Create</div>
                <div className="metric-label">Something With Impact</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '26px' }}>
                <Link
                  href="/contact"
                  className="frosted-pill-btn"
                  aria-label="Go to contact page"
                >
                  CONTACT
                </Link>
              </div>
            </div>
          </div>
        </section>

</div> {/* Close the inner container */}
</div> {/* Close the flex container */}

{/* Footer with meteors overlay (to match backgrounds page) */}
<div style={{ position: 'relative', background: '#000', overflow: 'hidden', zIndex: 40 }}>
  <footer className="footer" style={{ position: 'relative', zIndex: 41 }}>
    {/* Meteors overlay above black background but below footer content */}
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden="true">
      {showMeteors && <Meteors number={20} />}
    </div>
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
        &copy; 2025 Jeff Kerr. Dig the site? I vibe-coded it. Click <Link href="/how-i-built-this" style={{ textDecoration: 'underline', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>here</Link> to see how.
      </div>
    </div>
  </footer>
</div>
</div>
);
}