import React from 'react';

export default function DulopesLogo({
  variant = 'dark', // 'dark' (official navy 3D text), 'light' (white 3D text)
  size = 'medium', // 'small', 'medium', 'large', 'xlarge'
  showSubtitle = true,
  className = ''
}) {
  // Height mappings for exact responsive scaling
  const heightMap = {
    small: showSubtitle ? 38 : 28,
    medium: showSubtitle ? 52 : 38,
    large: showSubtitle ? 72 : 54,
    xlarge: showSubtitle ? 96 : 72
  };

  const h = heightMap[size] || heightMap.medium;

  const logoSrc = variant === 'light'
    ? '/images/dulopes_logo_white.png'
    : '/images/dulopes_logo_official.png';

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
          filter: variant === 'light'
            ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))'
            : 'drop-shadow(0 4px 10px rgba(11,37,69,0.25))',
          transition: 'transform 0.2s ease'
        }}
      />
    </div>
  );
}

