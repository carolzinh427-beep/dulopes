import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Package } from 'lucide-react';
import { categories } from '../data/companyData';
import { subscribePublicProducts } from '../services/productService';
import ProductCard from './ProductCard';
import SplitText from './SplitText';

export default function Catalog({ onOpenModal }) {
  const [productList, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Subscribe to real-time public products from Firestore
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribePublicProducts((data) => {
      // Filter out any hidden products just in case
      const activeOnly = data.filter(p => p.ativo !== false);
      setProductList(activeOnly);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredProducts = productList.filter(product => {
    const matchesCategory =
      selectedCategory === 'todas' ||
      product.categoria === selectedCategory ||
      (product.categoriasSecundarias && product.categoriasSecundarias.includes(selectedCategory));

    const matchesSearch =
      (product.nome && product.nome.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.descricao && product.descricao.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="catalogo" style={{
      padding: '4.5rem 0',
      backgroundColor: 'var(--off-white)',
      borderBottom: '1px solid var(--gray-light)'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 className="section-title">Máquinas e equipamentos</h2>
          <SplitText
            tag="p"
            className="section-subtitle"
            text="Encontre o equipamento ideal para a sua operação."
            splitType="words"
            delay={35}
            duration={0.7}
            textAlign="center"
            style={{ margin: '0 auto' }}
          />
        </div>

        {/* Search & Category Filter Controls */}
        <div style={{ marginBottom: '2.5rem' }}>
          {/* Search Bar */}
          <div style={{
            maxWidth: '540px',
            margin: '0 auto 1.5rem auto',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="Buscar por nome do equipamento, inox, envasadora, seladora..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem 0.85rem 2.85rem',
                fontSize: '0.95rem',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--gray-light)',
                backgroundColor: 'var(--white)',
                boxShadow: 'var(--shadow-sm)',
                outline: 'none',
                fontFamily: 'inherit',
                color: 'var(--navy-darker)'
              }}
            />
            <Search
              size={18}
              color="var(--gray-mid)"
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '0.8rem',
                  color: 'var(--gray-dark)',
                  fontWeight: '700'
                }}
              >
                Limpar
              </button>
            )}
          </div>

          {/* Categories Pill Bar - Mobile Scrollable */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            justifyContent: 'flex-start',
            msOverflowStyle: 'none'
          }} className="category-scroll-bar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '0.65rem 1.15rem',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    borderRadius: 'var(--border-radius-full)',
                    whiteSpace: 'nowrap',
                    transition: 'all var(--transition-fast)',
                    border: isActive ? '2px solid var(--orange-main)' : '1px solid var(--gray-light)',
                    backgroundColor: isActive ? 'var(--navy-main)' : 'var(--white)',
                    color: isActive ? 'var(--white)' : 'var(--gray-dark)',
                    boxShadow: isActive ? 'var(--shadow-md)' : 'none'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Catalog Product Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray-dark)' }}>
            Carregando catálogo de máquinas...
          </div>
        ) : filteredProducts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            backgroundColor: 'var(--white)',
            borderRadius: 'var(--border-radius-md)',
            border: '1px border-dashed var(--gray-mid)'
          }}>
            <SlidersHorizontal size={40} color="var(--orange-main)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Nenhum equipamento encontrado</h3>
            <p style={{ color: 'var(--gray-dark)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Tente buscar por outros termos ou selecione a categoria "Todas as Máquinas".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todas');
                setSearchQuery('');
              }}
              className="btn btn-navy"
            >
              Ver todas as máquinas
            </button>
          </div>
        )}
      </div>

      <style>{`
        .category-scroll-bar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
