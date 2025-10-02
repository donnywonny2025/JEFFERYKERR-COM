"use client";

import React, { useEffect, useState } from 'react';
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

const Liquid: React.ComponentType<any> = LiquidEtherSimple as unknown as React.ComponentType<any>;

export default function HowIBuiltThisPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStage(1), 300),
      setTimeout(() => setAnimationStage(2), 600),
      setTimeout(() => setAnimationStage(3), 900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

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

          <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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

      {/* Local styles */}
      <style jsx global>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
      `}</style>

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 20, minHeight: '80vh', padding: '135px 24px 100px' }}>
        <div style={{ width: '100%', maxWidth: '1050px', padding: '0 60px', margin: '0 auto' }}>
          
          {/* Page title with overline */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '20px' }}>How I Built This</div>
            <div style={{ width: '1px', height: '28px', margin: '0 auto 28px', background: 'rgba(255,255,255,0.24)' }} />
          </div>
          
          <h1 className="animate-fade-in-up" style={{ fontFamily: "'Space Mono', monospace", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: 'rgba(255,255,255,0.95)', marginBottom: '20px', animationDelay: '0.2s', animationFillMode: 'forwards', textAlign: 'center', lineHeight: '1.2' }}>
            How I Vibe-Coded This Site
          </h1>

          <p className="animate-fade-in-up" style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '60px', animationDelay: '0.3s', animationFillMode: 'forwards', textAlign: 'center' }}>
            No backend. No hosting fees. Just code, AI, and a domain.
          </p>

          {/* Content container */}
          <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
            
            {/* Intro */}
            <div style={{ marginBottom: '70px' }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '18px', lineHeight: '1.6', marginBottom: '25px', color: 'rgba(255,255,255,0.9)' }}>
                I built this site through what I call <strong>"vibe coding"</strong>—using AI as a creative partner, not a replacement.
              </p>
              
              <div style={{
                background: 'rgba(139, 92, 246, 0.08)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '12px',
                padding: '25px 30px',
                marginBottom: '30px'
              }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                  <strong>Here's what that actually means:</strong> Claude handled strategy and problem-solving. Windsurf handled code generation. I handled everything else—the vision, the iteration, the debugging, the infrastructure, and every decision about what worked and what didn't.
                </p>
              </div>

              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)' }}>
                This isn't about AI replacing developers. It's about amplifying what's possible when you combine human creativity with AI capabilities.
              </p>
            </div>

            {/* Visual Workflow Section */}
            <div style={{ marginBottom: '80px' }}>
              <h2 style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '24px',
                fontWeight: '400',
                marginBottom: '30px',
                color: 'rgba(255,255,255,0.95)',
                textAlign: 'center'
              }}>
                The Workflow
              </h2>
              
              <div className="workflow-step-grid" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '20px 25px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '24px',
                    fontWeight: '600',
                    color: 'rgba(139, 92, 246, 0.8)',
                    minWidth: '30px'
                  }}>1</div>
                  <div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', fontWeight: '500', color: 'rgba(255,255,255,0.95)', marginBottom: '4px' }}>
                      Problem or Idea
                    </div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                      I define what I want to build
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '20px 25px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '24px',
                    fontWeight: '600',
                    color: 'rgba(139, 92, 246, 0.8)',
                    minWidth: '30px'
                  }}>2</div>
                  <div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', fontWeight: '500', color: 'rgba(255,255,255,0.95)', marginBottom: '4px' }}>
                      Claude Strategy
                    </div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                      Planning, layout concepts, problem-solving
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '20px 25px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '24px',
                    fontWeight: '600',
                    color: 'rgba(139, 92, 246, 0.8)',
                    minWidth: '30px'
                  }}>3</div>
                  <div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', fontWeight: '500', color: 'rgba(255,255,255,0.95)', marginBottom: '4px' }}>
                      Windsurf Implementation
                    </div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                      Code generation from descriptions
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '20px 25px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '24px',
                    fontWeight: '600',
                    color: 'rgba(139, 92, 246, 0.8)',
                    minWidth: '30px'
                  }}>4</div>
                  <div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', fontWeight: '500', color: 'rgba(255,255,255,0.95)', marginBottom: '4px' }}>
                      Debug & Refine
                    </div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                      I test, fix bugs, adjust styling, iterate
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '20px 25px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '24px',
                    fontWeight: '600',
                    color: 'rgba(139, 92, 246, 0.8)',
                    minWidth: '30px'
                  }}>5</div>
                  <div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', fontWeight: '500', color: 'rgba(255,255,255,0.95)', marginBottom: '4px' }}>
                      Deploy
                    </div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                      Push to GitHub, Netlify auto-deploys
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Screenshot 1: Windsurf */}
            <div className="animate-fade-in-up" style={{ marginBottom: '70px', animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: '24px', fontWeight: '400', marginBottom: '20px', color: 'rgba(255,255,255,0.95)' }}>
                The Tool: Windsurf
              </h2>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', lineHeight: '1.8', marginBottom: '25px', color: 'rgba(255,255,255,0.85)' }}>
                Windsurf is an AI code editor. I describe what I want in plain language, and it writes the code. Need changes? Just tell it. It's like having a developer on call 24/7.
              </p>
              <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                <img 
                  src="/how-i-built-this/windsurf-interface.png" 
                  alt="Windsurf interface showing code generation"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '12px', textAlign: 'center' }}>
                Windsurf generating React components from natural language prompts
              </p>
            </div>

            {/* The AI Team Section */}
            <div style={{ marginBottom: '70px' }}>
              <h2 style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '24px',
                fontWeight: '400',
                marginBottom: '20px',
                color: 'rgba(255,255,255,0.95)'
              }}>
                The AI Team: Claude + Windsurf
              </h2>
              
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', lineHeight: '1.8', marginBottom: '25px', color: 'rgba(255,255,255,0.85)' }}>
                Vibe coding isn't one AI doing everything. I used two different tools:
              </p>
              
              <div className="ai-team-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '25px'
                }}>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '18px', color: 'rgba(255,255,255,0.95)', marginBottom: '12px', fontWeight: '500' }}>
                    Claude
                  </h3>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
                    Strategy & Planning
                  </p>
                  <ul style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', lineHeight: '1.7', color: 'rgba(255,255,255,0.75)', paddingLeft: '20px', margin: 0 }}>
                    <li>Layout concepts</li>
                    <li>Content strategy</li>
                    <li>UX decisions</li>
                    <li>Problem-solving</li>
                  </ul>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '25px'
                }}>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '18px', color: 'rgba(255,255,255,0.95)', marginBottom: '12px', fontWeight: '500' }}>
                    Windsurf
                  </h3>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
                    Code Implementation
                  </p>
                  <ul style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', lineHeight: '1.7', color: 'rgba(255,255,255,0.75)', paddingLeft: '20px', margin: 0 }}>
                    <li>React components</li>
                    <li>Styling & animations</li>
                    <li>Code generation</li>
                    <li>File structure</li>
                  </ul>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '40px',
                padding: '40px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
                flexWrap: 'wrap'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px'
                  }}>
                    <img 
                      src="/logos/Claude_AI_symbol.svg.png" 
                      alt="Anthropic Claude"
                      style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                    />
                  </div>
                  <p style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>Claude AI</p>
                </div>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '24px',
                  color: 'rgba(255,255,255,0.3)'
                }}>+</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px'
                  }}>
                    <img 
                      src="/logos/windsurf-black-symbol.svg" 
                      alt="Windsurf"
                      style={{ width: '48px', height: '48px', objectFit: 'contain', filter: 'invert(1) brightness(1.2)' }}
                    />
                  </div>
                  <p style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>Windsurf</p>
                </div>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '24px',
                  color: 'rgba(255,255,255,0.3)'
                }}>=</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px'
                  }}>
                    <img 
                      src="/favicon-32x32.png" 
                      alt="Kerr.com"
                      style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                    />
                  </div>
                  <p style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>This Site</p>
                </div>
              </div>
            </div>

            {/* The Stack */}
            <div className="animate-fade-in-up" style={{ marginBottom: '70px', animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: '24px', fontWeight: '400', marginBottom: '20px', color: 'rgba(255,255,255,0.95)' }}>
                The Stack
              </h2>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '30px', marginBottom: '25px' }}>
                <div style={{ marginBottom: '25px' }}>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>Windsurf</h3>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '15px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)' }}>
                    AI code editor that writes code from natural language prompts
                  </p>
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>GitHub</h3>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '15px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)' }}>
                    Version control and hosting for the code repository
                  </p>
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>Netlify</h3>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '15px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)' }}>
                    Automatic deployment and hosting (completely free for static sites)
                  </p>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>Namecheap</h3>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '15px', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)' }}>
                    Domain registration (~$12/year)
                  </p>
                </div>
              </div>
            </div>

            {/* Screenshot 2: GitHub */}
            <div className="animate-fade-in-up" style={{ marginBottom: '70px', animationDelay: '0.7s', animationFillMode: 'forwards' }}>
              <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: '24px', fontWeight: '400', marginBottom: '20px', color: 'rgba(255,255,255,0.95)' }}>
                Version Control: GitHub
              </h2>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', lineHeight: '1.8', marginBottom: '25px', color: 'rgba(255,255,255,0.85)' }}>
                Every change Windsurf makes gets committed to GitHub. This means I have full version history, can roll back changes, and everything is backed up automatically.
              </p>
              <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                <img 
                  src="/how-i-built-this/github-repo.png" 
                  alt="GitHub repository structure"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '12px', textAlign: 'center' }}>
                The site's file structure on GitHub
              </p>
            </div>

            {/* Screenshot 3: Netlify */}
            <div className="animate-fade-in-up" style={{ marginBottom: '70px', animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: '24px', fontWeight: '400', marginBottom: '20px', color: 'rgba(255,255,255,0.95)' }}>
                Deployment: Netlify
              </h2>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', lineHeight: '1.8', marginBottom: '25px', color: 'rgba(255,255,255,0.85)' }}>
                Connected to GitHub, Netlify automatically deploys every change. Push code → site updates in minutes. No servers to manage, no hosting bills.
              </p>
              <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                <img 
                  src="/how-i-built-this/netlify-deploys.png" 
                  alt="Netlify deployment dashboard"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '12px', textAlign: 'center' }}>
                Automatic deployments from GitHub
              </p>
            </div>

            {/* Configuration Reality Section */}
            <div style={{ marginBottom: '70px' }}>
              <h2 style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '24px',
                fontWeight: '400',
                marginBottom: '20px',
                color: 'rgba(255,255,255,0.95)'
              }}>
                The Configuration Work Nobody Talks About
              </h2>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', lineHeight: '1.8', marginBottom: '25px', color: 'rgba(255,255,255,0.85)' }}>
                AI wrote the code, but I still had to configure the infrastructure. This isn't magic—there are technical steps involved:
              </p>

              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '30px',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '18px', color: 'rgba(255,255,255,0.95)', marginBottom: '15px', fontWeight: '500' }}>
                  Namecheap DNS Setup
                </h3>
                <ul style={{ fontFamily: "'Space Mono', monospace", fontSize: '15px', lineHeight: '1.8', color: 'rgba(255,255,255,0.75)', paddingLeft: '24px' }}>
                  <li>Point domain nameservers to Netlify's servers</li>
                  <li>Configure SSL certificate for HTTPS</li>
                  <li>Set up domain forwarding (www vs non-www)</li>
                </ul>

                <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '18px', color: 'rgba(255,255,255,0.95)', marginBottom: '15px', marginTop: '25px', fontWeight: '500' }}>
                  Netlify Build Configuration
                </h3>
                <ul style={{ fontFamily: "'Space Mono', monospace", fontSize: '15px', lineHeight: '1.8', color: 'rgba(255,255,255,0.75)', paddingLeft: '24px' }}>
                  <li>Connect GitHub repository</li>
                  <li>Configure build command and publish directory</li>
                  <li>Set up continuous deployment triggers</li>
                  <li>Configure environment variables</li>
                </ul>

                <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '18px', color: 'rgba(255,255,255,0.95)', marginBottom: '15px', marginTop: '25px', fontWeight: '500' }}>
                  GitHub Setup
                </h3>
                <ul style={{ fontFamily: "'Space Mono', monospace", fontSize: '15px', lineHeight: '1.8', color: 'rgba(255,255,255,0.75)', paddingLeft: '24px' }}>
                  <li>Initialize repository and push initial code</li>
                  <li>Set up proper .gitignore for Next.js</li>
                  <li>Configure deployment keys for Netlify access</li>
                </ul>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '25px'
              }}>
                <div style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  background: 'rgba(0,0,0,0.3)'
                }}>
                  <img 
                    src="/how-i-built-this/netlify-settings.png" 
                    alt="Netlify build settings"
                    style={{ 
                      width: '100%', 
                      height: 'auto',
                      display: 'block',
                      objectFit: 'contain'
                    }}
                  />
                </div>
                <div style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  background: 'rgba(0,0,0,0.3)'
                }}>
                  <img 
                    src="/how-i-built-this/dns-settings.png" 
                    alt="DNS configuration"
                    style={{ 
                      width: '100%', 
                      height: 'auto',
                      display: 'block',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </div>
              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                Netlify build settings and DNS configuration
              </p>
            </div>

            {/* The Process */}
            <div className="animate-fade-in-up" style={{ marginBottom: '70px', animationDelay: '0.9s', animationFillMode: 'forwards' }}>
              <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: '24px', fontWeight: '400', marginBottom: '20px', color: 'rgba(255,255,255,0.95)' }}>
                The Workflow
              </h2>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '30px' }}>
                <ol style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', lineHeight: '2', paddingLeft: '20px', color: 'rgba(255,255,255,0.85)' }}>
                  <li>Describe what I want to Windsurf</li>
                  <li>Review and refine the generated code</li>
                  <li>Push changes to GitHub</li>
                  <li>Netlify automatically deploys</li>
                  <li>Site is live in ~2 minutes</li>
                </ol>
              </div>
            </div>

            {/* Real Challenges Section */}
            <div style={{ marginBottom: '70px' }}>
              <h2 style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '24px',
                fontWeight: '400',
                marginBottom: '20px',
                color: 'rgba(255,255,255,0.95)'
              }}>
                Challenges & Reality Check
              </h2>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', lineHeight: '1.8', marginBottom: '30px', color: 'rgba(255,255,255,0.85)' }}>
                It wasn't smooth sailing. Here's what actually took time:
              </p>

              <div className="challenges-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '25px'
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>📱</div>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '17px', color: 'rgba(255,255,255,0.95)', marginBottom: '10px', fontWeight: '500' }}>
                    Responsive Layouts
                  </h3>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)', marginBottom: '10px' }}>
                    Perfect on desktop, broken on mobile. Manual iteration across breakpoints.
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', color: 'rgba(139, 92, 246, 0.8)', fontWeight: '500' }}>
                    Time: ~4 hours
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '25px'
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>▶️</div>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '17px', color: 'rgba(255,255,255,0.95)', marginBottom: '10px', fontWeight: '500' }}>
                    Video Autoplay
                  </h3>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)', marginBottom: '10px' }}>
                    Browser policies blocked videos. Debugging across Chrome, Safari, mobile.
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', color: 'rgba(139, 92, 246, 0.8)', fontWeight: '500' }}>
                    Time: ~3 hours
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '25px'
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>⚡</div>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '17px', color: 'rgba(255,255,255,0.95)', marginBottom: '10px', fontWeight: '500' }}>
                    Animation Performance
                  </h3>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)', marginBottom: '10px' }}>
                    Janky scrolling. Optimized GSAP settings and added CSS hints.
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', color: 'rgba(139, 92, 246, 0.8)', fontWeight: '500' }}>
                    Time: ~5 hours
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '25px'
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>🎨</div>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '17px', color: 'rgba(255,255,255,0.95)', marginBottom: '10px', fontWeight: '500' }}>
                    Background Shader
                  </h3>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)', marginBottom: '10px' }}>
                    WebGL covered clickable elements. Z-index nightmares.
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', color: 'rgba(139, 92, 246, 0.8)', fontWeight: '500' }}>
                    Time: ~2 hours
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '25px'
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>🧭</div>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '17px', color: 'rgba(255,255,255,0.95)', marginBottom: '10px', fontWeight: '500' }}>
                    Route Navigation
                  </h3>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)', marginBottom: '10px' }}>
                    Back button broke modal videos. Manual transition handling.
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', color: 'rgba(139, 92, 246, 0.8)', fontWeight: '500' }}>
                    Time: ~3 hours
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '25px'
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>🔧</div>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '17px', color: 'rgba(255,255,255,0.95)', marginBottom: '10px', fontWeight: '500' }}>
                    DNS & Deployment
                  </h3>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)', marginBottom: '10px' }}>
                    Configuring nameservers, SSL, build settings. Not automated.
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', color: 'rgba(139, 92, 246, 0.8)', fontWeight: '500' }}>
                    Time: ~3 hours
                  </p>
                </div>
              </div>
            </div>

            {/* By The Numbers Callout */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15))',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '16px',
              padding: '40px',
              marginBottom: '70px'
            }}>
              <h2 style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '22px',
                fontWeight: '500',
                marginBottom: '30px',
                color: 'rgba(255,255,255,0.95)',
                textAlign: 'center'
              }}>
                By The Numbers
              </h2>
              
              <div className="numbers-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '25px',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '32px', fontWeight: '600', color: 'rgba(139, 92, 246, 0.9)', marginBottom: '8px' }}>
                    ~8 hours
                  </div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                    Planning with Claude
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '32px', fontWeight: '600', color: 'rgba(139, 92, 246, 0.9)', marginBottom: '8px' }}>
                    50+
                  </div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                    Code iterations
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '32px', fontWeight: '600', color: 'rgba(139, 92, 246, 0.9)', marginBottom: '8px' }}>
                    ~3,000
                  </div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                    Lines generated
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '32px', fontWeight: '600', color: 'rgba(139, 92, 246, 0.9)', marginBottom: '8px' }}>
                    ~200
                  </div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                    Lines I wrote
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '32px', fontWeight: '600', color: 'rgba(139, 92, 246, 0.9)', marginBottom: '8px' }}>
                    Many
                  </div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                    Bugs fixed manually
                  </div>
                </div>
              </div>
            </div>

            {/* Code Example Section */}
            <div style={{ marginBottom: '70px' }}>
              <h2 style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '24px',
                fontWeight: '400',
                marginBottom: '20px',
                color: 'rgba(255,255,255,0.95)'
              }}>
                Under the Hood: Code Structure
              </h2>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', lineHeight: '1.8', marginBottom: '25px', color: 'rgba(255,255,255,0.85)' }}>
                The site is built with Next.js 14, React, and modern web technologies. Here's a glimpse at the actual code structure:
              </p>

              <div style={{
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                background: 'rgba(0,0,0,0.3)',
                marginBottom: '20px'
              }}>
                <img 
                  src="/how-i-built-this/code-example.png" 
                  alt="Code structure"
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    display: 'block',
                    objectFit: 'contain'
                  }}
                />
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '30px'
              }}>
                <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: '17px', color: 'rgba(255,255,255,0.95)', marginBottom: '15px', fontWeight: '500' }}>
                  Tech Stack Details
                </h3>
                <ul style={{ fontFamily: "'Space Mono', monospace", fontSize: '15px', lineHeight: '1.8', color: 'rgba(255,255,255,0.75)', paddingLeft: '24px', margin: 0 }}>
                  <li><strong>Next.js 14:</strong> React framework with App Router</li>
                  <li><strong>TypeScript:</strong> Type-safe component development</li>
                  <li><strong>GSAP:</strong> Professional-grade scroll animations</li>
                  <li><strong>WebGL Shaders:</strong> Custom fluid background effects</li>
                  <li><strong>Vimeo API:</strong> High-quality video embedding</li>
                  <li><strong>Tailwind CSS:</strong> Utility-first styling</li>
                </ul>
              </div>
            </div>

            {/* Why This Approach */}
            <div className="animate-fade-in-up" style={{ marginBottom: '70px', animationDelay: '1s', animationFillMode: 'forwards' }}>
              <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: '24px', fontWeight: '400', marginBottom: '20px', color: 'rgba(255,255,255,0.95)' }}>
                Why This Approach?
              </h2>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', lineHeight: '1.8', marginBottom: '20px', color: 'rgba(255,255,255,0.85)' }}>
                <strong>Speed:</strong> Built the entire site in days, not weeks.
              </p>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', lineHeight: '1.8', marginBottom: '20px', color: 'rgba(255,255,255,0.85)' }}>
                <strong>Cost:</strong> $12/year for the domain. Everything else is free.
              </p>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', lineHeight: '1.8', marginBottom: '20px', color: 'rgba(255,255,255,0.85)' }}>
                <strong>Control:</strong> I still make all creative decisions. AI just handles the implementation.
              </p>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', lineHeight: '1.8', marginBottom: '20px', color: 'rgba(255,255,255,0.85)' }}>
                <strong>Flexibility:</strong> Want to change something? Just tell Windsurf. No digging through documentation.
              </p>
              
              <div style={{ marginTop: '30px', padding: '30px', background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '12px' }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)', marginBottom: '20px' }}>
                  <strong>The Bottom Line on Cost:</strong>
                </p>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '15px', lineHeight: '1.8', color: 'rgba(255,255,255,0.85)' }}>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>This site:</strong> $12/year for the domain. That's it. Everything else—GitHub hosting, Netlify deployment, custom SSL, unlimited bandwidth—is completely free.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Wix:</strong> $192-$588/year ($16-$49/month)
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Squarespace:</strong> $192-$864/year ($16-$72/month)
                  </p>
                  <p style={{ marginBottom: '20px' }}>
                    <strong>Netflix:</strong> $155/year ($12.99/month)
                  </p>
                  <p style={{ fontSize: '16px', color: 'rgba(139, 92, 246, 0.95)', fontWeight: '500', margin: 0 }}>
                    You're looking at a production-quality portfolio that costs 92% less than the cheapest website builder—and less than one month of Netflix.
                  </p>
                </div>
              </div>

              <div style={{
                marginTop: '40px',
                padding: '30px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                borderLeft: '4px solid rgba(139, 92, 246, 0.6)'
              }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '16px', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                  <strong>Would I do this again?</strong> Absolutely. But anyone telling you AI "builds websites for you" is lying. AI accelerates—it doesn't replace. You still need to know what you want, how to ask for it, and how to fix it when it breaks.
                </p>
              </div>

              <div style={{
                marginTop: '50px',
                textAlign: 'center',
                paddingTop: '40px',
                borderTop: '1px solid rgba(255,255,255,0.1)'
              }}>
                <p style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '16px',
                  lineHeight: '1.7',
                  color: 'rgba(255,255,255,0.8)',
                  marginBottom: '25px'
                }}>
                  Want to talk about how you could build something like this?
                </p>
                
                <a 
                  href="mailto:colour8k@mac.com?subject=Just%20reaching%20out"
                  style={{
                    display: 'inline-block',
                    padding: '14px 32px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'rgba(255,255,255,0.9)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255,255,255,0.03)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  }}
                >
                  LET'S CHAT
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer with meteors overlay (to match homepage) */}
      <div style={{ position: 'relative', background: '#000', overflow: 'hidden', zIndex: 40 }}>
        <footer className="footer" style={{ position: 'relative', zIndex: 41 }}>
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
              <a href="https://www.linkedin.com/in/jefferykerrcreative" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
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
              © 2025 Jeff Kerr. Dig the site? I vibe-coded it. Click <Link href="/how-i-built-this" style={{ textDecoration: 'underline', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>here</Link> to see how.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
