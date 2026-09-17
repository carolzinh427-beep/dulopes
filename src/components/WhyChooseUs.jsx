import React from 'react';
import { Award, CheckCircle2, Shield, Target, Zap, Headphones, Globe } from 'lucide-react';
import { whyUsBenefits } from '../data/companyData';
import AnimatedContent from './AnimatedContent';
import SplitText from './SplitText';

export default function WhyChooseUs() {
  const benefitIcons = [Target, Zap, Shield, Award, Headphones, Globe];

  return (
    <section id="por-que-dulopes" style={{
      padding: '4.5rem 0',
      backgroundColor: 'var(--off-white)',
      borderBottom: '1px solid var(--gray-light)'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 className="section-title">
            Equipamento certo para uma operação mais eficiente
          </h2>
          <SplitText
            tag="p"
            className="section-subtitle"
            text="Entenda como a Dulopes entrega valor constante para a rotina industrial e comercial do seu negócio."
            splitType="words"
            delay={35}
            duration={0.7}
            textAlign="center"
            style={{ margin: '0 auto' }}
          />
        </div>

        {/* Benefits Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem'
        }}>
          {whyUsBenefits.map((item, idx) => {
            const Icon = benefitIcons[idx % benefitIcons.length];
            return (
              <AnimatedContent
                key={idx}
                distance={35}
                direction="vertical"
                duration={0.6}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                scale={0.97}
                threshold={0.15}
                delay={idx * 0.1}
                style={{ height: '100%' }}
              >
                <div
                  style={{
                    backgroundColor: 'var(--white)',
                    borderRadius: 'var(--border-radius-md)',
                    padding: '1.75rem',
                    border: '1px solid var(--gray-light)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    gap: '1.15rem',
                    height: '100%'
                  }}
                >
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--border-radius-sm)',
                    backgroundColor: 'var(--orange-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={22} color="var(--orange-main)" />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '800',
                      color: 'var(--navy-darker)',
                      marginBottom: '0.4rem'
                    }}>
                      {item.titulo}
                    </h3>
                    <p style={{
                      fontSize: '0.885rem',
                      color: 'var(--gray-dark)',
                      lineHeight: '1.5'
                    }}>
                      {item.descricao}
                    </p>
                  </div>
                </div>
              </AnimatedContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
