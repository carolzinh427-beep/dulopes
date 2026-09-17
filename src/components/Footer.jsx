import React from 'react';
import { Phone, Instagram, MapPin, Globe, Mail, ChevronRight } from 'lucide-react';
import { companyConfig } from '../data/companyData';
import DulopesLogo from './DulopesLogo';
import GhostFibers from './GhostFibers';

export default function Footer() {
  const links = [
    { name: 'Início', href: '#inicio' },
    { name: 'Máquinas', href: '#catalogo' },
    { name: 'Sobre', href: '#por-que-dulopes' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contato', href: '#contato' }
  ];

  return (
    <footer id="footer" style={{
      backgroundColor: '#050E1A',
      color: '#94A3B8',
      paddingTop: '3.5rem',
      paddingBottom: '2rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* GhostFibers Background Shader - Dark Gray & Almost Imperceptible */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.35,
        pointerEvents: 'none',
        zIndex: 1
      }}>
        <GhostFibers
          lineColor="#27272a"
          glowColor="#18181b"
          speed={0.12}
          scale={2.2}
          rotationSpeed={0.1}
          layers={3}
          glowIntensity={0.3}
          brightness={0.5}
          vignette={0.95}
          grain={0.03}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }} className="footer-grid">

          {/* Column 1: Brand & Description */}
          <div className="footer-col footer-col-brand">
            <div style={{ marginBottom: '1rem' }}>
              <img
                src="/images/dulopes_logo_rectangle.jpg"
                alt="Dulopes Máquinas e Equipamentos"
                style={{
                  height: '38px',
                  width: 'auto',
                  borderRadius: '5px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                }}
              />
            </div>

            <p style={{ fontSize: '0.875rem', lineHeight: '1.5', color: '#94A3B8', marginBottom: '1rem' }} className="footer-slogan">
              {companyConfig.slogan}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--orange-main)', fontWeight: '700' }} className="footer-badge">
              <Globe size={15} />
              <span>Atendimento em todo o Brasil</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-col footer-col-nav">
            <h4 style={{ color: 'var(--white)', fontSize: '1rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '0.02em' }}>
              Navegação
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '0.875rem',
                      color: '#94A3B8',
                      transition: 'color 0.2s',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--orange-main)'}
                    onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
                  >
                    <ChevronRight size={13} color="var(--orange-main)" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Address */}
          <div className="footer-col footer-col-contact">
            <h4 style={{ color: 'var(--white)', fontSize: '1rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '0.02em' }}>
              Contato & Sede
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <Phone size={16} color="var(--orange-main)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <div style={{ color: '#E2E8F0', fontWeight: '700' }}>WhatsApp</div>
                  <a href={`https://wa.me/${companyConfig.whatsappFormatted}`} target="_blank" rel="noreferrer" style={{ color: '#94A3B8' }}>
                    {companyConfig.whatsappDisplay}
                  </a>
                </div>
              </li>

              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <Mail size={16} color="var(--orange-main)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <div style={{ color: '#E2E8F0', fontWeight: '700' }}>E-mail Comercial</div>
                  <a href={`mailto:${companyConfig.email}`} style={{ color: '#94A3B8' }}>
                    {companyConfig.email}
                  </a>
                </div>
              </li>

              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <Instagram size={16} color="var(--orange-main)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <div style={{ color: '#E2E8F0', fontWeight: '700' }}>Instagram</div>
                  <a href={companyConfig.instagramUrl} target="_blank" rel="noreferrer" style={{ color: '#94A3B8' }}>
                    {companyConfig.instagram}
                  </a>
                </div>
              </li>

              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={16} color="var(--orange-main)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <div style={{ color: '#E2E8F0', fontWeight: '700' }}>Endereço</div>
                  <div style={{ color: '#94A3B8' }}>
                    {companyConfig.endereco}<br />
                    {companyConfig.bairro} - {companyConfig.cidade} / {companyConfig.estado}
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Sub-Footer Copyright Line */}
        <div style={{
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '0.785rem',
          color: '#64748B'
        }} className="sub-footer">
          <div>
            © {new Date().getFullYear()} {companyConfig.nome}. Todos os direitos reservados.
          </div>
          <div>
            {companyConfig.email} • Cariacica - ES
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #footer {
            padding-top: 1.25rem !important;
            padding-bottom: 1rem !important;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 0.75rem !important;
            margin-bottom: 0.85rem !important;
          }
          .footer-col-brand {
            grid-column: 1 / -1 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            padding-bottom: 0.5rem !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
            margin-bottom: 0.25rem !important;
          }
          .footer-col-brand div {
            margin-bottom: 0 !important;
          }
          .footer-col-brand img {
            height: 28px !important;
          }
          .footer-slogan {
            display: none !important;
          }
          .footer-badge {
            font-size: 0.75rem !important;
          }
          .footer-col-nav {
            grid-column: 1 !important;
          }
          .footer-col-contact {
            grid-column: 2 !important;
          }
          .footer-col-nav h4, .footer-col-contact h4 {
            font-size: 0.825rem !important;
            margin-bottom: 0.4rem !important;
          }
          .footer-col-nav ul {
            gap: 0.3rem !important;
          }
          .footer-col-nav a {
            font-size: 0.75rem !important;
          }
          .footer-col-contact ul {
            gap: 0.4rem !important;
            font-size: 0.72rem !important;
          }
          .footer-col-contact li {
            gap: 0.35rem !important;
          }
          .footer-col-contact svg {
            width: 13px !important;
            height: 13px !important;
            margin-top: 2px !important;
          }
          .sub-footer {
            padding-top: 0.65rem !important;
            font-size: 0.68rem !important;
            flex-direction: column !important;
            gap: 0.2rem !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
