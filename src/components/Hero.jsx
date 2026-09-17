import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Award, MapPin } from 'lucide-react';
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
      paddingTop: '3rem',
      paddingBottom: '5rem',
      borderBottom: '3px solid var(--orange-main)'
    }}>
      {/* Geometric background accents */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,0,0.14) 0%, rgba(10,25,47,0) 70%)',
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
        }} className="hero-grid">

          {/* Left Column: Official Logo + Hero Content */}
          <div style={{ color: 'var(--white)' }}>

            {/* Prominent Official Logo with Animated Spinning Gear */}
            <div style={{ marginBottom: '1.5rem' }}>
              <DulopesLogo variant="light" size="large" showSubtitle={true} />
            </div>

            {/* Small Support Tag */}
            <div className="section-tag section-tag-dark" style={{ marginBottom: '1.25rem' }}>
              <Award size={14} color="var(--orange-main)" />
              <span>MÁQUINAS E EQUIPAMENTOS PROFISSIONAIS</span>
            </div>

            {/* Main Title */}
            <h1 style={{
              color: 'var(--white)',
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              fontWeight: '800',
              lineHeight: '1.15',
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem'
            }}>
              "Precisão e produtividade que chega em <span style={{
                color: 'var(--orange-main)',
                position: 'relative',
                display: 'inline-block'
              }}>
                todo Brasil
              </span>"
            </h1>

            {/* Subtitle */}
            <p style={{
              color: '#CBD5E1',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: '1.6',
              marginBottom: '2rem',
              maxWidth: '580px'
            }}>
              Máquinas e equipamentos desenvolvidos para empresas que buscam mais eficiência, qualidade e produtividade.
            </p>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              marginBottom: '2.5rem'
            }}>
              <a href="#catalogo" className="btn btn-orange" style={{ padding: '0.95rem 1.8rem', fontSize: '1rem' }}>
                <span>Ver máquinas</span>
                <ArrowRight size={18} />
              </a>

              <button onClick={handleWhatsAppClick} className="btn btn-outline-white" style={{ padding: '0.95rem 1.6rem', fontSize: '1rem' }}>
                <MessageCircle size={18} color="var(--whatsapp-green)" />
                <span>Falar com um especialista</span>
              </button>
            </div>

            {/* Quick Micro Features */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94A3B8', fontSize: '0.85rem' }}>
                <ShieldCheck size={16} color="var(--orange-main)" />
                <span>Aço Inox AISI 304</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94A3B8', fontSize: '0.85rem' }}>
                <MapPin size={16} color="var(--orange-main)" />
                <span>Envio para todo o Brasil</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase with React Bits CircularText Component */}
          <div style={{ position: 'relative' }}>
            {/* React Bits CircularText Component Overlay */}
            <div style={{
              position: 'absolute',
              top: '-45px',
              right: '-45px',
              zIndex: 10,
              pointerEvents: 'auto'
            }} className="circular-text-container">
              <CircularText
                text="DULOPES * MÁQUINAS * INOX * BRASIL * "
                spinDuration={16}
                onHover="speedUp"
              />
            </div>

            {/* Main Showcase Container */}
            <div style={{
              position: 'relative',
              borderRadius: 'var(--border-radius-lg)',
              padding: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 107, 0, 0.3)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{
                borderRadius: 'var(--border-radius-md)',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '4/3',
                backgroundColor: '#050E1A'
              }}>
                <img
                  src="/images/hero_equipment.jpg"
                  alt="Linha de Máquinas e Equipamentos Dulopes Inox"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />

                {/* Overlaid Tech Card */}
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  right: '1rem',
                  backgroundColor: 'rgba(10, 25, 47, 0.88)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 107, 0, 0.4)',
                  padding: '0.85rem 1.15rem',
                  borderRadius: 'var(--border-radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ color: 'var(--orange-main)', fontSize: '0.725rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Padrão de Fabricação
                    </div>
                    <div style={{ color: 'var(--white)', fontWeight: '700', fontSize: '0.925rem' }}>
                      Aço Inoxidável & Tecnologia Industrial
                    </div>
                  </div>
                  <div style={{
                    backgroundColor: 'var(--orange-main)',
                    color: 'var(--white)',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--border-radius-sm)',
                    whiteSpace: 'nowrap'
                  }}>
                    INOX 304
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing Backdrop Circle */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '-20px',
              width: '100px',
              height: '100px',
              backgroundColor: 'var(--orange-main)',
              filter: 'blur(60px)',
              opacity: 0.3,
              zIndex: -1
            }} />
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
        @media (max-width: 640px) {
          .circular-text-container {
            transform: scale(0.7) !important;
            top: -65px !important;
            right: -65px !important;
          }
        }
      `}</style>
    </section>
  );
}
