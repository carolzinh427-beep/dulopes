import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, MapPin, Mail } from 'lucide-react';
import { companyConfig } from '../data/companyData';
import DulopesLogo from './DulopesLogo';

export default function Hero() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Olá! Gostaria de falar com um especialista sobre as máquinas e equipamentos da Dulopes.`);
    window.open(`https://wa.me/${companyConfig.whatsappFormatted}?text=${message}`, '_blank');
  };

  return (
    <section id="inicio" style={{
      backgroundImage: 'url(/images/brushed_steel_bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '4rem',
      paddingBottom: '5.5rem',
      borderBottom: '4px solid var(--orange-main)',
      boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.25)'
    }}>
      {/* Subtle brushed metal sheen gradient overlays */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(240, 243, 246, 0.45) 0%, rgba(220, 226, 233, 0.65) 100%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>

          <div style={{ maxWidth: '840px', width: '100%' }}>

            {/* Logo on Brushed Metal Background - Clean without background box */}
            <div style={{
              marginBottom: '2.5rem',
              display: 'inline-block'
            }}>
              <DulopesLogo variant="dark" size="xlarge" showSubtitle={true} />
            </div>

            {/* Main Impact Statement - Dark Navy Metallic Typography */}
            <h1 style={{
              color: '#0B2545',
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              fontWeight: '900',
              lineHeight: '1.15',
              letterSpacing: '-0.025em',
              marginBottom: '1.5rem',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
            }}>
              Precisão e produtividade que chega em <span style={{
                color: 'var(--orange-main)',
                position: 'relative',
                display: 'inline-block',
                textShadow: '0 2px 8px rgba(255, 107, 0, 0.25)'
              }}>
                todo Brasil
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{
              color: '#1E293B',
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              fontWeight: '600',
              lineHeight: '1.6',
              marginBottom: '2.5rem',
              maxWidth: '700px',
              margin: '0 auto 2.5rem auto',
              textShadow: '0 1px 1px rgba(255, 255, 255, 0.6)'
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
              <a href="#catalogo" className="btn btn-orange" style={{ padding: '1.05rem 2.2rem', fontSize: '1.05rem', boxShadow: '0 10px 25px rgba(255, 107, 0, 0.35)' }}>
                <span>Ver máquinas</span>
                <ArrowRight size={20} />
              </a>

              <button onClick={handleWhatsAppClick} className="btn btn-navy" style={{ padding: '1.05rem 2rem', fontSize: '1.05rem', boxShadow: '0 10px 25px rgba(11, 37, 69, 0.25)' }}>
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
              borderTop: '1px solid rgba(11, 37, 69, 0.15)',
              color: '#334155',
              fontSize: '0.925rem',
              fontWeight: '700'
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
                <a href={`mailto:${companyConfig.email}`} style={{ color: '#0B2545', textDecoration: 'none', fontWeight: '800' }}>
                  {companyConfig.email}
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
