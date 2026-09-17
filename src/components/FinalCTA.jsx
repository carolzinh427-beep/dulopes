import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { companyConfig } from '../data/companyData';

export default function FinalCTA() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Olá! Gostaria de falar com um especialista e consultar informações sobre o equipamento ideal para minha operação.`);
    window.open(`https://wa.me/${companyConfig.whatsappFormatted}?text=${message}`, '_blank');
  };

  return (
    <section id="contato" style={{
      padding: '4.5rem 0',
      backgroundColor: 'var(--navy-dark)',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '3px solid var(--orange-main)'
    }}>
      {/* Background Graphic Accents */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255,107,0,0.15) 0%, rgba(10,25,47,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px' }}>
        {/* Main Title */}
        <h2 style={{
          fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
          fontWeight: '800',
          color: 'var(--white)',
          marginBottom: '1.25rem',
          lineHeight: '1.2'
        }}>
          Encontre o equipamento ideal para sua operação
        </h2>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: '#CBD5E1',
          lineHeight: '1.6',
          marginBottom: '2.5rem',
          margin: '0 auto 2.5rem auto'
        }}>
          Fale com nossa equipe e consulte disponibilidade, condições e informações sobre o equipamento que você procura.
        </p>

        {/* Big Orange WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="btn btn-orange"
          style={{
            padding: '1.15rem 2.25rem',
            fontSize: '1.1rem',
            boxShadow: '0 12px 35px rgba(255, 107, 0, 0.45)',
            margin: '0 auto'
          }}
        >
          <MessageCircle size={22} />
          <span>Falar com especialista no WhatsApp</span>
          <ArrowRight size={20} />
        </button>

        {/* Contact Info Footer Line */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.5rem',
          marginTop: '2.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '0.875rem',
          color: '#94A3B8',
          flexWrap: 'wrap'
        }}>
          <span>WhatsApp: {companyConfig.whatsappDisplay}</span>
          <span>•</span>
          <span>Atendimento em todo o Brasil</span>
          <span>•</span>
          <span>Cariacica - ES</span>
        </div>
      </div>
    </section>
  );
}
