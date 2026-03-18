import React, { useEffect, useState } from 'react';
import { TextRoll } from './motion-primitives/text-roll';

export default function HeroHeading() {
  const [showMeta, setShowMeta] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMeta(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero-text">
      <div className="hero-text-container">
        <TextRoll
          className="hero-main-text"
          duration={0.8}
          getEnterDelay={(i) => i * 0.08}
        >
          I produce compelling visual content while building AI-enhanced workflows that change how creative work gets done.
        </TextRoll>
      </div>
      <div className={`hero-meta ${showMeta ? 'meta-animate-in' : ''}`}>
        <div className="meta-item location-item">
          <span>Grand Rapids, Michigan / World</span>
        </div>
        <div className="meta-item email-item">
          <a href="mailto:colour8k@mac.com">colour8k@mac.com</a>
        </div>
      </div>
    </div>
  );
}