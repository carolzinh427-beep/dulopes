import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';

// Public Site Components
import Header from './components/Header';
import Hero from './components/Hero';
import ConfidenceBar from './components/ConfidenceBar';
import Catalog from './components/Catalog';
import Offers from './components/Offers';
import Solutions from './components/Solutions';
import WhyChooseUs from './components/WhyChooseUs';
import NationalCoverage from './components/NationalCoverage';
import InstagramSection from './components/InstagramSection';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ProductModal from './components/ProductModal';

// Admin Components
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  // Sync URL pathname changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen to Firebase Authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const handleOpenModal = (product) => {
    setSelectedProductModal(product);
  };

  const handleCloseModal = () => {
    setSelectedProductModal(null);
  };

  // Determine if viewing Admin Routes (/admin or /admin/dashboard)
  const isAdminRoute = currentPath.startsWith('/admin');

  if (isAdminRoute) {
    if (authChecking) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: 'var(--navy-dark)',
          color: 'var(--white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '700'
        }}>
          Verificando autenticação do painel Dulopes...
        </div>
      );
    }

    if (user) {
      return (
        <AdminDashboard
          onGoHome={() => navigateTo('/')}
          onLogout={() => navigateTo('/admin')}
        />
      );
    }

    return (
      <AdminLogin
        onLoginSuccess={() => navigateTo('/admin/dashboard')}
        onGoHome={() => navigateTo('/')}
      />
    );
  }

  // Render Public Website
  return (
    <div className="app-root">
      <Header />
      <main>
        <Hero />
        <ConfidenceBar />
        <Catalog onOpenModal={handleOpenModal} />
        <Offers onOpenCatalog={() => {
          const el = document.getElementById('catalogo');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />
        <Solutions />
        <WhyChooseUs />
        <NationalCoverage />
        <InstagramSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />

      {/* Discrete Admin Link in Public Footer */}
      <div style={{
        backgroundColor: '#030811',
        padding: '0.4rem 0',
        textAlign: 'center',
        fontSize: '0.725rem',
        color: '#475569',
        borderTop: '1px solid rgba(255,255,255,0.04)'
      }}>
        <button
          onClick={() => navigateTo('/admin')}
          style={{ color: '#64748B', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.725rem' }}
        >
          Área Administrativa (Dulopes Admin)
        </button>
      </div>

      {/* Product Detail Modal */}
      {selectedProductModal && (
        <ProductModal
          product={selectedProductModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
