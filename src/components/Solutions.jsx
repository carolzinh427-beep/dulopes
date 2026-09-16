import React from 'react';
import { Factory, ShieldCheck, Cog, Sparkles, Truck, Layers } from 'lucide-react';
import { solutions } from '../data/companyData';

export default function Solutions() {
  const iconMap = {
    Factory: Factory,
    ShieldCheck: ShieldCheck,
    Cog: Cog,
    Sparkles: Sparkles,
    Truck: Truck
  };

  return (
    <section id="solucoes" style={{
      padding: '4.5rem 0',
      backgroundColor: 'var(--white)',
      borderBottom: '1px solid var(--gray-light)'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-tag" style={{ margin: '0 auto 0.85rem auto' }}>
            <Layers size={14} />
            <span>EXCELÊNCIA OPERACIONAL</span>
          </div>
          <h2 className="section-title">Soluções para sua operação</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A Dulopes vai além da venda de máquinas, entregando equipamentos em inox estruturados para impulsionar o seu negócio.
          </p>
        </div>

        {/* Solutions Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.75rem'
        }}>
          {solutions.map((sol) => {
            const IconComponent = iconMap[sol.icon] || Cog;
            return (
              <div
                key={sol.id}
                className="card-hover-effect"
                style={{
                  backgroundColor: 'var(--off-white)',
                  border: '1px solid var(--gray-light)',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--border-radius-md)',
                  backgroundColor: 'var(--navy-main)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  boxShadow: '0 6px 16px rgba(15, 37, 71, 0.18)'
                }}>
                  <IconComponent size={26} color="var(--orange-main)" />
                </div>

                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: '800',
                  color: 'var(--navy-darker)',
                  marginBottom: '0.65rem'
                }}>
                  {sol.titulo}
                </h3>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--gray-dark)',
                  lineHeight: '1.6'
                }}>
                  {sol.descricao}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
