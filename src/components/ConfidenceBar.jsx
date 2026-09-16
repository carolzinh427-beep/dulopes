import React from 'react';
import { Truck, ShieldCheck, Headphones, Building2 } from 'lucide-react';

export default function ConfidenceBar() {
  const items = [
    {
      icon: Truck,
      title: "ATENDIMENTO EM TODO O BRASIL",
      subtitle: "Logística e envio para todo o país"
    },
    {
      icon: ShieldCheck,
      title: "EQUIPAMENTOS PROFISSIONAIS",
      subtitle: "Construção em Aço Inox AISI 304"
    },
    {
      icon: Headphones,
      title: "ATENDIMENTO ESPECIALIZADO",
      subtitle: "Consultoria técnica comercial"
    },
    {
      icon: Building2,
      title: "SOLUÇÕES PARA EMPRESAS",
      subtitle: "Para indústrias e comércio"
    }
  ];

  return (
    <section style={{
      backgroundColor: 'var(--navy-main)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '1.25rem 0',
      color: 'var(--white)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          alignItems: 'center'
        }}>
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.5rem 0.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 107, 0, 0.15)',
                borderRadius: 'var(--border-radius-md)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 107, 0, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={20} color="var(--orange-main)" />
                </div>
                <div>
                  <div style={{
                    fontSize: '0.825rem',
                    fontWeight: '800',
                    color: 'var(--white)',
                    letterSpacing: '0.02em',
                    lineHeight: '1.2'
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#94A3B8',
                    marginTop: '0.15rem'
                  }}>
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
