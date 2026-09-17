import React, { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({
  text = '',
  className = '',
  delay = 35,
  duration = 0.8,
  ease = 'power3.out',
  splitType = 'words',
  from = { opacity: 0, y: 25 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'center',
  tag = 'p',
  style = {},
  onLetterAnimationComplete
}) {
  const containerRef = useRef(null);

  const elements = useMemo(() => {
    if (!text) return [];
    if (splitType === 'words') {
      return text.split(/(\s+)/).map((part, i) => {
        if (!part) return null;
        if (/^\s+$/.test(part)) return <span key={i}>&nbsp;</span>;
        return (
          <span
            key={i}
            className="split-word"
            style={{ display: 'inline-block', willChange: 'transform, opacity' }}
          >
            {part}
          </span>
        );
      });
    }

    // Default "chars"
    return Array.from(text).map((char, i) => {
      if (char === ' ') {
        return <span key={i} style={{ display: 'inline-block' }}>&nbsp;</span>;
      }
      return (
        <span
          key={i}
          className="split-char"
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}
        >
          {char}
        </span>
      );
    });
  }, [text, splitType]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll('.split-char, .split-word');
    if (!targets.length) return;

    gsap.set(targets, from);

    const startPct = Math.max(10, Math.min(95, (1 - threshold) * 100));

    const animation = gsap.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      scrollTrigger: {
        trigger: el,
        start: `top ${startPct}%`,
        once: true
      },
      onComplete: () => {
        if (onLetterAnimationComplete) onLetterAnimationComplete();
      }
    });

    return () => {
      if (animation.scrollTrigger) animation.scrollTrigger.kill();
      animation.kill();
    };
  }, [text, delay, duration, ease, JSON.stringify(from), JSON.stringify(to), threshold, onLetterAnimationComplete]);

  const Tag = tag || 'p';

  return (
    <Tag
      ref={containerRef}
      className={`split-parent ${className}`.trim()}
      style={{
        textAlign,
        display: 'inline-block',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        ...style
      }}
    >
      {elements}
    </Tag>
  );
}
