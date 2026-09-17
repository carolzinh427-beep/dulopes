import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { companyConfig } from '../data/companyData';
import { subscribePublicProducts } from '../services/productService';
import AnimatedContent from './AnimatedContent';
import GlareHover from './GlareHover';

export default function Offers() {
  const [newArrivals, setNewArrivals] = useState([]);

  // Subscribe to real-time products to show active products in "Acabaram de chegar"
  useEffect(() => {
    const unsubscribe = subscribePublicProducts((data) => {
      const highlighted = data.filter(p => p.highlight || p.destaque);
      if (highlighted.length > 0) {
        setNewArrivals(highlighted.slice(0, 2));
      } else {
        setNewArrivals(data.slice(0, 2));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleWhatsAppOfferClick = (title) => {
    const message = encodeURIComponent(`Olá! Vi o equipamento "${title}" no site da Dulopes e gostaria de consultar as condições no WhatsApp.`);
    window.open(`https://wa.me/${companyConfig.whatsappFormatted}?text=${message}`, '_blank');
  };

  return (
    <section id="ofertas" style={{
      padding: '3.5rem 0',
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

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '820px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="section-title" style={{ color: 'var(--white)', fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)' }}>
            Acabaram de chegar
          </h2>
          <p className="section-subtitle" style={{ color: '#CBD5E1', margin: '0 auto', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
            Confira equipamentos em destaque e consulte condições especiais para equipar sua linha de produção.
          </p>
        </div>

        {/* Product Cards Grid - Prominent & Tall Vertical Format */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          justifyContent: 'center'
        }} className="offers-grid">
          {newArrivals.map((item, idx) => (
            <AnimatedContent
              key={item.id}
              distance={40}
              direction="vertical"
              duration={0.6}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={0.97}
              threshold={0.15}
              delay={idx * 0.1}
            >
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 'var(--border-radius-md)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                  height: '100%'
                }}
                className="offer-card"
              >
                {/* Image container - GlareHover vertical format */}
                <GlareHover
                  width="100%"
                  glareColor="#ffffff"
                  glareOpacity={0.4}
                  glareAngle={-35}
                  glareSize={250}
                  transitionDuration={700}
                >
                  <div style={{ height: '240px', backgroundColor: '#0F172A', overflow: 'hidden', position: 'relative' }} className="offer-img-box">
                    <img
                      src={item.mainImage || (item.images && item.images[0]) || '/images/envasadora_inox.jpg'}
                      alt={item.name || item.nome}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </GlareHover>

                {/* Card Body */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="offer-body">
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--white)', margin: '0 0 0.5rem 0', lineHeight: '1.3' }} className="offer-title">
                      {item.name || item.nome}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: '1.25rem', lineHeight: '1.5' }} className="offer-desc">
                      {item.description || item.descricao}
                    </p>
                  </div>

                  <button
                    onClick={() => handleWhatsAppOfferClick(item.name || item.nome)}
                    className="btn btn-orange btn-full"
                    style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '700' }}
                  >
                    <MessageCircle size={18} />
                    <span>Consultar no WhatsApp</span>
                  </button>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #ofertas {
            padding: 2.5rem 0 !important;
          }
          .offers-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .offer-img-box {
            height: 200px !important;
          }
          .offer-body {
            padding: 1rem !important;
          }
          .offer-title {
            font-size: 1rem !important;
          }
          .offer-desc {
            font-size: 0.825rem !important;
            margin-bottom: 1rem !important;
            -webkit-line-clamp: 3 !important;
          }
        }
      `}</style>
    </section>
  );
}

