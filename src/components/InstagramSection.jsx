import React from 'react';
import { Instagram, ExternalLink, Camera } from 'lucide-react';
import { instagramPosts, companyConfig } from '../data/companyData';

export default function InstagramSection() {
  return (
    <section style={{
      padding: '4.5rem 0',
      backgroundColor: 'var(--off-white)',
      borderBottom: '1px solid var(--gray-light)'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title">
            Veja nossos equipamentos na prática
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Acompanhe no Instagram demonstrações de máquinas em operação, entregas e novidades da Dulopes.
          </p>
        </div>

        {/* Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={companyConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="card-hover-effect"
              style={{
                borderRadius: 'var(--border-radius-md)',
                overflow: 'hidden',
                backgroundColor: 'var(--white)',
                border: '1px solid var(--gray-light)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                aspectRatio: '1/1'
              }}
            >
              <img
                src={post.image}
                alt="Dulopes Instagram Post"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* Hover Overlay with Instagram Icon & Caption snippet */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(10, 25, 47, 0.85)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1.25rem',
                color: 'var(--white)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
              >
                <Instagram size={32} color="var(--orange-main)" style={{ marginBottom: '0.75rem' }} />
                <p style={{ fontSize: '0.825rem', lineHeight: '1.4', marginBottom: '0.75rem' }}>
                  {post.caption}
                </p>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: 'var(--orange-main)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  Ver no Instagram <ExternalLink size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: 'center' }}>
          <a
            href={companyConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-navy"
            style={{ padding: '0.9rem 1.8rem', fontSize: '0.95rem' }}
          >
            <Instagram size={18} color="var(--orange-main)" />
            <span>Conheça nosso Instagram {companyConfig.instagram}</span>
            <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
