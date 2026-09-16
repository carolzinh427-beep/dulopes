import React from 'react';
import { Eye, MessageCircle, Shield, CheckCircle2 } from 'lucide-react';
import { companyConfig } from '../data/companyData';

export default function ProductCard({ product, onOpenModal }) {
  const handleWhatsAppInterest = (e) => {
    e.stopPropagation();
    const message = encodeURIComponent(`Olá! Tenho interesse no equipamento [${product.nome}]. Gostaria de receber mais informações e consultar condições.`);
    window.open(`https://wa.me/${companyConfig.whatsappFormatted}?text=${message}`, '_blank');
  };

  const isProntaEntrega = product.status === "Pronta Entrega";

  return (
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
      {/* Product Image Area */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4/3',
        backgroundColor: '#0F172A',
        overflow: 'hidden'
      }}>
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
          zIndex: 2
        }}>
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
          zIndex: 2
        }}>
          <span className="badge" style={{ backgroundColor: 'rgba(10, 25, 47, 0.85)', color: 'var(--white)', backdropFilter: 'blur(4px)' }}>
            INOX 304
          </span>
        </div>
      </div>

      {/* Product Content Body */}
      <div style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Category Tag */}
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '700',
            color: 'var(--orange-main)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.35rem'
          }}>
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
          }}>
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
          }}>
            {product.descricao}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--gray-light)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button
              onClick={() => onOpenModal(product)}
              className="btn btn-outline-navy"
              style={{ padding: '0.65rem 0.5rem', fontSize: '0.825rem' }}
            >
              <Eye size={15} />
              <span>Ver detalhes</span>
            </button>

            <button
              onClick={handleWhatsAppInterest}
              className="btn btn-orange"
              style={{ padding: '0.65rem 0.5rem', fontSize: '0.825rem' }}
            >
              <MessageCircle size={15} />
              <span>Tenho interesse</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
