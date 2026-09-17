import React from 'react';
import { MapPin, Globe, Truck, Phone, Navigation } from 'lucide-react';
import { companyConfig } from '../data/companyData';
import SplitText from './SplitText';

export default function NationalCoverage() {
  return (
    <section id="atendemos-brasil" style={{
      padding: '4.5rem 0',
      backgroundColor: 'var(--navy-dark)',
      color: 'var(--white)',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      {/* Background Graphic */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '50%',
        height: '100%',
        opacity: 0.05,
        backgroundImage: 'radial-gradient(circle, #FF6B00 2px, transparent 2px)',
        backgroundSize: '20px 20px',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center'
        }} className="coverage-grid">

          {/* Left Side: Messaging & Address */}
          <div>
            <h2 className="section-title" style={{ color: 'var(--white)', marginBottom: '1.25rem' }}>
              ATENDEMOS TODO O BRASIL
            </h2>

            <SplitText
              tag="p"
              text="Da nossa operação em Cariacica, no Espírito Santo, levamos soluções e equipamentos para empresas em diferentes regiões do país."
              splitType="words"
              delay={35}
              duration={0.7}
              textAlign="left"
              style={{
                fontSize: '1.1rem',
                color: '#CBD5E1',
                lineHeight: '1.6',
                marginBottom: '2rem',
                maxWidth: '560px'
              }}
            />

            {/* Address & Contact Card */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 107, 0, 0.3)',
              borderRadius: 'var(--border-radius-md)',
              padding: '1.5rem',
              marginBottom: '2rem'
            }} className="coverage-card">
              <div style={{ display: 'flex', itemsAlign: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--orange-main)',
                  color: 'var(--white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ color: 'var(--orange-main)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Sede Operacional & Comercial
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--white)' }}>
                    {companyConfig.endereco}
                  </div>
                  <div style={{ fontSize: '0.925rem', color: '#94A3B8' }}>
                    {companyConfig.bairro} — {companyConfig.cidade} / {companyConfig.estado}
                  </div>
                </div>
              </div>

              <div style={{
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                fontSize: '0.875rem',
                color: '#E2E8F0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Truck size={16} color="var(--orange-main)" />
                  <span>Despacho para todos os estados</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={16} color="var(--orange-main)" />
                  <span>{companyConfig.whatsappDisplay}</span>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${companyConfig.whatsappFormatted}?text=${encodeURIComponent('Olá! Gostaria de consultar prazos de entrega e frete para o meu estado.')}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-orange coverage-btn"
              style={{ padding: '0.9rem 1.6rem' }}
            >
              <Navigation size={18} />
              <span>Consultar Envio para Minha Região</span>
            </a>
          </div>

          {/* Right Side: Visual Map Representation Card */}
          <div style={{
            position: 'relative',
            backgroundColor: 'rgba(15, 37, 71, 0.6)',
            borderRadius: 'var(--border-radius-lg)',
            border: '1px solid rgba(255, 107, 0, 0.25)',
            padding: '2rem',
            textAlign: 'center'
          }} className="map-card">
            {/* Visual Route Hub */}
            <div style={{
              width: '100%',
              minHeight: '260px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }} className="hub-box">
              {/* Center Hub: Cariacica ES */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                backgroundColor: 'var(--navy-dark)',
                border: '3px solid var(--orange-main)',
                borderRadius: 'var(--border-radius-md)',
                padding: '1.25rem 2rem',
                boxShadow: '0 0 30px rgba(255, 107, 0, 0.3)'
              }} className="hub-center">
                <div style={{ color: 'var(--orange-main)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.1em' }}>
                  ORIGEM DAS EXPEDIÇÕES
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--white)', marginTop: '0.2rem' }}>
                  CARIACICA - ES
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.25rem' }}>
                  Espírito Santo, Brasil
                </div>
              </div>

              {/* Surrounding Regional Pins */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                width: '100%',
                marginTop: '2rem'
              }} className="regions-grid">
                {['Região Sudeste', 'Região Sul', 'Região Nordeste', 'Região Centro-Oeste', 'Região Norte', 'Exportação/Todo BR'].map((region, idx) => (
                  <div key={idx} style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--border-radius-sm)',
                    padding: '0.6rem 0.5rem',
                    fontSize: '0.785rem',
                    fontWeight: '700',
                    color: '#E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem'
                  }} className="region-chip">
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--orange-main)' }} />
                    <span>{region}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .coverage-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
        @media (max-width: 640px) {
          #atendemos-brasil {
            padding: 1.5rem 0 !important;
          }
          .coverage-grid {
            gap: 1rem !important;
          }
          .coverage-grid h2 {
            font-size: 1.15rem !important;
            margin-bottom: 0.4rem !important;
          }
          .coverage-grid .split-parent {
            font-size: 0.8rem !important;
            margin-bottom: 0.85rem !important;
            line-height: 1.4 !important;
          }
          .coverage-card {
            padding: 0.75rem !important;
            margin-bottom: 0.85rem !important;
          }
          .coverage-btn {
            padding: 0.55rem 0.85rem !important;
            font-size: 0.75rem !important;
            width: 100% !important;
            justify-content: center !important;
          }
          .map-card {
            padding: 0.85rem !important;
          }
          .hub-box {
            min-height: auto !important;
          }
          .hub-center {
            padding: 0.6rem 0.85rem !important;
          }
          .hub-center > div:nth-child(2) {
            font-size: 1rem !important;
          }
          .regions-grid {
            gap: 0.35rem !important;
            margin-top: 0.75rem !important;
          }
          .region-chip {
            padding: 0.3rem 0.2rem !important;
            font-size: 0.65rem !important;
          }
        }
      `}</style>
    </section>
  );
}
