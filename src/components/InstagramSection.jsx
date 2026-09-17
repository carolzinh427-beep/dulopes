import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { companyConfig } from '../data/companyData';
import SplitText from './SplitText';

export default function InstagramSection() {
  return (
    <section style={{
      padding: '2.5rem 0',
      backgroundColor: 'var(--off-white)',
      borderBottom: '1px solid var(--gray-light)'
    }}>
      <div className="container" style={{ maxWidth: '720px', textAlign: 'center' }}>
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
        <div>
          <a
            href={companyConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-navy"
            style={{
              padding: '0.85rem 1.75rem',
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}
          >
            <Instagram size={20} color="var(--orange-main)" />
            <span>Siga-nos no Instagram {companyConfig.instagram}</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
