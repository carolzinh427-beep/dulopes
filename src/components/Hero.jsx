import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, MapPin, Mail } from 'lucide-react';
import { companyConfig } from '../data/companyData';
import DulopesLogo from './DulopesLogo';
import CircularText from './CircularText';

export default function Hero() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Olá! Gostaria de falar com um especialista sobre as máquinas e equipamentos da Dulopes.`);
    window.open(`https://wa.me/${companyConfig.whatsappFormatted}?text=${message}`, '_blank');
  };

  return (
    <section id="inicio" style={{
      backgroundColor: 'var(--navy-dark)',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '3.5rem',
      paddingBottom: '5rem',
      borderBottom: '3px solid var(--orange-main)'
    }}>
      {/* Background radial glowing accents */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '10%',
        width: '550px',
        height: '550px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,0,0.15) 0%, rgba(10,25,47,0) 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center'
        }} className="hero-grid-no-img">

          {/* Clean Hero Layout centered around Official Logo & Impact Statement */}
          <div style={{ color: 'var(--white)', maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>

            {/* Official Logo with Animated Rotating Gear */}
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
              <DulopesLogo variant="light" size="large" showSubtitle={true} />
            </div>

            {/* Main Title - Without Quotes, Without Period */}
            <h1 style={{
              color: 'var(--white)',
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              fontWeight: '900',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem'
            }}>
              Precisão e produtividade que chega em <span style={{
                color: 'var(--orange-main)',
                position: 'relative',
                display: 'inline-block'
              }}>
                todo Brasil
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{
              color: '#CBD5E1',
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              lineHeight: '1.6',
              marginBottom: '2.5rem',
              maxWidth: '680px',
              margin: '0 auto 2.5rem auto'
            }}>
              Máquinas e equipamentos desenvolvidos para empresas que buscam mais eficiência, qualidade e produtividade
            </p>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '3rem'
            }}>
              <a href="#catalogo" className="btn btn-orange" style={{ padding: '1.05rem 2rem', fontSize: '1.05rem' }}>
                <span>Ver máquinas</span>
                <ArrowRight size={20} />
              </a>

              <button onClick={handleWhatsAppClick} className="btn btn-outline-white" style={{ padding: '1.05rem 1.8rem', fontSize: '1.05rem' }}>
                <MessageCircle size={20} color="var(--whatsapp-green)" />
                <span>Falar com um especialista</span>
              </button>
            </div>

            {/* Quick Feature Badges & Email */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              paddingTop: '1.75rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94A3B8',
              fontSize: '0.9rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={18} color="var(--orange-main)" />
                <span>Aço Inox AISI 304</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} color="var(--orange-main)" />
                <span>Envio para todo o Brasil</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={18} color="var(--orange-main)" />
                <a href={`mailto:${companyConfig.email}`} style={{ color: '#E2E8F0', textDecoration: 'none' }}>
                  {companyConfig.email}
                </a>
              </div>
            </div>

          </div>

          {/* Overlaid CircularText Decorative Badge */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            opacity: 0.85,
            pointerEvents: 'auto'
          }} className="hero-circular-badge">
            <CircularText
              text="DULOPES * MÁQUINAS * INOX * BRASIL * "
              spinDuration={16}
              onHover="speedUp"
            />
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-circular-badge {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
