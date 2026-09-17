import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Mail } from 'lucide-react';
import { faqItems, companyConfig } from '../data/companyData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null); // Collapsed by default

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" style={{
      padding: '3rem 0',
      backgroundColor: 'var(--white)',
      borderBottom: '1px solid var(--gray-light)'
    }}>
      <div className="container" style={{ maxWidth: '720px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="section-tag" style={{ margin: '0 auto 0.6rem auto' }}>
            <HelpCircle size={14} />
            <span>TIRA-DÚVIDAS</span>
          </div>
          <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Perguntas frequentes</h2>
          <p className="section-subtitle" style={{ margin: '0 auto', fontSize: '0.9rem' }}>
            Clique em cada pergunta para expandir e ver a resposta detalhada.
          </p>
        </div>

        {/* Accordion List with Indentation & Compact Size */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '0.85rem' }}>
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  border: isOpen ? '1px solid var(--orange-main)' : '1px solid var(--gray-light)',
                  borderRadius: 'var(--border-radius-md)',
                  backgroundColor: isOpen ? 'var(--off-white)' : 'var(--white)',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  marginLeft: '0.5rem' // Recuo alinhado
                }}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.15rem 0.85rem 1.5rem', // Recuo interno
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    gap: '1rem',
                    color: isOpen ? 'var(--orange-main)' : 'var(--navy-darker)',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'var(--orange-main)' : 'var(--navy-main)',
                      display: 'inline-block',
                      flexShrink: 0
                    }} />
                    <span>{item.pergunta}</span>
                  </div>

                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: isOpen ? 'var(--orange-light)' : 'var(--off-white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease'
                  }}>
                    <ChevronDown size={16} color={isOpen ? 'var(--orange-main)' : 'var(--gray-dark)'} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 1.25rem 1.15rem 2.35rem',
                    color: 'var(--gray-dark)',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    borderTop: '1px solid rgba(0,0,0,0.05)',
                    paddingTop: '0.85rem',
                    animation: 'fadeIn 0.2s ease forwards'
                  }}>
                    <p>{item.resposta}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Compact Support Box */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          backgroundColor: 'var(--off-white)',
          padding: '1.25rem',
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--gray-light)'
        }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--navy-darker)', fontWeight: '700', marginBottom: '0.75rem' }}>
            Ainda tem alguma dúvida técnica sobre um equipamento?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/${companyConfig.whatsappFormatted}?text=${encodeURIComponent('Olá! Tenho uma dúvida técnica sobre um equipamento Dulopes.')}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{ padding: '0.65rem 1.15rem', fontSize: '0.85rem' }}
            >
              <MessageCircle size={16} />
              <span>Tirar Dúvida no WhatsApp</span>
            </a>

            <a
              href={`mailto:${companyConfig.email}`}
              className="btn btn-navy"
              style={{ padding: '0.65rem 1.15rem', fontSize: '0.85rem' }}
            >
              <Mail size={16} color="var(--orange-main)" />
              <span>{companyConfig.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
