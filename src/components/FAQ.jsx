import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Mail } from 'lucide-react';
import { faqItems, companyConfig } from '../data/companyData';

export default function FAQ() {
  const [isSectionOpen, setIsSectionOpen] = useState(false); // Collapsed by default (Single Line)
  const [openIndex, setOpenIndex] = useState(null); // Individual question toggle

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" style={{
      padding: '1.25rem 0',
      backgroundColor: 'var(--white)',
      borderBottom: '1px solid var(--gray-light)'
    }}>
      <div className="container" style={{ maxWidth: '720px' }}>

        {/* Single Line Expandable Bar - Saves Space */}
        <button
          onClick={() => setIsSectionOpen(!isSectionOpen)}
          style={{
            width: '100%',
            padding: '0.85rem 1.25rem',
            backgroundColor: isSectionOpen ? 'var(--navy-dark)' : 'var(--off-white)',
            color: isSectionOpen ? 'var(--white)' : 'var(--navy-darker)',
            border: '1px solid var(--gray-light)',
            borderRadius: 'var(--border-radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            fontWeight: '800',
            fontSize: '0.95rem',
            transition: 'all 0.25s ease',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <HelpCircle size={18} color="var(--orange-main)" />
            <span>Perguntas Frequentes — Clique para abrir e ver ({faqItems.length})</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.8rem',
            color: isSectionOpen ? 'var(--orange-main)' : 'var(--gray-dark)'
          }}>
            <span>{isSectionOpen ? 'Fechar' : 'Abrir'}</span>
            <ChevronDown
              size={18}
              style={{
                transform: isSectionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.25s ease'
              }}
            />
          </div>
        </button>

        {/* Expandable Body Content */}
        {isSectionOpen && (
          <div style={{
            marginTop: '1rem',
            animation: 'fadeIn 0.25s ease forwards'
          }}>
            {/* Accordion List with Indentation & Compact Size */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', paddingLeft: '0.5rem' }}>
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
                      marginLeft: '0.5rem'
                    }}
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        gap: '0.85rem',
                        color: isOpen ? 'var(--orange-main)' : 'var(--navy-darker)',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
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
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: isOpen ? 'var(--orange-light)' : 'var(--off-white)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease'
                      }}>
                        <ChevronDown size={14} color={isOpen ? 'var(--orange-main)' : 'var(--gray-dark)'} />
                      </div>
                    </button>

                    {isOpen && (
                      <div style={{
                        padding: '0 1rem 1rem 2rem',
                        color: 'var(--gray-dark)',
                        fontSize: '0.85rem',
                        lineHeight: '1.55',
                        borderTop: '1px solid rgba(0,0,0,0.05)',
                        paddingTop: '0.75rem',
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
              marginTop: '1.25rem',
              textAlign: 'center',
              backgroundColor: 'var(--off-white)',
              padding: '1rem',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--gray-light)'
            }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--navy-darker)', fontWeight: '700', marginBottom: '0.65rem' }}>
                Ainda tem alguma dúvida técnica sobre um equipamento?
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/${companyConfig.whatsappFormatted}?text=${encodeURIComponent('Olá! Tenho uma dúvida técnica sobre um equipamento Dulopes.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.8rem' }}
                >
                  <MessageCircle size={15} />
                  <span>Tirar Dúvida no WhatsApp</span>
                </a>

                <a
                  href={`mailto:${companyConfig.email}`}
                  className="btn btn-navy"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.8rem' }}
                >
                  <Mail size={15} color="var(--orange-main)" />
                  <span>{companyConfig.email}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
