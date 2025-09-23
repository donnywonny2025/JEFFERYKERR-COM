"use client";

import React from 'react';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <main style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: '120px 24px' }}>
      <div
        className="animate-fade-in-up"
        style={{
          textAlign: 'center',
          borderRadius: 14,
          border: '1px solid rgba(255,255,255,0.14)',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(10px)',
          padding: '36px 28px',
          maxWidth: 560,
          width: '100%'
        }}
      >
        <h1 style={{
          fontFamily: "'Space Mono', monospace",
          fontWeight: 400,
          fontSize: 28,
          color: 'rgba(255,255,255,0.95)',
          margin: '0 0 12px'
        }}>
          Thank you!
        </h1>
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 16,
          color: 'rgba(255,255,255,0.85)',
          margin: 0
        }}>
          I'll be in touch soon.
        </p>
        <div style={{ marginTop: 24 }}>
          <Link href="/" style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '8px 16px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(173, 216, 230, 0.18)',
            color: '#ffffff'
          }}>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
