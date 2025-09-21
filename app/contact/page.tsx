"use client";

import React from 'react';

export default function ContactPage() {
  return (
    <main style={{
      position: 'relative',
      zIndex: 20,
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 24px 80px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1050px',
        padding: '0 60px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '28px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.95)',
          marginBottom: '8px'
        }}>
          Contact
        </h1>
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '14px',
          color: 'rgba(255,255,255,0.7)'
        }}>
          This page is ready. We will build the design here next. You can reach me at{' '}
          <a href="mailto:colour8k@mac.com" style={{ color: '#cccccc', textDecoration: 'none' }}>colour8k@mac.com</a>.
        </p>
      </div>
    </main>
  );
}
