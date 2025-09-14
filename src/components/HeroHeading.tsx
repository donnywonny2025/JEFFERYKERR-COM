import React, { useEffect, useMemo, useState } from 'react';

export default function HeroHeading() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const text = useMemo(
    () =>
      'I produce compelling visual content while building AI-enhanced workflows that change how creative work gets done.',
    []
  );

  const words = useMemo(() => text.split(' '), [text]);

  return (
    <div className="hero-text">
      <h1 className={`hero-main-text ${isAnimated ? 'text-animate-in' : ''}`}>
        {words.map((word, i) => (
          <span
            key={i}
            className={`hero-word ${isAnimated ? 'animate' : ''}`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
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
