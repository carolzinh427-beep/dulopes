import React, { useState, useEffect } from 'react';
import { Tag, CheckCircle2, MessageCircle, Sparkles, ArrowRight, Package } from 'lucide-react';
import { offers as defaultOffers, companyConfig } from '../data/companyData';
import { subscribePublicProducts } from '../services/productService';

export default function Offers() {
  const [newArrivals, setNewArrivals] = useState([]);

  // Subscribe to real-time products to show the latest active products in "Acabaram de chegar"
  useEffect(() => {
    const unsubscribe = subscribePublicProducts((data) => {
      // Get highlighted or latest 3 products
      const highlighted = data.filter(p => p.highlight || p.destaque);
      if (highlighted.length > 0) {
        setNewArrivals(highlighted.slice(0, 3));
      } else {
        setNewArrivals(data.slice(0, 3));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleWhatsAppOfferClick = (title) => {
    const message = encodeURIComponent(`Olá! Vi a oportunidade "${title}" no site da Dulopes e gostaria de consultar as condições comerciais disponíveis.`);
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
        background: 'radial-gradient(circle, rgba(255,107,0,0.12) 0%, rgba(10,25,47,0) 70%)',
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
            Acabaram de chegar
          </h2>
          <p className="section-subtitle" style={{ color: '#CBD5E1', margin: '0 auto' }}>
            Confira equipamentos em destaque e consulte condições especiais para equipar sua linha de produção.
          </p>
        </div>

        {/* Featured Card (Condições Especiais para Linha de Envase) */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: '2px solid var(--orange-main)',
          borderRadius: 'var(--border-radius-lg)',
          padding: '2rem',
          marginBottom: '2.5rem',
          boxShadow: '0 16px 40px rgba(255, 107, 0, 0.25)',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          alignItems: 'center'
        }} className="featured-arrival-grid">
          
          {/* Card Left Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
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
                Oportunidade Comercial
              </span>
              <Sparkles size={18} color="var(--orange-main)" />
            </div>

            <h3 style={{
              color: 'var(--white)',
              fontSize: 'clamp(1.35rem, 3vw, 1.85rem)',
              fontWeight: '800',
              marginBottom: '0.5rem',
              lineHeight: '1.25'
            }}>
              Condições Especiais para Linha de Envase
            </h3>

            <p style={{
              color: '#94A3B8',
              fontSize: '1.05rem',
              marginBottom: '1.5rem',
              lineHeight: '1.5'
            }}>
              Envasadoras e Dosadoras Pneumáticas com atendimento imediato
            </p>

            {/* Bullet list */}
            <div style={{
              backgroundColor: 'rgba(10, 25, 47, 0.7)',
              borderRadius: 'var(--border-radius-md)',
              padding: '1.25rem',
              marginBottom: '1.75rem',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={16} color="var(--orange-main)" style={{ flexShrink: 0 }} />
                  <span>Estrutura reforçada em Aço Inox AISI 304</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={16} color="var(--orange-main)" style={{ flexShrink: 0 }} />
                  <span>Pronta entrega com suporte comercial dedicado</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={16} color="var(--orange-main)" style={{ flexShrink: 0 }} />
                  <span>Envio garantido para todo o Brasil</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={16} color="var(--orange-main)" style={{ flexShrink: 0 }} />
                  <span>Atendimento direto com especialistas em máquinas</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleWhatsAppOfferClick("Condições Especiais para Linha de Envase")}
              className="btn btn-orange"
              style={{ padding: '0.95rem 1.8rem', fontSize: '1rem' }}
            >
              <MessageCircle size={20} />
              <span>Consultar Condições no WhatsApp</span>
            </button>
          </div>

        </div>

        {/* Dynamic New Arrivals Grid (Managed via Admin Panel) */}
        {newArrivals.length > 0 && (
          <div>
            <h4 style={{ fontSize: '1.15rem', color: 'var(--white)', fontWeight: '800', marginBottom: '1.25rem', textAlign: 'center' }}>
              Equipamentos Recentes Cadastrados no Banco
            </h4>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              {newArrivals.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--border-radius-md)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ height: '180px', backgroundColor: '#0F172A', overflow: 'hidden' }}>
                    <img
                      src={item.mainImage || (item.images && item.images[0]) || '/images/envasadora_inox.jpg'}
                      alt={item.name || item.nome}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ padding: '1.25rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--orange-main)', textTransform: 'uppercase' }}>
                      Novidade no Catálogo
                    </span>
                    <h5 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--white)', margin: '0.35rem 0' }}>
                      {item.name || item.nome}
                    </h5>
                    <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1rem', lineHeight: '1.4' }}>
                      {item.description || item.descricao}
                    </p>

                    <button
                      onClick={() => handleWhatsAppOfferClick(item.name || item.nome)}
                      className="btn btn-orange btn-full"
                      style={{ padding: '0.65rem', fontSize: '0.85rem' }}
                    >
                      <MessageCircle size={16} />
                      <span>Consultar WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <style>{`
        @media (min-width: 900px) {
          .featured-arrival-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
