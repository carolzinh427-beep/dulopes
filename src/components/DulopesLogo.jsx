import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function DulopesLogo({
  variant = 'dark', // 'dark' (navy text for light bg) or 'light' (white text for dark bg)
  size = 'medium', // 'small', 'medium', 'large'
  showSubtitle = true,
  interactive = true,
  className = ''
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Scaled dimensions
  const scaleMap = {
    small: { width: 140, height: 42, fontSize: 24, gearSize: 28, subSize: 8 },
    medium: { width: 220, height: 68, fontSize: 38, gearSize: 44, subSize: 11 },
    large: { width: 320, height: 98, fontSize: 56, gearSize: 64, subSize: 15 }
  };

  const dim = scaleMap[size] || scaleMap.medium;

  const textColor = variant === 'light' ? '#FFFFFF' : '#0A192F';
  const subtextColor = variant === 'light' ? '#94A3B8' : '#0F2547';

  // Rotation duration: 15s normal, 3s on hover
  const spinDuration = isHovered ? 3 : 15;

  return (
    <div
      className={`dulopes-logo-container ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: interactive ? 'pointer' : 'default',
        userSelect: 'none'
      }}
    >
      {/* Brand Name Row */}
      <div style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}>
        {/* DUL */}
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 900,
          fontStyle: 'italic',
          fontSize: `${dim.fontSize}px`,
          color: textColor,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase'
        }}>
          DUL
        </span>

        {/* Animated Rotating Gear with Wrench Inside */}
        <div style={{
          width: `${dim.gearSize}px`,
          height: `${dim.gearSize}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 2px',
          position: 'relative'
        }}>
          <motion.svg
            width={dim.gearSize}
            height={dim.gearSize}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: 360 }}
            transition={{
              rotate: {
                repeat: Infinity,
                duration: spinDuration,
                ease: "linear"
              }
            }}
            style={{ transformOrigin: 'center center' }}
          >
            {/* Gear Outer Teeth Ring */}
            <path
              d="M50 15 L55 5 L65 7 L65 18 L75 22 L84 15 L91 22 L84 31 L90 40 L100 44 L98 56 L88 58 L85 68 L93 77 L86 86 L76 80 L68 87 L66 97 L54 97 L51 86 L41 85 L33 93 L24 87 L30 78 L21 70 L11 72 L7 60 L17 54 L16 43 L5 40 L10 28 L21 31 L28 22 L23 11 L34 6 L41 16 Z"
              fill="#FF6B00"
            />

            {/* Gear Inner Ring Cutout */}
            <circle cx="50" cy="50" r="28" fill="#FF6B00" />
            <circle cx="50" cy="50" r="18" fill={variant === 'light' ? '#0A192F' : '#FFFFFF'} />

            {/* Wrench inside the gear */}
            <g transform="rotate(-45 50 50)">
              {/* Wrench Handle */}
              <rect x="44" y="30" width="12" height="42" rx="3" fill="#FF6B00" />
              {/* Wrench Open Head */}
              <path
                d="M38 20 C38 12, 62 12, 62 20 L56 26 L44 26 Z"
                fill="#FF6B00"
              />
              <path
                d="M45 16 L50 22 L55 16"
                stroke={variant === 'light' ? '#0A192F' : '#FFFFFF'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </motion.svg>
        </div>

        {/* PES */}
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 900,
          fontStyle: 'italic',
          fontSize: `${dim.fontSize}px`,
          color: textColor,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase'
        }}>
          PES
        </span>
      </div>

      {/* Subtitle: MÁQUINAS E EQUIPAMENTOS */}
      {showSubtitle && (
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontStyle: 'italic',
          fontSize: `${dim.subSize}px`,
          color: subtextColor,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginTop: '2px',
          opacity: 0.95
        }}>
          MÁQUINAS E EQUIPAMENTOS
        </span>
      )}
    </div>
  );
}
