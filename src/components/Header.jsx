import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, Phone, Mail, ChevronRight } from 'lucide-react';
import { companyConfig } from '../data/companyData';
import DulopesLogo from './DulopesLogo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Máquinas', href: '#catalogo' },
    { name: 'Soluções', href: '#solucoes' },
    { name: 'Sobre', href: '#por-que-dulopes' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contato', href: '#contato' }
  ];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Olá! Vim pelo site da Dulopes Máquinas e gostaria de tirar algumas dúvidas.`);
    window.open(`https://wa.me/${companyConfig.whatsappFormatted}?text=${message}`, '_blank');
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Top Ribbon */}
      <div style={{
        backgroundColor: '#050E1A',
        color: '#94A3B8',
        fontSize: '0.8rem',
        padding: '0.4rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--orange-main)',
              display: 'inline-block'
            }} />
            <strong style={{ color: '#F8FAFC' }}>Atendimento em todo o Brasil</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a
              href={`https://wa.me/${companyConfig.whatsappFormatted}`}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#E2E8F0', transition: 'color 0.2s' }}
            >
              <Phone size={13} color="var(--orange-main)" />
              <span>{companyConfig.whatsappDisplay}</span>
            </a>
            <span style={{ opacity: 0.3 }} className="hide-mobile">|</span>
            <a
              href={`mailto:${companyConfig.email}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#E2E8F0', transition: 'color 0.2s' }}
              className="hide-mobile"
            >
              <Mail size={13} color="var(--orange-main)" />
              <span>{companyConfig.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(10, 25, 47, 0.95)' : 'var(--navy-dark)',
        backdropFilter: 'blur(12px)',
        borderBottom: isScrolled ? '1px solid rgba(255, 107, 0, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? '0 10px 30px rgba(5, 14, 26, 0.5)' : 'none'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: isScrolled ? '68px' : '76px',
          transition: 'height 0.3s ease'
        }}>
          {/* Clean Transparent Dulopes Logo */}
          <a href="#inicio" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <DulopesLogo variant="light" size="medium" showSubtitle={true} />
          </a>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none' }} className="desktop-nav">
            <ul style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    style={{
                      color: 'var(--gray-light)',
                      fontSize: '0.925rem',
                      fontWeight: '600',
                      transition: 'color 0.2s ease',
                      padding: '0.4rem 0'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--orange-main)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--gray-light)'}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div style={{ display: 'none' }} className="desktop-cta">
            <button
              onClick={handleWhatsAppClick}
              className="btn btn-orange"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}
            >
              <MessageCircle size={17} />
              <span>Falar no WhatsApp</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir Menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: 'var(--white)',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(5, 14, 26, 0.95)',
          backdropFilter: 'blur(16px)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem',
          animation: 'fadeIn 0.25s ease forwards'
        }}>
          {/* Drawer Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <DulopesLogo variant="light" size="small" showSubtitle={true} />
            <button
              onClick={closeMenu}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'var(--white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Links */}
          <nav style={{ flex: 1 }}>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: 'var(--white)',
                      fontSize: '1.15rem',
                      fontWeight: '700',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={18} color="var(--orange-main)" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Drawer Bottom WhatsApp CTA */}
          <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => {
                handleWhatsAppClick();
                closeMenu();
              }}
              className="btn btn-whatsapp btn-full"
              style={{ padding: '1rem', fontSize: '1rem' }}
            >
              <MessageCircle size={20} />
              <span>Falar com Especialista no WhatsApp</span>
            </button>
            <p style={{
              textAlign: 'center',
              color: 'var(--gray-mid)',
              fontSize: '0.75rem',
              marginTop: '0.85rem'
            }}>
              {companyConfig.email} • Cariacica - ES
            </p>
          </div>
        </div>
      )}

      {/* Media Query CSS for Desktop vs Mobile Display */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 640px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
