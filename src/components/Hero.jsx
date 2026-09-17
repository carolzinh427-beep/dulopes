import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, MapPin, Mail } from 'lucide-react';
import { companyConfig } from '../data/companyData';
import DulopesLogo from './DulopesLogo';
import FoldText from './FoldText';
import SpecularButton from './SpecularButton';
import SplitText from './SplitText';

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

            {/* Main Impact Statement - FoldText Animated Typography */}
            <h1 style={{
              color: '#0B2545',
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: '900',
              lineHeight: '1.15',
              letterSpacing: '-0.025em',
              marginBottom: '1.5rem',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
            }}>
              <FoldText
                text="Precisão e produtividade que chega em todo Brasil"
                splitBy="word"
                hinge="top"
                trigger="mount"
                duration={0.65}
                stagger={0.045}
                ease="power3.out"
                perspective={700}
                creaseShading={0.55}
                fontSize="inherit"
                fontWeight={900}
                color="#0B2545"
              />
            </h1>

            {/* Subtitle with SplitText animation */}
            <SplitText
              tag="p"
              text="Máquinas e equipamentos desenvolvidos para empresas que buscam mais eficiência, qualidade e produtividade"
              splitType="words"
              delay={30}
              duration={0.7}
              textAlign="center"
              style={{
                color: '#1E293B',
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                fontWeight: '600',
                lineHeight: '1.6',
                marginBottom: '2.5rem',
                maxWidth: '700px',
                margin: '0 auto 2.5rem auto',
                textShadow: '0 1px 1px rgba(255, 255, 255, 0.6)'
              }}
            />

            {/* Specular Action Buttons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '3rem'
            }}>
              <SpecularButton
                size="md"
                radius={12}
                tint="#FF6B00"
                tintOpacity={0.95}
                textColor="#ffffff"
                lineColor="#ffffff"
                baseColor="#FF6B00"
                intensity={1.2}
                shineSize={18}
                shineFade={40}
                speed={0.4}
                autoAnimate={true}
                onClick={() => {
                  const el = document.getElementById('catalogo');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Ver máquinas</span>
                <ArrowRight size={20} />
              </SpecularButton>

              <SpecularButton
                size="md"
                radius={12}
                tint="#0B2545"
                tintOpacity={0.95}
                textColor="#ffffff"
                lineColor="#FF6B00"
                baseColor="#0B2545"
                intensity={1.2}
                shineSize={18}
                shineFade={40}
                speed={0.4}
                autoAnimate={true}
                onClick={handleWhatsAppClick}
              >
                <MessageCircle size={20} color="var(--whatsapp-green)" />
                <span>Falar com um especialista</span>
              </SpecularButton>
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
