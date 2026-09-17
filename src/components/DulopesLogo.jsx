import React from 'react';

export default function DulopesLogo({
  variant = 'dark', // 'dark' (official navy 3D text), 'light' (white 3D text)
  size = 'medium', // 'small', 'medium', 'large', 'xlarge'
  showSubtitle = true,
  className = ''
}) {
  // Height mappings for exact responsive scaling (larger display)
  const heightMap = {
    small: showSubtitle ? 42 : 30,
    medium: showSubtitle ? 60 : 44,
    large: showSubtitle ? 95 : 72,
    xlarge: showSubtitle ? 145 : 110
  };

  const h = heightMap[size] || heightMap.medium;

  const logoSrc = variant === 'light'
    ? '/images/dulopes_logo_white.png'
    : '/images/dulopes_logo_official.png';

  // Deep shadow behind letters for realistic 3D depth and projection
  const logoFilter = variant === 'light'
    ? 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.85)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6))'
    : 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.45)) drop-shadow(0 2px 5px rgba(11, 37, 69, 0.4))';

  return (
    <div
      className={`dulopes-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
    >
      <img
        src={logoSrc}
        alt="Dulopes Máquinas e Equipamentos"
        style={{
          height: `${h}px`,
          width: 'auto',
          objectFit: 'contain',
          filter: logoFilter,
          transition: 'transform 0.2s ease'
        }}
      />
    </div>
  );
}

