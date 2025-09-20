"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MenuWrapper from '../src/components/MenuWrapper';
import { TextShimmer } from '../src/components/motion-primitives/text-shimmer';
import { SafeWrapper } from '../src/components/SafeWrapper';
import { DigitalClock } from '../src/components/motion-primitives/digital-clock';
import '../src/App.css';
import LiquidEtherSimple from '../src/components/LiquidEtherSimple';
import { MapPin } from 'lucide-react';
import FooterStars from '../src/components/FooterStars';
import { Meteors } from '../src/components/ui/meteors';
import WeatherWidget from '../src/components/WeatherWidget';

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

// Canvas-based film grain noise overlay (optimized)
const Noise = ({
  patternSize = 80,
  patternScaleX = 1,
  patternScaleY = 1,
  // If provided, treated as frames; we also support patternRefreshMs for better control
  patternRefreshInterval = 3,
  patternAlpha = 16,
  patternRefreshMs,
}: {
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number; // legacy: frames between refresh
  patternAlpha?: number;           // 0-255 alpha per grain pixel
  patternRefreshMs?: number;       // preferred: ms between refresh (e.g., 160)
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    console.debug('[Noise] Canvas grain initialized');

    let animationId = 0;
    let logicalW = 0;
    let logicalH = 0;
    let last = performance.now();
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    const refreshMs = Math.max(80, patternRefreshMs ?? Math.round(Math.max(1, patternRefreshInterval) * 16.6));

    // Prepare small offscreen pattern canvas for tiling
    const patternCanvas = document.createElement('canvas');
    const patternCtx = patternCanvas.getContext('2d');
    if (!patternCtx) return;
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;

    const genPattern = () => {
      const imageData = patternCtx.createImageData(patternSize, patternSize);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v; // R
        data[i + 1] = v; // G
        data[i + 2] = v; // B
        data[i + 3] = Math.random() * patternAlpha; // A
      }
      patternCtx.putImageData(imageData, 0, 0);
    };

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      logicalW = Math.max(1, window.innerWidth);
      logicalH = Math.max(1, window.innerHeight);
      canvas.width = Math.floor(logicalW * dpr);
      canvas.height = Math.floor(logicalH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      // create and cache pattern each refresh
      const pattern = ctx.createPattern(patternCanvas, 'repeat');
      if (!pattern) return;
      ctx.clearRect(0, 0, logicalW, logicalH);
      ctx.fillStyle = pattern;
      ctx.resetTransform();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      // Fill in CSS pixels space, transform already set by resize for DPR
      ctx.fillRect(0, 0, logicalW, logicalH);
    };

    const loop = (now: number) => {
      const hidden = document.hidden;
      const interval = prefersReduced ? Math.max(300, refreshMs * 4) : refreshMs;
      if (!hidden && now - last >= interval) {
        genPattern();
        render();
        last = now;
      }
      animationId = requestAnimationFrame(loop);
    };

    resize();
    genPattern();
    render();
    animationId = requestAnimationFrame(loop);

    window.addEventListener('resize', resize);
    const onVis = () => { /* handled per-frame via document.hidden */ };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha, patternRefreshMs]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000,
        mixBlendMode: 'overlay',
      }}
    />
  );
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const router = useRouter();
  // Defer heavy embeds (like YouTube) until after first paint to avoid
  // an initial reflow that can look like a flicker in dev
  const [showFeaturedEmbed, setShowFeaturedEmbed] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Staggered animation sequence for centered layout
  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStage(1), 900),   // Hero line 1
      setTimeout(() => setAnimationStage(2), 1100),  // Hero line 2
      setTimeout(() => setAnimationStage(3), 1300),  // Hero line 3
      setTimeout(() => setAnimationStage(4), 1500),  // Contact info
      setTimeout(() => setAnimationStage(5), 1700),  // Featured video
      setTimeout(() => setAnimationStage(6), 1900),  // Sponsor placeholder
      setTimeout(() => setAnimationStage(7), 2100),  // Additional videos grid
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Enable Featured iframe shortly after first paint to keep initial render
  // visually stable (prevents appear-disappear when the iframe initializes)
  useEffect(() => {
    let id = window.setTimeout(() => setShowFeaturedEmbed(true), 350);
    return () => window.clearTimeout(id);
  }, []);

  // Expanded videos array with 5 videos and internal routes
  const videos = [
    {
      id: 'featured-video',
      title: 'Featured Video',
      client: 'Jeff Kerr',
      date: '2025',
      thumbnail: 'https://img.youtube.com/vi/I6U5zDpzLq8/hqdefault.jpg',
      href: 'https://www.youtube.com/watch?v=I6U5zDpzLq8',
      route: '/projects/featured',
      description: 'Our featured piece. Explore the full breakdown, credits, and context on the Featured page.'
    },
    {
      id: 'reel-2024',
      title: 'Featured Showreel',
      client: 'Jeff Kerr',
      date: '2025',
      thumbnail: 'https://vumbnail.com/1029802990.jpg',
      href: 'https://player.vimeo.com/video/1029802990',
      route: '/projects/showreel-2025',
      description: 'A collection of clips from various projects over the years, blending traditional filmmaking with AI-generated content to create stunning visuals.'
    },
    {
      id: 'insta360',
      title: 'Insta360',
      client: 'Insta360',
      date: '2023',
      thumbnail: 'https://vumbnail.com/641527142.jpg',
      href: 'https://player.vimeo.com/video/641527142',
      route: '/projects/insta360',
      description: 'Capturing the world in 360 degrees with Insta360 technology, showcasing immersive filmmaking techniques.'
    },
    {
      id: 'commercial-project',
      title: 'Commercial Project',
      client: 'Various',
      date: '2023',
      thumbnail: 'https://vumbnail.com/641502508.jpg',
      href: 'https://player.vimeo.com/video/641502508',
      route: '/projects/commercial',
      description: 'High-end commercial work demonstrating expertise in brand storytelling and visual excellence.'
    },
    {
      id: 'new-balance-campaign',
      title: 'New Balance Campaign',
      client: 'New Balance',
      date: '2024',
      thumbnail: 'https://vumbnail.com/785643210.jpg',
      href: 'https://player.vimeo.com/video/785643210',
      route: '/projects/new-balance',
      description: 'Dynamic athletic storytelling that captures the essence of movement and performance through innovative cinematography.'
    },
    {
      id: 'ai-documentary',
      title: 'AI & Future of Work',
      client: 'Tech Forward',
      date: '2024',
      thumbnail: 'https://vumbnail.com/892847362.jpg',
      href: 'https://player.vimeo.com/video/892847362',
      route: '/projects/ai-documentary',
      description: 'Exploring the intersection of artificial intelligence and creative workflows in modern media production.'
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
      {/* Animated Liquid Ether Background (fixed container) */}
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
            '#0a0a0a',      // Deep black
            '#1a0b2e',      // Dark purple
            '#2d1b4e',      // Medium purple
            '#3d2a5f',      // Muted purple (replaces #5227FF)
            '#1a4d72',      // Darker, muted blue 
            '#6b46c1',      // More subdued light purple (replaces #8b5cf6)
            '#c084fc'       // Softer pink (replaces #FF9FFC)
          ]}
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
      {/* Canvas-based Film Grain Overlay (subtle defaults; optimized) */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 25,
          mixBlendMode: 'overlay',
          opacity: 0.06,
        }}
      >
        <Noise
          patternSize={80}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshMs={160}
          patternRefreshInterval={10}
          patternAlpha={16}
        />
      </div>

      {/* Header */}
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
          padding: 2px 6px;
          overflow: hidden;
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
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '11px',
              color: '#cccccc',
              fontFamily: "'Space Mono', monospace"
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} strokeWidth={1.5} color="rgba(255,255,255,0.6)" />
              <CharacterHoverText>Grand Rapids, Michigan / World</CharacterHoverText>
            </span>
            <span style={{ opacity: 0.6 }}>|</span>
            <span>
              <a href="mailto:colour8k@mac.com" style={{ color: '#cccccc', textDecoration: 'none' }}>
                <CharacterHoverText>colour8k@mac.com</CharacterHoverText>
              </a>
            </span>
          </div>
        </section>

        {/* Featured Video Hero (reference for left edge) */}
        <section style={{
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
            onClick={() => router.push('/projects/featured')}
          >
            {/* Defer the autoplaying YouTube iframe slightly to avoid initial reflow */}
            {showFeaturedEmbed ? (
              <iframe
                title="Featured video"
                src={`https://www.youtube.com/embed/I6U5zDpzLq8?autoplay=1&mute=1&controls=0&loop=1&playlist=I6U5zDpzLq8&modestbranding=1&rel=0&playsinline=1`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: '0',
                  display: 'block'
                }}
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src="https://img.youtube.com/vi/I6U5zDpzLq8/hqdefault.jpg"
                alt="Featured video preview"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
                decoding="async"
                loading="eager"
              />
            )}

            {/* Frosted glass Play button (legacy style) */}
            <div
              className="hero-play-button"
              role="button"
              tabIndex={0}
              aria-label={`Play featured video: ${videos[0].title}`}
              onClick={(e) => { e.stopPropagation(); router.push('/projects/featured'); }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); router.push('/projects/featured'); } }}
            >
              <div className="hero-play-content">
                <div className="hero-play-icon" aria-hidden="true"></div>
                <span className="hero-play-text">PLAY FEATURED VIDEO</span>
              </div>
            </div>

            {/* Video overlay info */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              padding: '60px 30px 30px', color: 'white'
            }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', opacity: 0.8, marginBottom: '5px' }}>
                Jeff Kerr • 2025
              </div>
              <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: '24px', fontWeight: '400', margin: 0, color: 'white' }}>
                Featured Video
              </h2>
            </div>
          </div>
        </section>

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
          <div style={{
            padding: '40px 0', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.2)',
            fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'rgba(255,255,255,0.5)', textAlign: 'center'
          }}>
            Sponsor Logos Will Go Here<br/>
            <span style={{ fontSize: '12px', opacity: 0.7 }}>(Centered alignment matching video width)</span>
          </div>
        </section>

        {/* Full Video Portfolio List - Scrollable */}
        <section style={{
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
            <div
              key={video.id}
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
                <iframe
                  title="Showreel autoplay"
                  src={`https://player.vimeo.com/video/1029802990?autoplay=1&muted=1&background=1&loop=1&controls=0&autopause=0&dnt=1`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                    display: 'block'
                  }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
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
              {/* Video overlay info */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                padding: '60px 40px 40px',
                color: 'white'
              }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '14px',
                  opacity: 0.7,
                  marginBottom: '8px'
                }}>
                  {video.client} • {video.date}
                </div>
                <h3 style={{
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
                  <p style={{
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
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: '#000',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                  ▶
                </div>
              )}
            </div>
          ))}
        </section>

        </div> {/* Close the inner container */}
      </div> {/* Close the flex container */}

      {/* Footer with black background and meteors overlay (to match backgrounds page) */}
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
  );
}
