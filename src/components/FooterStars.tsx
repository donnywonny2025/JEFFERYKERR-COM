"use client";

import React, { useEffect, useRef } from 'react';

type Star = { x: number; y: number; r: number; vx: number; vy: number; alpha: number };

type Meteor = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number };

const FooterStars: React.FC<{ density?: number }> = ({ density = 0.6 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Build stars based on density and area
    const baseCount = Math.floor((width * height) / 18000 * density);
    const stars: Star[] = new Array(Math.max(baseCount, 25)).fill(0).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.05,
      vy: Math.random() * 0.06 + 0.02,
      alpha: Math.random() * 0.8 + 0.2,
    }));

    const meteors: Meteor[] = [];
    let lastMeteor = 0;

    const step = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      // draw stars (falling slightly)
      ctx.fillStyle = '#ffffff';
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.y > height) {
          s.y = -2;
          s.x = Math.random() * width;
        }
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // spawn a meteor occasionally
      if (t - lastMeteor > 1800 + Math.random() * 2200 && meteors.length < 2) {
        lastMeteor = t;
        const startX = Math.random() * width * 0.7 + width * 0.2;
        meteors.push({
          x: startX,
          y: -10,
          vx: -2.2 - Math.random() * 1.2,
          vy: 2.0 + Math.random() * 1.0,
          life: 0,
          maxLife: 1200 + Math.random() * 600,
        });
      }

      // draw meteors (confined within footer canvas)
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life += 16;

        // trail
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 10, m.y - m.vy * 10);
        grad.addColorStop(0, 'rgba(255,255,255,0.9)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 10, m.y - m.vy * 10);
        ctx.stroke();

        // head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.6, 0, Math.PI * 2);
        ctx.fill();

        if (m.life > m.maxLife || m.x < -20 || m.y > height + 20) {
          meteors.splice(i, 1);
        }
      }

      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      ro.disconnect();
    };
  }, [density]);

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
};

export default FooterStars;
