import React from 'react';

export default function DulopesLogo({
  variant = 'dark', // 'dark' (navy text), 'light' (white text)
  size = 'medium', // 'small', 'medium', 'large', 'xlarge'
  showSubtitle = true,
  has3DEffect = true,
  className = ''
}) {
  // Scaled dimensions
  const scaleMap = {
    small: { width: 150, height: 44, fontSize: 26, gearSize: 30, subSize: 8.5 },
    medium: { width: 230, height: 70, fontSize: 40, gearSize: 46, subSize: 11.5 },
    large: { width: 340, height: 104, fontSize: 58, gearSize: 66, subSize: 15.5 },
    xlarge: { width: 440, height: 135, fontSize: 76, gearSize: 86, subSize: 20 }
  };

  const dim = scaleMap[size] || scaleMap.medium;

  const textColor = variant === 'light' ? '#FFFFFF' : '#0B2545';
  const subtextColor = variant === 'light' ? '#94A3B8' : '#0B2545';

  const textShadow = has3DEffect
    ? (variant === 'light' ? '0 3px 8px rgba(0,0,0,0.7)' : '0 2px 5px rgba(0,0,0,0.3), 0 4px 10px rgba(11,37,69,0.25)')
    : 'none';

  return (
    <div
      className={`dulopes-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
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
          letterSpacing: '-0.035em',
          textTransform: 'uppercase',
          textShadow
        }}>
          DUL
        </span>

        {/* Static Gear with Wrench Inside (Exact 3D Look) */}
        <div style={{
          width: `${dim.gearSize}px`,
          height: `${dim.gearSize}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 3px',
          position: 'relative',
          filter: has3DEffect ? 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.35))' : 'none'
        }}>
          <svg
            width={dim.gearSize}
            height={dim.gearSize}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Teeth */}
            <path
              d="M50 15 L55 5 L65 7 L65 18 L75 22 L84 15 L91 22 L84 31 L90 40 L100 44 L98 56 L88 58 L85 68 L93 77 L86 86 L76 80 L68 87 L66 97 L54 97 L51 86 L41 85 L33 93 L24 87 L30 78 L21 70 L11 72 L7 60 L17 54 L16 43 L5 40 L10 28 L21 31 L28 22 L23 11 L34 6 L41 16 Z"
              fill="url(#gearGradient)"
            />

            {/* Inner Ring Cutout */}
            <circle cx="50" cy="50" r="28" fill="#FF6B00" />
            <circle cx="50" cy="50" r="18" fill={variant === 'light' ? '#0B2545' : '#EAEAEA'} />

            {/* Wrench inside the gear */}
            <g transform="rotate(-45 50 50)">
              {/* Handle */}
              <rect x="44" y="30" width="12" height="42" rx="3" fill="#FF6B00" />
              {/* Head */}
              <path
                d="M38 20 C38 12, 62 12, 62 20 L56 26 L44 26 Z"
                fill="#FF6B00"
              />
              <path
                d="M45 16 L50 22 L55 16"
                stroke={variant === 'light' ? '#0B2545' : '#EAEAEA'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            <defs>
              <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8533" />
                <stop offset="50%" stopColor="#FF6B00" />
                <stop offset="100%" stopColor="#E05600" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* PES */}
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 900,
          fontStyle: 'italic',
          fontSize: `${dim.fontSize}px`,
          color: textColor,
          letterSpacing: '-0.035em',
          textTransform: 'uppercase',
          textShadow
        }}>
          PES
        </span>
      </div>

      {/* Subtitle: MÁQUINAS E EQUIPAMENTOS */}
      {showSubtitle && (
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 900,
          fontStyle: 'italic',
          fontSize: `${dim.subSize}px`,
          color: subtextColor,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          marginTop: '3px',
          textShadow: has3DEffect ? (variant === 'light' ? '0 2px 4px rgba(0,0,0,0.6)' : '0 1px 3px rgba(0,0,0,0.25)') : 'none'
        }}>
          MÁQUINAS E EQUIPAMENTOS
        </span>
      )}
    </div>
  );
}
