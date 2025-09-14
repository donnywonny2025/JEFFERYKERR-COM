import React, { useEffect, useState } from 'react';
import { TextRoll } from './motion-primitives/text-roll';

export default function HeroHeading() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero-text">
      <h1 className="hero-main-text">
        <TextRoll 
          duration={0.6}
          getEnterDelay={(i) => i * 0.05}
          className="hero-textroll-wrapper"
        >
          I produce compelling visual content while building AI-enhanced workflows that change how creative work gets done.
        </TextRoll>
      </h1>
      <div className={`hero-meta ${isAnimated ? 'meta-animate-in' : ''}`}>
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
