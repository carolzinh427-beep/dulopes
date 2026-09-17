import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';

// Public Site Components
import Header from './components/Header';
import Hero from './components/Hero';
import ConfidenceBar from './components/ConfidenceBar';
import Catalog from './components/Catalog';
import Offers from './components/Offers';
import WhyChooseUs from './components/WhyChooseUs';
import NationalCoverage from './components/NationalCoverage';
import InstagramSection from './components/InstagramSection';
import FAQ from './components/FAQ';
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

  // Sync URL pathname for SPA routing
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Firebase Auth State Listener
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

  // Check if current URL is an admin route (/admin or /admin/dashboard)
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
      />
    );
  }

  // Render Public Website (Pristine & Untouched Design)
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
        <WhyChooseUs />
        <NationalCoverage />
        <InstagramSection />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloat />

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
