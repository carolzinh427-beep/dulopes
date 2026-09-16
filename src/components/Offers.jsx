import React from 'react';
import { Tag, CheckCircle2, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { offers, companyConfig } from '../data/companyData';

export default function Offers({ onOpenCatalog }) {
  const handleWhatsAppOfferClick = (offerTitle) => {
    const message = encodeURIComponent(`Olá! Vi a oportunidade "${offerTitle}" no site da Dulopes e gostaria de consultar as condições comerciais disponíveis.`);
    window.open(`https://wa.me/${companyConfig.whatsappFormatted}?text=${message}`, '_blank');
  };

  return (
    <section id="ofertas" style={{
      padding: '4.5rem 0',
      backgroundColor: 'var(--navy-dark)',
      color: 'var(--white)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Accent */}
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255,107,0,0.1) 0%, rgba(10,25,47,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-tag section-tag-dark" style={{ margin: '0 auto 0.85rem auto' }}>
            <Tag size={14} color="var(--orange-main)" />
            <span>OPORTUNIDADES DE NEGÓCIO</span>
          </div>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>
            Ofertas e oportunidades
          </h2>
          <p className="section-subtitle" style={{ color: '#CBD5E1', margin: '0 auto' }}>
            Confira equipamentos em destaque e consulte condições especiais para equipar sua linha de produção.
          </p>
        </div>

        {/* Offers Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {offers.map((offer) => (
            <div
              key={offer.id}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 107, 0, 0.3)',
                borderRadius: 'var(--border-radius-lg)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Top Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span style={{
                  backgroundColor: 'var(--orange-main)',
                  color: 'var(--white)',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--border-radius-sm)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {offer.destaqueBadge}
                </span>
                <Sparkles size={18} color="var(--orange-main)" />
              </div>

              {/* Offer Title & Subtitle */}
              <h3 style={{
                color: 'var(--white)',
                fontSize: '1.35rem',
                fontWeight: '800',
                marginBottom: '0.5rem',
                lineHeight: '1.25'
              }}>
                {offer.titulo}
              </h3>
              <p style={{
                color: '#94A3B8',
                fontSize: '0.925rem',
                marginBottom: '1.5rem',
                lineHeight: '1.5'
              }}>
                {offer.subtitulo}
              </p>

              {/* Benefits Bullet List */}
              <div style={{
                backgroundColor: 'rgba(10, 25, 47, 0.6)',
                borderRadius: 'var(--border-radius-md)',
                padding: '1.25rem',
                marginBottom: '1.75rem',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {offer.beneficios.map((ben, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: '#E2E8F0' }}>
                      <CheckCircle2 size={16} color="var(--orange-main)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleWhatsAppOfferClick(offer.titulo)}
                className="btn btn-orange btn-full"
                style={{ padding: '0.9rem 1.25rem', fontSize: '0.95rem' }}
              >
                <MessageCircle size={18} />
                <span>{offer.ctaText}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
