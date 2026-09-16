import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
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
            Respostas diretas para as principais dúvidas sobre nossos equipamentos e atendimento.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
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
                  transition: 'all 0.25s ease'
                }}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    gap: '1rem',
                    color: isOpen ? 'var(--orange-main)' : 'var(--navy-darker)',
                    fontWeight: '700',
                    fontSize: '1.025rem'
                  }}
                >
                  <span>{item.pergunta}</span>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: isOpen ? 'var(--orange-light)' : 'var(--off-white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <ChevronDown size={18} color={isOpen ? 'var(--orange-main)' : 'var(--gray-dark)'} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 1.5rem 1.25rem 1.5rem',
                    color: 'var(--gray-dark)',
                    fontSize: '0.925rem',
                    lineHeight: '1.6',
                    borderTop: '1px solid rgba(0,0,0,0.05)',
                    paddingTop: '0.85rem'
                  }}>
                    <p>{item.resposta}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ WhatsApp Support Note */}
        <div style={{
          marginTop: '2.5rem',
          textAlign: 'center',
          backgroundColor: 'var(--off-white)',
          padding: '1.5rem',
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--gray-light)'
        }}>
          <p style={{ fontSize: '0.925rem', color: 'var(--navy-darker)', fontWeight: '700', marginBottom: '0.75rem' }}>
            Ainda tem alguma dúvida sobre um equipamento específico?
          </p>
          <a
            href={`https://wa.me/${companyConfig.whatsappFormatted}?text=${encodeURIComponent('Olá! Tenho uma dúvida técnica sobre um equipamento Dulopes.')}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp"
            style={{ padding: '0.75rem 1.25rem', fontSize: '0.875rem' }}
          >
            <MessageCircle size={16} />
            <span>Tirar Dúvida no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
