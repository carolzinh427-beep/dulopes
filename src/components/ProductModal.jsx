import React, { useState } from 'react';
import { X, MessageCircle, ShieldCheck, CheckCircle2, ChevronRight, FileText, Wrench } from 'lucide-react';
import { companyConfig } from '../data/companyData';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Olá! Tenho interesse no equipamento ${product.nome}. Gostaria de receber mais informações.`);
    window.open(`https://wa.me/${companyConfig.whatsappFormatted}?text=${message}`, '_blank');
  };

  const isProntaEntrega = product.status === "Pronta Entrega";

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(5, 14, 26, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div style={{
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--border-radius-lg)',
        width: '100%',
        maxWidth: '960px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
        animation: 'fadeIn 0.25s ease forwards'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fechar Modal"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--navy-dark)',
            color: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
            border: '2px solid var(--orange-main)'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Layout Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          padding: '1.75rem'
        }} className="modal-grid">

          {/* Left Column: Image Gallery */}
          <div>
            {/* Main Featured Image */}
            <div style={{
              borderRadius: 'var(--border-radius-md)',
              overflow: 'hidden',
              backgroundColor: '#0F172A',
              aspectRatio: '4/3',
              marginBottom: '1rem',
              border: '1px solid var(--gray-light)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <img
                src={product.imagens[activeImgIndex] || product.imagens[0]}
                alt={product.nome}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Thumbnails Gallery */}
            {product.imagens.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {product.imagens.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    style={{
                      width: '72px',
                      height: '54px',
                      borderRadius: 'var(--border-radius-sm)',
                      overflow: 'hidden',
                      border: activeImgIndex === idx ? '3px solid var(--orange-main)' : '2px solid var(--gray-light)',
                      opacity: activeImgIndex === idx ? 1 : 0.6,
                      transition: 'all 0.2s',
                      flexShrink: 0
                    }}
                  >
                    <img src={img} alt={`Miniatura ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Confidence Banner inside Modal */}
            <div style={{
              marginTop: '1.25rem',
              padding: '0.85rem 1rem',
              backgroundColor: 'var(--off-white)',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--gray-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <ShieldCheck size={24} color="var(--orange-main)" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--gray-dark)' }}>
                <strong>Garantia Fabril Dulopes:</strong> Equipamentos inspecionados com suporte comercial dedicado para todo o Brasil.
              </div>
            </div>
          </div>

          {/* Right Column: Details & Technical Specifications */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Category & Status */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span className="badge badge-category">
                  {product.categoria === 'maquinas' ? 'Máquina Industrial' : 'Equipamento Inox'}
                </span>
                <span className={`badge ${isProntaEntrega ? 'badge-status' : 'badge-status-encomenda'}`}>
                  <CheckCircle2 size={12} />
                  {product.status}
                </span>
              </div>

              {/* Product Title */}
              <h2 style={{
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                fontWeight: '800',
                color: 'var(--navy-darker)',
                marginBottom: '0.85rem',
                lineHeight: '1.25'
              }}>
                {product.nome}
              </h2>

              {/* Complete Description */}
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--gray-dark)',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                {product.descricaoCompleta || product.descricao}
              </p>

              {/* Technical Specifications Table */}
              {product.especificacoes && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '800',
                    color: 'var(--navy-main)',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}>
                    <Wrench size={16} color="var(--orange-main)" />
                    <span>Especificações Técnicas</span>
                  </div>

                  <div style={{
                    border: '1px solid var(--gray-light)',
                    borderRadius: 'var(--border-radius-md)',
                    overflow: 'hidden'
                  }}>
                    {Object.entries(product.especificacoes).map(([key, val], idx) => (
                      <div
                        key={key}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '0.65rem 0.85rem',
                          fontSize: '0.85rem',
                          backgroundColor: idx % 2 === 0 ? 'var(--white)' : 'var(--off-white)',
                          borderBottom: idx === Object.keys(product.especificacoes).length - 1 ? 'none' : '1px solid var(--gray-light)'
                        }}
                      >
                        <span style={{ fontWeight: '700', color: 'var(--navy-darker)' }}>{key}:</span>
                        <span style={{ color: 'var(--gray-dark)', textAlign: 'right' }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions & WhatsApp CTA */}
            <div style={{
              paddingTop: '1rem',
              borderTop: '1px solid var(--gray-light)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.775rem', color: 'var(--gray-dark)', display: 'block' }}>
                    Condição comercial:
                  </span>
                  <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--orange-main)' }}>
                    {product.preco ? `R$ ${product.preco}` : 'Consulte condições'}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-mid)', textAlign: 'right' }}>
                  Atendimento direto<br />via WhatsApp
                </div>
              </div>

              {/* Prominent WhatsApp CTA */}
              <button
                onClick={handleWhatsAppClick}
                className="btn btn-whatsapp btn-full"
                style={{ padding: '0.95rem 1.25rem', fontSize: '1rem' }}
              >
                <MessageCircle size={20} />
                <span>Tenho interesse neste equipamento</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr 1.1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
