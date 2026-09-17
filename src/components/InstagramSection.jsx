import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { companyConfig } from '../data/companyData';
import SplitText from './SplitText';

export default function InstagramSection() {
  return (
    <section id="instagram-section" style={{
      padding: '2.5rem 0',
      backgroundColor: 'var(--off-white)',
      borderBottom: '1px solid var(--gray-light)',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ maxWidth: '720px', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
        {/* Header */}
        <h2 className="section-title" style={{ fontSize: 'clamp(1.35rem, 3vw, 1.85rem)', marginBottom: '0.5rem' }}>
          Veja nossos equipamentos na prática
        </h2>
        <SplitText
          tag="p"
          className="section-subtitle"
          text="Acompanhe no Instagram demonstrações de máquinas em operação, entregas e novidades da Dulopes."
          splitType="words"
          delay={35}
          duration={0.7}
          textAlign="center"
          style={{ margin: '0 auto 1.5rem auto', fontSize: '0.9rem' }}
        />

        {/* Direct Link Button (No images) */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <a
            href={companyConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-navy insta-btn"
            style={{
              padding: '0.85rem 1.75rem',
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.65rem',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}
          >
            <Instagram size={20} color="var(--orange-main)" style={{ flexShrink: 0 }} />
            <span className="insta-btn-text">Siga-nos no Instagram {companyConfig.instagram}</span>
            <ExternalLink size={16} style={{ flexShrink: 0 }} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #instagram-section {
            padding: 1.5rem 0.5rem !important;
          }
          .insta-btn {
            padding: 0.65rem 0.85rem !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .insta-btn-text {
            font-size: 0.8rem !important;
            white-space: normal !important;
            line-height: 1.2 !important;
          }
        }
      `}</style>
    </section>
  );
}
