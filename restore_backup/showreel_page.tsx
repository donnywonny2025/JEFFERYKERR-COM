import React from 'react';
import Link from 'next/link';

export default function Showreel2025Page() {
  const vimeoSrc = 'https://player.vimeo.com/video/1029802990?title=0&byline=0&portrait=0&transparent=0';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header (minimal) */}
      <header style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontFamily: 'Space Mono, monospace', letterSpacing: '1px' }}>← Back</Link>
        <div style={{ opacity: 0.7, fontFamily: 'Space Mono, monospace', fontSize: 12 }}>Showreel 2025</div>
      </header>

      {/* Video container */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ width: '100%', maxWidth: 1200, aspectRatio: '16 / 9', background: '#000', borderRadius: 12, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
          <iframe
            src={vimeoSrc}
            width="100%"
            height="100%"
            allow="autoplay; fullscreen; picture-in-picture"
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            title="Showreel 2025"
          />
        </div>
      </main>

      {/* Footer (minimal) */}
      <footer style={{ padding: '24px', textAlign: 'center', opacity: 0.6, fontFamily: 'Space Mono, monospace', fontSize: 12 }}>
        © 2025 Jeff Kerr
      </footer>
    </div>
  );
}
