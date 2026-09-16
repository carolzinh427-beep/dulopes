import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../../lib/firebase';
import {
  subscribeAllProductsAdmin,
  toggleProductActiveStatus,
  deleteProduct,
  seedInitialProductsToFirestore
} from '../../services/productService';
import ProductFormModal from './ProductFormModal';
import ChangePasswordModal from './ChangePasswordModal';
import {
  Plus, Eye, EyeOff, Edit, Trash2, LogOut, Key, Home,
  Database, RefreshCw, CheckCircle2, AlertCircle, Layers, Star
} from 'lucide-react';

export default function AdminDashboard({ onGoHome, onLogout }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('todos'); // 'todos', 'ativos', 'ocultos'
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [editingProduct, setEditingProduct] = useState(null); // null = closed, {} = add new, {id:...} = edit
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [actionFeedback, setActionFeedback] = useState({ type: '', message: '' });
  const [seeding, setSeeding] = useState(false);

  // Subscribe to real-time Firestore product updates
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeAllProductsAdmin((data) => {
      setProducts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (err) {
      console.error("Logout error:", err);
      onLogout();
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct({
      nome: '',
      categoria: 'maquinas',
      descricao: '',
      descricaoCompleta: '',
      imagens: [],
      preco: '',
      status: 'Pronta Entrega',
      ativo: true,
      destaque: false,
      isNew: true
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleToggleStatus = async (product) => {
    try {
      await toggleProductActiveStatus(product.id, product.ativo !== false);
      showFeedback('success', `Status do equipamento "${product.nome}" atualizado.`);
    } catch (err) {
      showFeedback('error', `Erro ao alterar status: ${err.message}`);
    }
  };

  const handleDelete = async (product) => {
    if (window.confirm(`Tem certeza que deseja excluir o equipamento "${product.nome}"? Esta ação não pode ser desfeita.`)) {
      try {
        await deleteProduct(product.id);
        showFeedback('success', `Equipamento "${product.nome}" excluído.`);
      } catch (err) {
        showFeedback('error', `Erro ao excluir equipamento: ${err.message}`);
      }
    }
  };

  const handleSeedData = async () => {
    if (window.confirm("Deseja importar o catálogo inicial de demonstração para a coleção 'produtos' no Firestore?")) {
      setSeeding(true);
      try {
        await seedInitialProductsToFirestore();
        setSeeding(false);
        showFeedback('success', 'Catálogo inicial importado com sucesso para o Firestore!');
      } catch (err) {
        setSeeding(false);
        showFeedback('error', `Erro ao importar catálogo inicial: ${err.message}`);
      }
    }
  };

  const showFeedback = (type, message) => {
    setActionFeedback({ type, message });
    setTimeout(() => {
      setActionFeedback({ type: '', message: '' });
    }, 4000);
  };

  // Filtered product lists
  const filteredProducts = products.filter(p => {
    const isAtivo = p.ativo !== false;
    const matchesTab =
      activeTab === 'todos' ||
      (activeTab === 'ativos' && isAtivo) ||
      (activeTab === 'ocultos' && !isAtivo);

    const matchesSearch =
      p.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.categoria && p.categoria.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const totalAtivos = products.filter(p => p.ativo !== false).length;
  const totalOcultos = products.filter(p => p.ativo === false).length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--off-white)', color: 'var(--navy-darker)' }}>

      {/* Top Navbar */}
      <header style={{
        backgroundColor: 'var(--navy-dark)',
        color: 'var(--white)',
        padding: '1rem 0',
        borderBottom: '2px solid var(--orange-main)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Logo & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--navy-main)',
              border: '2px solid var(--orange-main)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: 'var(--white)', fontWeight: '900', fontSize: '1.15rem' }}>DL</span>
            </div>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: '800', lineHeight: '1.2' }}>
                Dulopes Máquinas | Painel Admin
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--orange-main)', fontWeight: '700' }}>
                Administrador Autenticado
              </div>
            </div>
          </div>

          {/* Top Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={onGoHome}
              className="btn btn-outline-white"
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.825rem' }}
            >
              <Home size={15} />
              <span>Ver Site Público</span>
            </button>

            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="btn btn-outline-white"
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.825rem' }}
            >
              <Key size={15} color="var(--orange-main)" />
              <span>Alterar Senha</span>
            </button>

            <button
              onClick={handleLogout}
              className="btn btn-orange"
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.825rem' }}
            >
              <LogOut size={15} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>

        {/* Action Feedback Banner */}
        {actionFeedback.message && (
          <div style={{
            backgroundColor: actionFeedback.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: actionFeedback.type === 'success' ? '1px solid #22C55E' : '1px solid #EF4444',
            color: actionFeedback.type === 'success' ? '#15803D' : '#DC2626',
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--border-radius-md)',
            marginBottom: '1.5rem',
            fontWeight: '700',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {actionFeedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <div>{actionFeedback.message}</div>
          </div>
        )}

        {!isFirebaseConfigured && (
          <div style={{
            backgroundColor: 'rgba(234, 179, 8, 0.15)',
            border: '1px solid #EAB308',
            color: '#854D0E',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--border-radius-md)',
            marginBottom: '1.5rem',
            fontSize: '0.9rem'
          }}>
            <strong>Aviso de Configuração:</strong> As variáveis de ambiente do Firebase ainda não foram preenchidas na Vercel. As alterações serão salvas localmente enquanto as variáveis do Firestore/Storage não estiverem conectadas.
          </div>
        )}

        {/* Dashboard Stat Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div style={{ backgroundColor: 'var(--white)', padding: '1.25rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--gray-light)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '0.785rem', fontWeight: '800', color: 'var(--gray-dark)', textTransform: 'uppercase' }}>
              Total de Equipamentos
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--navy-darker)', marginTop: '0.2rem' }}>
              {products.length}
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--white)', padding: '1.25rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--gray-light)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '0.785rem', fontWeight: '800', color: '#15803D', textTransform: 'uppercase' }}>
              Ativos no Site Público
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#15803D', marginTop: '0.2rem' }}>
              {totalAtivos}
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--white)', padding: '1.25rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--gray-light)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '0.785rem', fontWeight: '800', color: '#A16207', textTransform: 'uppercase' }}>
              Equipamentos Ocultos
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#A16207', marginTop: '0.2rem' }}>
              {totalOcultos}
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--navy-dark)', color: 'var(--white)', padding: '1.25rem', borderRadius: 'var(--border-radius-md)', border: '1px solid rgba(255, 107, 0, 0.3)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '0.785rem', fontWeight: '800', color: 'var(--orange-main)', textTransform: 'uppercase' }}>
              Banco Cloud Firestore
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--white)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Database size={16} color="var(--orange-main)" />
              <span>Coleção: "produtos"</span>
            </div>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div style={{
          backgroundColor: 'var(--white)',
          padding: '1.25rem',
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--gray-light)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('todos')}
              style={{
                padding: '0.55rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '700',
                borderRadius: 'var(--border-radius-sm)',
                backgroundColor: activeTab === 'todos' ? 'var(--navy-main)' : 'var(--off-white)',
                color: activeTab === 'todos' ? 'var(--white)' : 'var(--gray-dark)',
                border: '1px solid var(--gray-light)'
              }}
            >
              Todos ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('ativos')}
              style={{
                padding: '0.55rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '700',
                borderRadius: 'var(--border-radius-sm)',
                backgroundColor: activeTab === 'ativos' ? 'var(--navy-main)' : 'var(--off-white)',
                color: activeTab === 'ativos' ? 'var(--white)' : 'var(--gray-dark)',
                border: '1px solid var(--gray-light)'
              }}
            >
              Ativos ({totalAtivos})
            </button>
            <button
              onClick={() => setActiveTab('ocultos')}
              style={{
                padding: '0.55rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '700',
                borderRadius: 'var(--border-radius-sm)',
                backgroundColor: activeTab === 'ocultos' ? 'var(--navy-main)' : 'var(--off-white)',
                color: activeTab === 'ocultos' ? 'var(--white)' : 'var(--gray-dark)',
                border: '1px solid var(--gray-light)'
              }}
            >
              Ocultos ({totalOcultos})
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleSeedData}
              disabled={seeding}
              className="btn btn-outline-navy"
              style={{ padding: '0.65rem 1rem', fontSize: '0.85rem' }}
            >
              <RefreshCw size={16} className={seeding ? 'spin' : ''} />
              <span>{seeding ? 'Importando...' : 'Inicializar no Firestore'}</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="btn btn-orange"
              style={{ padding: '0.65rem 1.15rem', fontSize: '0.875rem' }}
            >
              <Plus size={18} />
              <span>Adicionar Equipamento</span>
            </button>
          </div>
        </div>

        {/* Products Data Table */}
        <div style={{
          backgroundColor: 'var(--white)',
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--gray-light)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden'
        }}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-dark)' }}>
              Carregando catálogo do Firestore...
            </div>
          ) : filteredProducts.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--navy-dark)', color: 'var(--white)', borderBottom: '2px solid var(--orange-main)' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Imagem</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Equipamento</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Categoria</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Preço</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Visibilidade</th>
                    <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p, idx) => {
                    const isAtivo = p.ativo !== false;
                    return (
                      <tr
                        key={p.id || idx}
                        style={{
                          borderBottom: '1px solid var(--gray-light)',
                          backgroundColor: idx % 2 === 0 ? 'var(--white)' : 'var(--off-white)',
                          opacity: isAtivo ? 1 : 0.65
                        }}
                      >
                        {/* Image Thumbnail */}
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <div style={{
                            width: '54px',
                            height: '42px',
                            borderRadius: 'var(--border-radius-sm)',
                            overflow: 'hidden',
                            backgroundColor: '#0F172A',
                            border: '1px solid var(--gray-light)'
                          }}>
                            <img
                              src={p.imagens && p.imagens[0] ? p.imagens[0] : '/images/hero_equipment.jpg'}
                              alt={p.nome}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        </td>

                        {/* Name */}
                        <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--navy-darker)' }}>
                          <div>{p.nome}</div>
                          {p.destaque && (
                            <span style={{ fontSize: '0.7rem', color: 'var(--orange-main)', fontWeight: '800' }}>
                              ★ Destaque
                            </span>
                          )}
                        </td>

                        {/* Category */}
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--gray-dark)' }}>
                          {p.categoria}
                        </td>

                        {/* Price */}
                        <td style={{ padding: '0.75rem 1rem', fontWeight: '800', color: 'var(--orange-main)' }}>
                          {p.preco ? `R$ ${p.preco}` : 'Consulte'}
                        </td>

                        {/* Status */}
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span className={`badge ${p.status === 'Pronta Entrega' ? 'badge-status' : 'badge-status-encomenda'}`}>
                            {p.status}
                          </span>
                        </td>

                        {/* Visibilidade */}
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '800',
                            padding: '0.25rem 0.65rem',
                            borderRadius: 'var(--border-radius-sm)',
                            backgroundColor: isAtivo ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                            color: isAtivo ? '#15803D' : '#A16207',
                            border: isAtivo ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(234, 179, 8, 0.3)'
                          }}>
                            {isAtivo ? 'Ativo (Visível)' : 'Oculto'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                            {/* Toggle Active / Hide */}
                            <button
                              onClick={() => handleToggleStatus(p)}
                              className="btn btn-outline-navy"
                              style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem' }}
                              title={isAtivo ? 'Ocultar do site público' : 'Reativar no site público'}
                            >
                              {isAtivo ? <EyeOff size={14} color="#A16207" /> : <Eye size={14} color="#15803D" />}
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="btn btn-outline-navy"
                              style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem' }}
                              title="Editar Equipamento"
                            >
                              <Edit size={14} />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(p)}
                              style={{
                                padding: '0.4rem 0.6rem',
                                fontSize: '0.75rem',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                color: '#DC2626',
                                borderRadius: 'var(--border-radius-sm)',
                                border: '1px solid rgba(239, 68, 68, 0.3)'
                              }}
                              title="Excluir do Banco"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-dark)' }}>
              Nenhum equipamento encontrado nesta aba.
            </div>
          )}
        </div>

      </main>

      {/* Edit / Add Product Modal */}
      {isFormOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
          onSaveSuccess={() => {
            showFeedback('success', 'Equipamento salvo com sucesso no Firestore!');
          }}
        />
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <ChangePasswordModal
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}

    </div>
  );
}
