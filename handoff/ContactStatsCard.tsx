"use client";

// Handoff: Contact Stats Card (extracted from app/contact/page.tsx)
// - Self-contained component replicating the stats card block we added to the contact page
// - Includes the same markup and styles so Claude can review in isolation
// - Usage: <ContactStatsCard onContactClick={() => document.getElementById('contact-form')?.scrollIntoView({behavior:'smooth'})} />

import React from 'react';

export type ContactStatsCardProps = {
  title?: string;
  metrics?: Array<{ value: string; label: string }>;
  onContactClick?: () => void;
};

export default function ContactStatsCard({
  title = "LET'S CHAT",
  metrics = [
    { value: '1.34M', label: 'Subscribers' },
    { value: '1.6M', label: 'Followers' },
    { value: '64M', label: 'Views' },
  ],
  onContactClick,
}: ContactStatsCardProps) {
  return (
    <div className="contact-info-card contact-stats-card">
      <div className="stats-backdrop" aria-hidden="true" />
      <div className="contact-stats-inner">
        <div className="stats-title">{title}</div>
        <div className="stats-divider" aria-hidden="true" />

        {metrics.map((m, i) => (
          <React.Fragment key={i}>
            <div className="metric-row">
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
            </div>
            {i < metrics.length - 1 && <div className="metric-hr" aria-hidden="true" />}
          </React.Fragment>
        ))}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '26px' }}>
          <button className="stats-cta" onClick={onContactClick}>
            CONTACT
            <span className="arrow" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Local, self-contained styles copied from app/contact/page.tsx (polished variant) */}
      <style jsx>{`
        .contact-info-card {
          max-width: 95%;
          margin: 0 auto; /* parent can add top margin if needed */
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 32px 40px; /* base padding (stats card adds more) */
          backdrop-filter: blur(20px);
        }
        .contact-stats-card {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 36px 48px; /* increased internal padding */
        }
        .contact-stats-inner {
          position: relative;
          z-index: 2;
          width: min(96%, 950px);
          margin: 0 auto;
          text-align: center; /* center-align all content */
        }
        .stats-title {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.72);
          text-align: center;
          margin: 6px 0 12px; /* tighter above divider; main spacing handled below */
        }
        .stats-divider {
          width: 1px;
          height: 28px;
          margin: 0 auto 42px; /* more breathing room above first metric */
          background: rgba(255,255,255,0.28);
        }
        .metric-row {
          display: flex;
          flex-direction: column; /* stack number and label */
          align-items: center; /* center each stack */
          gap: 10px;
          justify-content: center;
          margin: 36px 0; /* generous vertical rhythm */
        }
        .metric-value {
          font-family: 'Space Mono', monospace;
          font-size: clamp(40px, 7vw, 72px); /* much larger numbers */
          font-weight: 700; /* bold/heavy weight for hierarchy */
          color: rgba(255,255,255,0.98);
          line-height: 1.05;
        }
        .metric-label {
          font-family: 'Space Mono', monospace;
          font-size: 15px; /* smaller descriptive text */
          color: rgba(255,255,255,0.68); /* muted/secondary */
          white-space: nowrap;
          letter-spacing: 0.02em;
          text-align: center;
        }
        .metric-hr {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.22); /* subtle divider */
          margin: 26px 0; /* more spacing between stacks */
        }
        .stats-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 22px; /* slightly larger button for balance */
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(6px);
          color: #fff;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          cursor: pointer;
          user-select: none;
          transition: background 0.25s ease, transform 0.2s ease;
        }
        .stats-cta:hover { background: rgba(255,255,255,0.08); }
        .stats-cta .arrow { width: 18px; height: 1px; background: rgba(255,255,255,0.9); position: relative; }
        .stats-cta .arrow::after { content: ''; position: absolute; right: -2px; top: -3px; width: 7px; height: 7px; border-top: 1px solid #fff; border-right: 1px solid #fff; transform: rotate(45deg); }

        .stats-backdrop {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            radial-gradient(1200px 600px at 20% 85%, rgba(107,70,193,0.16), transparent 70%),
            radial-gradient(1000px 600px at 80% 20%, rgba(192,132,252,0.12), transparent 70%),
            linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
        }
      `}</style>
    </div>
  );
}
