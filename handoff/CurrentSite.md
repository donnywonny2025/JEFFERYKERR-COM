# Current Site Architecture & Code Documentation

## Overview
This document contains the complete code structure for Jeff Kerr's portfolio website - a Next.js application with animated liquid background effects, responsive navigation, and video showcase functionality.

## Site Structure

### Core Framework
- **Framework**: Next.js 14 with App Router
- **Styling**: CSS-in-JS with Tailwind CSS
- **Fonts**: Space Mono (monospace) for consistent typography
- **Background**: Custom WebGL liquid animation with Three.js fallback

### Key Files & Architecture

## 1. Root Layout (`app/layout.tsx`)
```tsx
import "./globals.css"

export const metadata = {
  title: "Jeff Kerr — Director & Creative",
  description: "Portfolio of Jeff Kerr — director, cinematographer, and creative director.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}
```

## 2. Main Page Component (`app/page.tsx`)

### Page Structure & State Management
```tsx
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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
```

### Video Data Structure
```tsx
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
    // ... additional video objects
  ];
```

### Scroll Animation System
```tsx
  // Refs for scroll animations
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [videoStates, setVideoStates] = useState<boolean[]>(new Array(videos.length).fill(false));

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
```

## 3. Animated Background System (`src/components/LiquidEtherSimple.jsx`)

### Core Background Component
```jsx
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

const LiquidEtherSimple = React.memo(function LiquidEtherSimple({
  colors = ['#4A1FA3', '#E640E6', '#7B2CBF', '#00A8CC', '#6B46C1'],
  style = {},
  className = ''
}) {
  const mountRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    let renderer, scene, camera, material, mesh, animationId;

    // Mobile detection - use CSS fallback
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      container.style.background = `
        radial-gradient(circle at 30% 70%, ${colors[0]}44 0%, transparent 60%),
        radial-gradient(circle at 70% 30%, ${colors[1]}44 0%, transparent 60%),
        linear-gradient(45deg, ${colors[0]}33, ${colors[1]}33, ${colors[2]}33)
      `;
      container.style.backgroundSize = '400% 400%, 300% 300%, 100% 100%';
      container.style.animation = 'liquidFlow 20s ease-in-out infinite';
      return;
    }
```

### WebGL Shader Implementation
```jsx
    try {
      // Simple WebGL setup
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'default'
      });
      
      renderer.setPixelRatio(0.5); // Low pixel ratio for performance
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Fragment shader for liquid effect
      const fragmentShader = `
        uniform float uTime;
        uniform sampler2D uPalette;
        varying vec2 vUv;

        // Simple but effective noise function
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float smoothNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f); // Smooth interpolation
          
          float a = noise(i);
          float b = noise(i + vec2(1.0, 0.0));
          float c = noise(i + vec2(0.0, 1.0));
          float d = noise(i + vec2(1.0, 1.0));
          
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }

        void main() {
          vec2 uv = vUv;
          float time = uTime * 0.4;
          
          // Add distortion for more organic flow
          vec2 distortion = vec2(
            sin(uv.y * 6.0 + time * 0.8) * 0.03,
            cos(uv.x * 5.0 + time * 0.7) * 0.025
          );
          vec2 distortedUv = uv + distortion;
          
          // Multiple liquid layers with different scales and speeds
          float liquid1 = sin(distortedUv.y * 4.0 + time) * cos(distortedUv.x * 2.0 + time * 0.7) * 0.5;
          float liquid2 = cos(distortedUv.x * 3.0 + time * 0.8) * sin(distortedUv.y * 5.0 + time * 1.1) * 0.4;
          float liquid3 = sin((distortedUv.x + distortedUv.y) * 2.5 + time * 1.3) * 0.3;
          
          // Add wispy details with noise
          float wispy1 = smoothNoise(distortedUv * 8.0 + time * 0.2) * 0.2;
          float wispy2 = smoothNoise(distortedUv * 12.0 - time * 0.15) * 0.15;
          
          // Combine all layers
          float liquid = (liquid1 + liquid2 + liquid3 + wispy1 + wispy2) * 0.5 + 0.5;
          
          // Add flowing turbulence
          float turbulence = sin(distortedUv.x * 7.0 + distortedUv.y * 4.0 + time * 0.6) * 0.1;
          liquid += turbulence;
          
          // Color sampling with variation
          float colorFlow1 = sin(distortedUv.y * 3.0 + time * 0.5) * 0.3 + 0.7;
          float colorFlow2 = cos(distortedUv.x * 2.5 + time * 0.4) * 0.2 + 0.5;
          
          vec2 colorUV1 = vec2(colorFlow1, 0.5);
          vec2 colorUV2 = vec2(colorFlow2, 0.5);
          
          vec3 color1 = texture2D(uPalette, colorUV1).rgb;
          vec3 color2 = texture2D(uPalette, colorUV2).rgb;
          
          // Mix colors based on liquid flow
          vec3 finalColor = mix(color1, color2, smoothstep(0.3, 0.7, liquid));
          
          // Boost colors and add shimmer
          finalColor *= 1.6;
          float shimmer = 1.0 + sin(liquid * 6.28 + time) * 0.1;
          finalColor *= shimmer;
          
          // More organic masking
          float mask = smoothstep(0.15, 0.85, liquid);
          mask *= smoothstep(0.1, 0.6, wispy1 + wispy2 + 0.5);
          
          // Softer edge fade
          float edgeFade = 1.0 - smoothstep(0.0, 0.8, length(uv - vec2(0.5)));
          edgeFade += smoothNoise(uv * 6.0) * 0.1; // Add organic edge variation
          
          gl_FragColor = vec4(finalColor, mask * edgeFade * 0.7);
        }
      `;
```

## 4. Navigation System

### Header Component (`src/components/Header/Header.jsx`)
```jsx
import React from 'react';
import { TextShimmer } from '../../motion-primitives/text-shimmer';
import { SafeWrapper } from '../../SafeWrapper';
import { DigitalClock } from '../../motion-primitives/digital-clock';
import Menu from '../Menu/Menu';
import { TYPOGRAPHY, Z_INDEX, NAV_LINKS } from '../../styles/theme';
import './Header.css';

const Header = ({ menuOpen, setMenuOpen, onNavigate }) => {
  const handleLogoClick = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <a href="#" onClick={handleLogoClick} className="logo">
          <TextShimmer duration={3} spread={1.5} fontSize="36px">
            <span className="logo-k">k</span>err
          </TextShimmer>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) {
                  onNavigate(link.label.toLowerCase());
                }
              }}
              className={link.className || ''}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side container */}
        <div className="header-right">
          {/* Digital Clock */}
          <SafeWrapper>
            <DigitalClock />
          </SafeWrapper>

          {/* Hamburger Menu */}
          <Menu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
```

### Menu Wrapper (`src/components/MenuWrapper.tsx`)
```tsx
import React from 'react';
import Menu from './Menu/Menu';

// Thin wrapper to keep the public API consistent
const MenuWrapper: React.FC<any> = (props) => {
  // @ts-ignore - Menu is JS
  return <Menu {...props} />;
};

export default MenuWrapper;
```

## 5. Page Layout Structure

### Main Page Layout
```tsx
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
          '#3d2a5f',      // Muted purple
          '#1a4d72',      // Darker, muted blue 
          '#6b46c1',      // More subdued light purple
          '#c084fc'       // Softer pink
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

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
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
```

### Hero Section
```tsx
    {/* Enhanced Hero Text Section */}
    <section style={{ 
      paddingTop: '140px',
      marginBottom: '60px'
    }}>
      <div style={{
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

      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        fontSize: '11px',
        color: '#cccccc',
        opacity: 0.6,
        fontFamily: "'Space Mono', monospace"
      }}>
        <div className="contact-info" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MapPin size={14} strokeWidth={1.5} color="rgba(255,255,255,0.6)" />
          <span style={{ color: '#cccccc' }}>Grand Rapids, Michigan / World</span>
        </div>
        <div className="contact-info">
          <a href="mailto:colour8k@mac.com" style={{ color: '#cccccc', textDecoration: 'none' }}>colour8k@mac.com</a>
        </div>
      </div>
    </section>
```

## 6. Styling System (`src/App.css`)

### CSS Variables & Base Styles
```css
/* Custom CSS Variables for Jeffrey Kerr Portfolio */
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #111111;
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --text-muted: #888888;
  --accent: #ffffff;
  --border: #333333;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Space Mono', monospace;
  background: #0b0b0b;
  color: var(--text-primary);
  line-height: 1.0;
  overflow-x: hidden;
  position: relative;
  font-weight: 400;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Film Grain Effect
```css
/* Film grain overlay */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.008) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.006) 1px, transparent 1px),
    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.004) 0.5px, transparent 0.5px);
  background-size: 3px 3px, 4px 4px, 2px 2px;
  pointer-events: none;
  z-index: 2;
  opacity: 0.4;
  animation: grain 22s steps(10) infinite;
}

@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  15% { transform: translate(-3%, -5%); }
  30% { transform: translate(-8%, 3%); }
  45% { transform: translate(4%, -12%); }
  60% { transform: translate(-3%, 12%); }
  75% { transform: translate(-8%, 5%); }
  90% { transform: translate(8%, 0%); }
}
```

### Header Styles
```css
/* Header Styles - Much cleaner and more refined */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 40px 60px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  letter-spacing: 0.5px;
  opacity: 1;
}

.logo-k {
  font-size: 26px;
  font-weight: 600;
  vertical-align: baseline;
  line-height: 1;
}
```

### Animation Styles
```css
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
```

## 7. How the Background Works

### Background Implementation Details

The site uses a sophisticated multi-layered background system:

1. **Fixed Container**: The background is positioned as a fixed overlay covering the entire viewport
2. **WebGL Rendering**: Uses Three.js for hardware-accelerated liquid animation
3. **Mobile Fallback**: CSS gradients with keyframe animations for mobile devices
4. **Performance Optimization**: Low pixel ratio (0.5) and 15fps animation for smooth performance

### Color Palette System
```jsx
colors={[ 
  '#0a0a0a',      // Deep black
  '#1a0b2e',      // Dark purple
  '#2d1b4e',      // Medium purple
  '#3d2a5f',      // Muted purple
  '#1a4d72',      // Darker, muted blue 
  '#6b46c1',      // More subdued light purple
  '#c084fc'       // Softer pink
]}
```

### Animation Parameters
- **Opacity**: 0.85 for subtle transparency
- **Flow Speed**: 0.4 for gentle movement
- **Turbulence**: 0.8 for organic flow patterns
- **Color Mixing**: 0.6 for smooth color transitions
- **Background Darkness**: 0.85 to maintain readability

## 8. Navigation System

### Menu Structure
The navigation uses a hamburger menu system with:
- Fixed header with logo and menu toggle
- Overlay menu with backdrop blur
- Smooth animations and transitions
- Mobile-responsive design

### Navigation Links
- HOME: Main portfolio page
- BACKGROUNDS: Background showcase page
- WORK: Project portfolio (placeholder)
- CONTACT: Contact information (placeholder)

## 9. Video Showcase System

### Video Grid Implementation
- Single column layout for large video thumbnails
- Intersection Observer for scroll-triggered animations
- Smooth blur-to-focus transitions
- Metadata display with client and date information

### Video Data Structure
Each video object contains:
- `id`: Unique identifier
- `title`: Display title
- `client`: Client name
- `date`: Project year
- `thumbnail`: Image URL for preview
- `href`: External video link
- `route`: Internal Next.js route
- `description`: Project description

## 10. Performance Optimizations

### Background Performance
- WebGL rendering with low pixel ratio
- 15fps animation loop to reduce CPU usage
- Mobile CSS fallback to avoid WebGL overhead
- Proper cleanup on component unmount

### Image Loading
- Optimized thumbnail URLs from YouTube/Vimeo
- Lazy loading with Intersection Observer
- Progressive enhancement for animations

### Code Splitting
- Component-based architecture
- Dynamic imports where appropriate
- Minimal bundle size with tree shaking

## 11. Responsive Design

### Breakpoint Strategy
- Mobile-first CSS approach
- Flexible grid layouts
- Clamp() functions for responsive typography
- Touch-friendly navigation on mobile

### Typography Scale
- `clamp(1.5rem, 3vw, 2.2rem)` for hero text
- Space Mono monospace font throughout
- Consistent letter spacing and line heights

## 12. Development Notes

### Key Dependencies
- Next.js 14
- Three.js for WebGL animations
- Lucide React for icons
- Tailwind CSS for utilities

### File Structure
```
/app
  /layout.tsx          # Root layout
  /page.tsx           # Main homepage
  /globals.css        # Global Tailwind styles

/src
  /components
    /LiquidEtherSimple.jsx    # Background animation
    /MenuWrapper.tsx          # Navigation wrapper
    /Header/Header.jsx        # Header component
    /motion-primitives/       # Animation components
  /App.css                    # Main stylesheet
```

### Environment Setup
- Node.js environment
- Next.js development server
- CSS-in-JS with styled-jsx
- TypeScript and JavaScript mixed codebase

This documentation provides a complete overview of the current site architecture, including all major components, styling systems, and functionality. The site is built for performance, accessibility, and visual impact with a focus on showcasing video content in an elegant, professional manner.
