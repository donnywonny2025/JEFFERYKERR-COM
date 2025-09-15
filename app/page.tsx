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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const router = useRouter();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Page load animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setIsLoaded(true), 800); // Wait for background
    const timer2 = setTimeout(() => setAnimationStage(1), 1000); // Hero text
    const timer3 = setTimeout(() => setAnimationStage(2), 1200); // Contact info
    const timer4 = setTimeout(() => setAnimationStage(3), 1400); // Video
    const timer5 = setTimeout(() => setAnimationStage(4), 1600); // Metadata
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
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
        width: '100vw',
        height: '100vh',
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
          transition: none;  /* Remove transitions */
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);  /* Keep basic shadow */
          cursor: pointer;
        }
        
        .video-thumbnail:hover {
          /* Remove all hover effects - no scaling, no glow */
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
        }

        .play-featured-btn:hover {
          background: rgba(255,255,255,0.08);
          transform: translateY(-1px);
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
          opacity: 0.6 !important;
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
          padding: '0 60px',
          margin: '0 auto'
        }}>

        {/* Enhanced Hero Text Section */}
        <section style={{ 
          paddingTop: '140px',
          marginBottom: '60px'
        }}>
          <div 
            className={`hero-animate ${animationStage >= 1 ? 'animate-in' : ''}`}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: '400',
              lineHeight: '1.1',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '40px',
              maxWidth: '750px'
            }}>
            <div style={{ marginBottom: '0.5rem', whiteSpace: 'nowrap' }}>
              I produce <span className="gradient-text">compelling visual content</span>
            </div>
            <div style={{ marginBottom: '0.5rem', whiteSpace: 'nowrap' }}>
              while building <span className="gradient-text">AI-enhanced workflows</span>
            </div>
            <div style={{ whiteSpace: 'nowrap' }}>
              that change how <span className="gradient-text">creative work gets done</span>.
            </div>
          </div>

          <div 
            className={`contact-animate ${animationStage >= 2 ? 'animate-in' : ''}`}
            style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'center',
              fontSize: '11px',
              color: '#cccccc',
              fontFamily: "'Space Mono', monospace"
            }}>
            <div className="contact-info" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={14} strokeWidth={1.5} color="rgba(255,255,255,0.6)" />
              <CharacterHoverText>Grand Rapids, Michigan / World</CharacterHoverText>
            </div>
            <div className="contact-info">
              <a href="mailto:colour8k@mac.com" style={{ color: '#cccccc', textDecoration: 'none' }}>
                <CharacterHoverText>colour8k@mac.com</CharacterHoverText>
              </a>
            </div>
          </div>
        </section>

        {/* Hero Video */}
        <section style={{ marginBottom: '24px' }}>
          <div 
            className={`video-thumbnail video-animate ${animationStage >= 3 ? 'animate-in' : ''}`}
            style={{
              maxWidth: '750px',
              width: '100%',
              aspectRatio: '16/9',
              background: '#000',
              cursor: 'pointer',
              position: 'relative'
            }} 
            onClick={() => handleVideoClick(videos[0])}
          >
            <img
              src={videos[0].thumbnail}
              alt={videos[0].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Centered Play button for Featured Video */}
            <div
              className="play-button-simple"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '12px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '12px',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleVideoClick(videos[0]);
              }}
              role="button"
              aria-label="Play Featured Video"
            >
              ▶ PLAY
            </div>
          </div>
        </section>

        {/* Featured metadata directly under the hero video */}
        <section style={{ marginBottom: '80px' }}>
          <div 
            className={`metadata-section metadata-animate ${animationStage >= 4 ? 'animate-in' : ''}`}
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
            }}>
            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)' }}></div>
            <div>Gemini IPO Investigation — YouTube Video</div>
            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)' }}></div>
            <div>Featured Video</div>
            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)' }}></div>
            <div>2025</div>
          </div>
        </section>

        {/* Brand Logos moved below featured metadata */}
        <section style={{ marginBottom: '140px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <img src="https://picsum.photos/120/40?random=1" alt="Canon" style={{ height: '35px', opacity: 0.3, filter: 'brightness(0) invert(1)' }} />
            <img src="https://picsum.photos/120/40?random=2" alt="YouTube" style={{ height: '35px', opacity: 0.3, filter: 'brightness(0) invert(1)' }} />
            <img src="https://picsum.photos/120/40?random=3" alt="DJI" style={{ height: '35px', opacity: 0.3, filter: 'brightness(0) invert(1)' }} />
            <img src="https://picsum.photos/120/40?random=4" alt="Hyundai" style={{ height: '35px', opacity: 0.3, filter: 'brightness(0) invert(1)' }} />
            <img src="https://picsum.photos/120/40?random=5" alt="MusicBed" style={{ height: '35px', opacity: 0.3, filter: 'brightness(0) invert(1)' }} />
          </div>
        </section>

        {/* Additional 4 Videos with scroll animations */}
        {videos.slice(1, 5).map((video, index) => (
          <React.Fragment key={video.id}>
            <section style={{ marginBottom: '40px' }}>
              <div 
                className={`video-container ${videoStates[index + 1] ? 'visible' : ''}`}
                onClick={() => handleVideoClick(video)} 
                ref={(el) => { videoRefs.current[index + 1] = el; }} 
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <div className="video-thumbnail" style={{ 
                  maxWidth: '750px', 
                  width: '100%', 
                  aspectRatio: '16/9', 
                  background: '#000'
                }}>
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  {/* Add circular SHOWREEL button to the first video (showreel) */}
                  {index === 0 && (
                    <div
                      className="circular-showreel"
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVideoClick(video);
                      }}
                    >
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
                  )}
                </div>
              </div>
            </section>

            <section style={{ marginBottom: '80px' }}>
              <div className="metadata-section" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '15px', 
                fontFamily: "'Space Mono', monospace", 
                fontSize: '14px', 
                fontWeight: '300', 
                color: '#ffffff', 
                opacity: 0.8, 
                maxWidth: '750px' 
              }}>
                <div>{video.description}</div>
                <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)' }}></div>
                <div>{video.client}</div>
                <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)' }}></div>
                <div>{video.date}</div>
              </div>
            </section>
          </React.Fragment>
        ))}

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