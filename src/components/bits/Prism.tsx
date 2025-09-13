
'use client';

import { useEffect, useRef } from 'react';
import './Prism.css';

const Prism = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    console.log('Prism component initializing...');

    // Make container visible for debugging
    container.style.background = 'rgba(255, 0, 0, 0.8)';
    container.style.border = '5px solid yellow';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.zIndex = '9999';

    // Create a simple animated background
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get 2D context');
      return;
    }

    console.log('Canvas created successfully');

    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.zIndex = '999';

    container.appendChild(canvas);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const animate = () => {
      time += 0.016;

      if (time < 0.1) {
        console.log('Animation started');
      }

      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, width, height);

      // Draw animated prism-like effect
      ctx.save();
      ctx.translate(width / 2, height / 2);

      const numTriangles = 8;
      for (let i = 0; i < numTriangles; i++) {
        const angle = (i / numTriangles) * Math.PI * 2 + time * 0.5;
        const radius = 100 + Math.sin(time + i) * 50;

        ctx.save();
        ctx.rotate(angle);
        ctx.translate(radius, 0);

        // Draw triangle
        ctx.beginPath();
        ctx.moveTo(0, -30);
        ctx.lineTo(25, 15);
        ctx.lineTo(-25, 15);
        ctx.closePath();

        const hue = (time * 50 + i * 45) % 360;
        ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
        ctx.globalAlpha = 0.6;
        ctx.fill();

        ctx.restore();
      }

      ctx.restore();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }} />;
};

export default Prism;
