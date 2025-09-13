'use client';

import { useRef, useEffect, useState } from 'react';

/**
 * PREMIUM STAR FIELD COMPONENT
 *
 * Tech Stack:
 * - Next.js 13 with App Router
 * - TypeScript for type safety
 * - HTML5 Canvas for high-performance 2D rendering
 * - React hooks (useRef, useEffect, useState) for state management
 * - requestAnimationFrame for smooth 60fps animations
 *
 * Features:
 * - 1200 realistic twinkling stars
 * - Slow rotation around bottom-right anchor point
 * - Dynamic shooting stars with gradient trails
 * - Responsive canvas that adapts to window resize
 * - Deep space gradient background
 * - Performance optimized with proper cleanup
 */

interface Star {
  x: number;              // Position coordinates
  y: number;
  size: number;           // 0.1 to 0.5 pixels (very small for realism)
  opacity: number;        // 0.2 to 0.8 (bright enough to see)
  twinkleSpeed: number;   // Individual animation speed
  twinklePhase: number;   // Offset for natural variation
}

interface ShootingStar {
  x: number;              // Current position
  y: number;
  length: number;         // Trail length
  speed: number;          // Movement speed
  angle: number;          // Direction of movement
  opacity: number;        // Current opacity
  life: number;           // Current age
  maxLife: number;        // Maximum lifespan
}

export default function StarField() {
  console.log('[StarField] Component mounted');

  // Canvas and animation references
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animationRef = useRef<number>();
  const timeRef = useRef<number>(0);
  const rotationRef = useRef<number>(0);

  // Configuration
  const [starCount] = useState(1200);
  const [shootingStarFrequency] = useState(0.0003);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('[StarField] Canvas ref not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('[StarField] Could not get 2D context');
      return;
    }

    console.log('[StarField] Canvas and context initialized');

    // Set canvas size and initialize stars
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars();
    };

    // Initialize background stars with extended boundary
    const initializeStars = () => {
      const stars: Star[] = [];

      // Create stars in a larger area to account for rotation
      // This prevents stars from disappearing during rotation
      const margin = Math.max(canvas.width, canvas.height) * 0.8;

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * (canvas.width + margin * 2) - margin,
          y: Math.random() * (canvas.height + margin * 2) - margin,
          size: Math.random() * 0.4 + 0.1,        // Very small: 0.1-0.5px
          opacity: Math.random() * 0.6 + 0.2,     // Visible: 0.2-0.8
          twinkleSpeed: Math.random() * 0.008 + 0.002,  // Gentle twinkling
          twinklePhase: Math.random() * Math.PI * 2      // Random start phase
        });
      }

      starsRef.current = stars;
    };

    // Create shooting star from random edge
    const createShootingStar = () => {
      const side = Math.floor(Math.random() * 4);
      let x, y, angle;

      // Start from random edge of screen
      switch (side) {
        case 0: // Top edge
          x = Math.random() * canvas.width;
          y = -50;
          angle = Math.random() * Math.PI / 3 + Math.PI / 3;
          break;
        case 1: // Right edge
          x = canvas.width + 50;
          y = Math.random() * canvas.height;
          angle = Math.random() * Math.PI / 3 + 2 * Math.PI / 3;
          break;
        case 2: // Bottom edge
          x = Math.random() * canvas.width;
          y = canvas.height + 50;
          angle = Math.random() * Math.PI / 3 + 4 * Math.PI / 3;
          break;
        default: // Left edge
          x = -50;
          y = Math.random() * canvas.height;
          angle = Math.random() * Math.PI / 3 - Math.PI / 6;
          break;
      }

      const maxLife = Math.random() * 80 + 60;  // Lifespan in frames

      shootingStarsRef.current.push({
        x,
        y,
        length: Math.random() * 60 + 30,         // Trail length
        speed: Math.random() * 4 + 3,            // Movement speed
        angle,
        opacity: 1,
        life: 0,
        maxLife
      });
    };

    // Main animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      timeRef.current += 1;
      rotationRef.current += 0.0001; // Very slow rotation

      // Create deep space gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, '#0a0a0a');    // Dark center
      gradient.addColorStop(0.5, '#050505');  // Darker middle
      gradient.addColorStop(1, '#000000');    // Black edges

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set up rotation around bottom-right anchor point
      const anchorX = canvas.width;   // Bottom-right X
      const anchorY = canvas.height;  // Bottom-right Y

      ctx.save();
      ctx.translate(anchorX, anchorY);        // Move to anchor
      ctx.rotate(rotationRef.current);        // Rotate around anchor
      ctx.translate(-anchorX, -anchorY);      // Move back

      // Update and draw background stars
      starsRef.current.forEach((star) => {
        // Update twinkling animation
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;  // Gentle pulse
        const currentOpacity = star.opacity * twinkle;

        // Draw star as tiny point of light
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Occasionally create new shooting stars
      if (Math.random() < shootingStarFrequency) {
        createShootingStar();
      }

      // Update and draw shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter((shootingStar) => {
        // Update position based on angle and speed
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.life += 1;

        // Fade out over lifetime
        const lifeRatio = shootingStar.life / shootingStar.maxLife;
        shootingStar.opacity = Math.max(0, 1 - lifeRatio);

        // Create gradient trail effect
        const gradient = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
          shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
        );

        // Gradient from bright white to transparent blue
        gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity * 0.8})`);
        gradient.addColorStop(0.6, `rgba(200, 220, 255, ${shootingStar.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(200, 220, 255, 0)');

        // Draw the trail
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
          shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
        );
        ctx.stroke();

        // Remove if expired or off-screen
        return shootingStar.life < shootingStar.maxLife &&
               shootingStar.x > -200 && shootingStar.x < canvas.width + 200 &&
               shootingStar.y > -200 && shootingStar.y < canvas.height + 200;
      });

      ctx.restore(); // Restore canvas state after rotation

      // Continue animation loop
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize everything and start animation
    resizeCanvas();
    animate();

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [starCount, shootingStarFrequency]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none'  // Allow clicks to pass through
      }}
    />
  );
}

/**
 * USAGE INSTRUCTIONS FOR GROK:
 *
 * 1. This is a complete React component that renders a premium star field
 * 2. Import and use it in any Next.js page or component
 * 3. The canvas is positioned fixed and covers the full viewport
 * 4. Content can be layered on top with higher z-index values
 *
 * Key technical concepts:
 * - Canvas 2D rendering context for performance
 * - requestAnimationFrame for smooth animations
 * - Transform matrix operations for rotation
 * - Gradient effects for realistic lighting
 * - Lifecycle management for dynamic elements
 * - Responsive design with window resize handling
 *
 * Performance considerations:
 * - Uses refs to avoid React re-renders during animation
 * - Efficient star generation with boundary margins
 * - Proper cleanup of animation frames and event listeners
 * - Optimized drawing operations with minimal state changes
 */