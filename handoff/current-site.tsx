'use client';

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

// Snapshot of the current homepage structure (for handoff/reference only)
// Mirrors app/page.tsx layout and organization at the time of creation

const Liquid: React.ComponentType<any> = LiquidEtherSimple as unknown as React.ComponentType<any>;

export default function CurrentSiteSnapshot() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

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
    }
  ];

  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [videoStates, setVideoStates] = useState<boolean[]>(new Array(videos.length).fill(false));

  const handleVideoClick = (video: { route: string }) => {
    if (video?.route) router.push(video.route);
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    videoRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVideoStates(prev => {
            const next = [...prev];
            next[index] = entry.isIntersecting;
            return next;
          });
        },
        { threshold: 0.2, rootMargin: '50px' }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <div className="App">
      {/* Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, overflow: 'hidden', background: '#0a0a0a' }}>
        <Liquid
          colors={['#0a0a0a', '#1a0b2e', '#2d1b4e', '#3d2a5f', '#1a4d72', '#6b46c1', '#c084fc']}
          style={{ opacity: 0.85, width: '100%', height: '100%', filter: 'brightness(0.8) contrast(1.6) saturate(1.3)' }}
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
        <div className="header-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Link href="/" className="logo">
            <TextShimmer duration={3} spread={1.5}>
              <span className="logo-k">k</span>err
            </TextShimmer>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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

      {/* Styles used by home page */}
      <style jsx>{`
        .gradient-text { background: linear-gradient(135deg, #00d4ff 0%, #8b5cf6 50%, #FF9FFC 100%); background-size: 300% 300%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: continuousFlow 20s ease-in-out infinite; }
        @keyframes continuousFlow { 0%,100%{background-position:0% 50%;} 33%{background-position:100% 50%;} 66%{background-position:200% 50%;} }
        .contact-info { position: relative; display: inline-flex; align-items: center; transition: opacity .3s ease; cursor: pointer; border-radius: 6px; padding: 2px 6px; overflow: hidden; }
        .contact-info::after { content:''; position:absolute; top:0; bottom:0; width:140%; left:-60%; background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0) 100%); opacity:0; pointer-events:none; transform: translateX(-20%); }
        .contact-info:hover::after { animation: shimmerSweep 900ms ease-out; }
        @keyframes shimmerSweep { 0%{opacity:0; transform:translateX(-40%);} 20%{opacity:.25;} 80%{opacity:.12;} 100%{opacity:0; transform:translateX(60%);} }
        .video-container { transition: all .5s cubic-bezier(.4,0,.2,1); filter: blur(4px); opacity:.4; transform: translateY(20px); }
        .video-container.visible { filter: blur(0); opacity:1; transform: translateY(0); }
        .video-thumbnail { border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,.3); cursor: pointer; }
      `}</style>

      {/* Centered container */}
      <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 20, minHeight: '100vh' }}>
        <div style={{ width: '100%', maxWidth: '1200px', padding: '0 60px', margin: '0 auto' }}>

          {/* Hero copy */}
          <section style={{ paddingTop: '140px', marginBottom: '60px' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, lineHeight: 1.1, color: 'rgba(255,255,255,0.95)', marginBottom: '40px', maxWidth: '750px' }}>
              <div style={{ marginBottom: '.5rem', whiteSpace: 'nowrap' }}>I produce <span className="gradient-text">compelling visual content</span></div>
              <div style={{ marginBottom: '.5rem', whiteSpace: 'nowrap' }}>while building <span className="gradient-text">AI-enhanced workflows</span></div>
              <div style={{ whiteSpace: 'nowrap' }}>that change how <span className="gradient-text">creative work gets done</span>.</div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontSize: '11px', color: '#cccccc', opacity: .6, fontFamily: "'Space Mono', monospace" }}>
              <div className="contact-info" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <MapPin size={14} strokeWidth={1.5} color="rgba(255,255,255,0.6)" />
                <span>Grand Rapids, Michigan / World</span>
              </div>
              <div className="contact-info">
                <a href="mailto:colour8k@mac.com" style={{ color: '#cccccc', textDecoration: 'none' }}>colour8k@mac.com</a>
              </div>
            </div>
          </section>

          {/* Hero video */}
          <section style={{ marginBottom: '24px' }}>
            <div className="video-thumbnail" style={{ maxWidth: '750px', width: '100%', aspectRatio: '16/9', background: '#000', cursor: 'pointer', position: 'relative' }} onClick={() => handleVideoClick(videos[0])}>
              <img src={videos[0].thumbnail} alt={videos[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="play-button-simple" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#fff', cursor: 'pointer', transition: 'all .3s ease' }} onClick={(e) => { e.stopPropagation(); handleVideoClick(videos[0]); }}>
                ▶ PLAY
              </div>
            </div>
          </section>

          {/* Metadata under hero */}
          <section style={{ marginBottom: '80px' }}>
            <div className="metadata-section" style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 300, color: '#fff', opacity: .8, maxWidth: '750px' }}>
              <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,.4) 0%, rgba(255,255,255,.2) 50%, transparent 100%)' }} />
              <div>Gemini IPO Investigation — YouTube Video</div>
              <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,.4) 0%, rgba(255,255,255,.2) 50%, transparent 100%)' }} />
              <div>Featured Video</div>
              <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,.4) 0%, rgba(255,255,255,.2) 50%, transparent 100%)' }} />
              <div>2025</div>
            </div>
          </section>

          {/* Brand Logos */}
          <section style={{ marginBottom: '140px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <img src="https://picsum.photos/120/40?random=1" alt="Canon" style={{ height: 35, opacity: .3, filter: 'brightness(0) invert(1)' }} />
              <img src="https://picsum.photos/120/40?random=2" alt="YouTube" style={{ height: 35, opacity: .3, filter: 'brightness(0) invert(1)' }} />
              <img src="https://picsum.photos/120/40?random=3" alt="DJI" style={{ height: 35, opacity: .3, filter: 'brightness(0) invert(1)' }} />
              <img src="https://picsum.photos/120/40?random=4" alt="Hyundai" style={{ height: 35, opacity: .3, filter: 'brightness(0) invert(1)' }} />
              <img src="https://picsum.photos/120/40?random=5" alt="MusicBed" style={{ height: 35, opacity: .3, filter: 'brightness(0) invert(1)' }} />
            </div>
          </section>

          {/* Additional videos (structure retained for context) */}
          {videos.slice(1, 4).map((video, index) => (
            <React.Fragment key={video.id}>
              <section style={{ marginBottom: '40px' }}>
                <div className={`video-container ${videoStates[index + 1] ? 'visible' : ''}`} onClick={() => handleVideoClick(video)} ref={(el) => { videoRefs.current[index + 1] = el; }} style={{ cursor: 'pointer', position: 'relative' }}>
                  <div className="video-thumbnail" style={{ maxWidth: '750px', width: '100%', aspectRatio: '16/9', background: '#000' }}>
                    <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              </section>
              <section style={{ marginBottom: '80px' }}>
                <div className="metadata-section" style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 300, color: '#fff', opacity: .8, maxWidth: '750px' }}>
                  <div>{video.description}</div>
                  <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,.4) 0%, rgba(255,255,255,.2) 50%, transparent 100%)' }} />
                  <div>{video.client}</div>
                  <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,.4) 0%, rgba(255,255,255,.2) 50%, transparent 100%)' }} />
                  <div>{video.date}</div>
                </div>
              </section>
            </React.Fragment>
          ))}

        </div>
      </div>

      {/* Footer with meteors overlay */}
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
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
