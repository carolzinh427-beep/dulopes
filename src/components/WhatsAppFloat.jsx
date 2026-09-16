import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { companyConfig } from '../data/companyData';

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleFloatClick = () => {
    const message = encodeURIComponent(`Olá! Estou no site da Dulopes e gostaria de tirar dúvidas sobre máquinas e equipamentos em inox.`);
    window.open(`https://wa.me/${companyConfig.whatsappFormatted}?text=${message}`, '_blank');
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 9900,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '0.5rem'
    }}>
      {/* Popover Tooltip */}
      {showTooltip && (
        <div style={{
          backgroundColor: 'var(--navy-dark)',
          color: 'var(--white)',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--border-radius-md)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 107, 0, 0.4)',
          fontSize: '0.825rem',
          maxWidth: '220px',
          position: 'relative',
          animation: 'fadeIn 0.3s ease forwards'
        }}>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Fechar Notificação"
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              color: '#94A3B8',
              padding: '2px'
            }}
          >
            <X size={12} />
          </button>
          <div style={{ fontWeight: '800', color: 'var(--orange-main)', marginBottom: '0.2rem' }}>
            Fale conosco agora
          </div>
          <div>Precisão e atendimento comercial para todo o Brasil!</div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleFloatClick}
        aria-label="Atendimento via WhatsApp"
        className="whatsapp-pulse"
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          backgroundColor: 'var(--whatsapp-green)',
          color: 'var(--white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.5)',
          position: 'relative'
        }}
      >
        <MessageCircle size={32} />

        {/* Online Dot */}
        <span style={{
          position: 'absolute',
          top: '2px',
          right: '2px',
          width: '14px',
          height: '14px',
          backgroundColor: '#4ADE80',
          border: '2px solid var(--white)',
          borderRadius: '50%'
        }} />
      </button>
    </div>
  );
}
