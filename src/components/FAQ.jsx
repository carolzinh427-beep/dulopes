import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Mail } from 'lucide-react';
import { faqItems, companyConfig } from '../data/companyData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" style={{
      padding: '4.5rem 0',
      backgroundColor: 'var(--white)',
      borderBottom: '1px solid var(--gray-light)'
    }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-tag" style={{ margin: '0 auto 0.85rem auto' }}>
            <HelpCircle size={14} />
            <span>TIRA-DÚVIDAS</span>
          </div>
          <h2 className="section-title">Perguntas frequentes</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Clique em cada pergunta para expandir e ver a resposta detalhada.
          </p>
        </div>

        {/* Accordion List with Clean Indentation (Recuo) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '0.5rem' }}>
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  border: isOpen ? '2px solid var(--orange-main)' : '1px solid var(--gray-light)',
                  borderRadius: 'var(--border-radius-md)',
                  backgroundColor: isOpen ? 'var(--off-white)' : 'var(--white)',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  marginLeft: '0.5rem' // Recuo visual
                }}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem 1.25rem 2rem', // Recuo interno à esquerda
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    gap: '1.25rem',
                    color: isOpen ? 'var(--orange-main)' : 'var(--navy-darker)',
                    fontWeight: '700',
                    fontSize: '1.05rem',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'var(--orange-main)' : 'var(--navy-main)',
                      display: 'inline-block',
                      flexShrink: 0
                    }} />
                    <span>{item.pergunta}</span>
                  </div>

                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isOpen ? 'var(--orange-light)' : 'var(--off-white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <ChevronDown size={20} color={isOpen ? 'var(--orange-main)' : 'var(--gray-dark)'} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 1.5rem 1.5rem 2.85rem', // Resposta com recuo alinhado ao texto da pergunta
                    color: 'var(--gray-dark)',
                    fontSize: '0.95rem',
                    lineHeight: '1.65',
                    borderTop: '1px solid rgba(0,0,0,0.05)',
                    paddingTop: '1rem',
                    animation: 'fadeIn 0.2s ease forwards'
                  }}>
                    <p>{item.resposta}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ Direct Contact Support Note with Email */}
        <div style={{
          marginTop: '3rem',
          textAlign: 'center',
          backgroundColor: 'var(--off-white)',
          padding: '1.75rem',
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--gray-light)'
        }}>
          <p style={{ fontSize: '1rem', color: 'var(--navy-darker)', fontWeight: '700', marginBottom: '1rem' }}>
            Ainda tem alguma dúvida técnica sobre um equipamento?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/${companyConfig.whatsappFormatted}?text=${encodeURIComponent('Olá! Tenho uma dúvida técnica sobre um equipamento Dulopes.')}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
              style={{ padding: '0.8rem 1.4rem', fontSize: '0.9rem' }}
            >
              <MessageCircle size={18} />
              <span>Tirar Dúvida no WhatsApp</span>
            </a>

            <a
              href={`mailto:${companyConfig.email}`}
              className="btn btn-navy"
              style={{ padding: '0.8rem 1.4rem', fontSize: '0.9rem' }}
            >
              <Mail size={18} color="var(--orange-main)" />
              <span>{companyConfig.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
