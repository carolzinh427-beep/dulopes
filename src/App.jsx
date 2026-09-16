import React, { useState } from 'react';
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

export default function App() {
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  const handleOpenModal = (product) => {
    setSelectedProductModal(product);
  };

  const handleCloseModal = () => {
    setSelectedProductModal(null);
  };

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
