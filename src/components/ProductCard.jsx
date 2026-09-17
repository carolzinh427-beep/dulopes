import React from 'react';
import { Eye, MessageCircle, Shield, CheckCircle2 } from 'lucide-react';
import { companyConfig } from '../data/companyData';
import AnimatedContent from './AnimatedContent';
import GlareHover from './GlareHover';

export default function ProductCard({ product, onOpenModal }) {
  const handleWhatsAppInterest = (e) => {
    e.stopPropagation();
    const message = encodeURIComponent(`Olá! Tenho interesse no equipamento [${product.nome}]. Gostaria de receber mais informações e consultar condições.`);
    window.open(`https://wa.me/${companyConfig.whatsappFormatted}?text=${message}`, '_blank');
  };

  const isProntaEntrega = product.status === "Pronta Entrega";

  return (
    <AnimatedContent
      distance={40}
      direction="vertical"
      duration={0.6}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      scale={0.97}
      threshold={0.15}
      style={{ height: '100%' }}
    >
      <div
        onClick={() => onOpenModal(product)}
        className="card-hover-effect"
        style={{
          backgroundColor: 'var(--white)',
          borderRadius: 'var(--border-radius-md)',
          overflow: 'hidden',
          border: '1px solid var(--gray-light)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        {/* Product Image Area with GlareHover */}
        <GlareHover
          width="100%"
          glareColor="#ffffff"
          glareOpacity={0.4}
          glareAngle={-35}
          glareSize={250}
          transitionDuration={700}
        >
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4/3',
            backgroundColor: '#0F172A',
            overflow: 'hidden'
          }} className="p-card-img-box">
            <img
              src={product.imagens[0]}
              alt={product.nome}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />

            {/* Status Badge */}
            <div style={{
              position: 'absolute',
              top: '0.75rem',
              left: '0.75rem',
              zIndex: 4
            }} className="p-card-badge-box">
              <span className={`badge ${isProntaEntrega ? 'badge-status' : 'badge-status-encomenda'}`}>
                <CheckCircle2 size={12} />
                {product.status}
              </span>
            </div>

            {/* Feature Tag */}
            <div style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              zIndex: 4
            }} className="p-card-tag-box">
              <span className="badge" style={{ backgroundColor: 'rgba(10, 25, 47, 0.85)', color: 'var(--white)', backdropFilter: 'blur(4px)' }}>
                INOX 304
              </span>
            </div>
          </div>
        </GlareHover>

      {/* Product Content Body */}
      <div style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }} className="p-card-body">
        <div>
          {/* Category Tag */}
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '700',
            color: 'var(--orange-main)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.35rem'
          }} className="p-card-cat">
            {product.categoria === 'maquinas' ? 'Máquinas Industriais' :
             product.categoria === 'inox' ? 'Equipamentos em Inox' :
             product.categoria === 'industria' ? 'Automação & Indústria' :
             product.categoria === 'alimentos' ? 'Processamento Alimentício' :
             product.categoria === 'compactos' ? 'Equipamento Compacto' : 'Equipamento Profissional'}
          </div>

          {/* Product Name */}
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '800',
            color: 'var(--navy-darker)',
            marginBottom: '0.5rem',
            lineHeight: '1.3'
          }} className="p-card-title">
            {product.nome}
          </h3>

          {/* Short Description */}
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--gray-dark)',
            lineHeight: '1.5',
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }} className="p-card-desc">
            {product.descricao}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--gray-light)' }} className="p-card-footer">
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }} className="p-card-price-row">
            <span style={{ fontSize: '0.775rem', color: 'var(--gray-dark)', fontWeight: '600' }}>
              Condições:
            </span>
            <span style={{
              fontSize: '1.05rem',
              fontWeight: '800',
              color: 'var(--orange-main)'
            }}>
              {product.preco ? `R$ ${product.preco}` : 'Consulte condições'}
            </span>
          </div>

          {/* Two CTAs: Details and WhatsApp */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }} className="p-card-actions">
            <button
              onClick={() => onOpenModal(product)}
              className="btn btn-outline-navy p-card-btn-details"
              style={{ padding: '0.65rem 0.5rem', fontSize: '0.825rem', width: '100%', justifyContent: 'center' }}
            >
              <Eye size={15} />
              <span>Ver detalhes</span>
            </button>

            <button
              onClick={handleWhatsAppInterest}
              className="btn p-card-btn-interest"
              style={{
                padding: '0.65rem 0.5rem',
                fontSize: '0.825rem',
                backgroundColor: '#050E1A',
                color: '#FFFFFF',
                border: '1px solid #1E293B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <MessageCircle size={15} color="var(--whatsapp-green)" />
              <span>Tenho interesse</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <style>{`
      @media (max-width: 640px) {
        .p-card-body {
          padding: 0.5rem !important;
        }
        .p-card-img-box {
          aspect-ratio: 4/3 !important;
        }
        .p-card-badge-box, .p-card-tag-box {
          top: 0.35rem !important;
          left: 0.35rem !important;
          right: 0.35rem !important;
        }
        .p-card-badge-box .badge, .p-card-tag-box .badge {
          font-size: 0.6rem !important;
          padding: 2px 5px !important;
        }
        .p-card-cat {
          font-size: 0.625rem !important;
          margin-bottom: 0.2rem !important;
        }
        .p-card-title {
          font-size: 0.8rem !important;
          margin-bottom: 0.35rem !important;
          line-height: 1.2 !important;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .p-card-desc {
          display: none !important;
        }
        .p-card-footer {
          padding-top: 0.35rem !important;
        }
        .p-card-price-row {
          display: none !important;
        }
        .p-card-actions {
          grid-template-columns: 1fr !important;
          gap: 0 !important;
        }
        .p-card-btn-interest {
          display: none !important;
        }
        .p-card-btn-details {
          width: 100% !important;
          padding: 0.45rem 0.25rem !important;
          font-size: 0.725rem !important;
          justify-content: center !important;
        }
      }
    `}</style>
    </AnimatedContent>
  );
}
