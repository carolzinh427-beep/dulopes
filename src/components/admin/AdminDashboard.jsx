import React, { useState, useEffect } from 'react';
import { signOut, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../../lib/firebase';
import {
  subscribeAllProductsAdmin,
  toggleProductStatus,
  deleteProduct,
  seedInitialProductsToFirestore
} from '../../services/productService';
import AdminSidebar from './AdminSidebar';
import ProductFormModal from './ProductFormModal';
import {
  Plus, Eye, EyeOff, Edit, Trash2, Key, CheckCircle2,
  AlertCircle, RefreshCw, Database, Search, ShieldCheck, Lock, Star
} from 'lucide-react';

export default function AdminDashboard({ onGoHome, onLogout }) {
  const [currentTab, setCurrentTab] = useState('dashboard'); // 'dashboard', 'produtos', 'configuracoes'
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [tableFilter, setTableFilter] = useState('todos'); // 'todos', 'ativos', 'inativos'

  // Modal State for Edit / Add Product
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Settings State for Change Password
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState({ type: '', message: '' });

  // General Notification Banner
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [seeding, setSeeding] = useState(false);

  // Subscribe to Firestore 'products' collection in real-time
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
      name: '',
      category: 'maquinas',
      description: '',
      fullDescription: '',
      images: [],
      price: '',
      status: 'active',
      active: true,
      highlight: false,
      isNew: true
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleToggleProductStatus = async (product) => {
    try {
      await toggleProductStatus(product.id, product.status);
      showFeedback('success', `Status do equipamento "${product.name || product.nome}" atualizado.`);
    } catch (err) {
      showFeedback('error', `Erro ao alterar status: ${err.message}`);
    }
  };

  const handleDeleteProduct = async (product) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${product.name || product.nome}"?`)) {
      try {
        await deleteProduct(product.id);
        showFeedback('success', `Produto "${product.name || product.nome}" excluído.`);
      } catch (err) {
        showFeedback('error', `Erro ao excluir: ${err.message}`);
      }
    }
  };

  const handleSeedDatabase = async () => {
    if (window.confirm("Deseja inicializar/importar os produtos de demonstração no Firestore 'products'?")) {
      setSeeding(true);
      try {
        await seedInitialProductsToFirestore();
        setSeeding(false);
        showFeedback('success', 'Catálogo importado com sucesso para a coleção "products" no Firestore!');
      } catch (err) {
        setSeeding(false);
        showFeedback('error', `Erro ao inicializar: ${err.message}`);
      }
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordFeedback({ type: '', message: '' });

    if (newPasswordInput.length < 6) {
      setPasswordFeedback({ type: 'error', message: 'A nova senha deve ter no mínimo 6 caracteres.' });
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordFeedback({ type: 'error', message: 'As senhas não coincidem.' });
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      setPasswordFeedback({ type: 'error', message: 'Sessão expirada. Faça login novamente.' });
      return;
    }

    setPasswordLoading(true);

    try {
      // Re-authenticate if current password entered
      if (currentPasswordInput.trim() && currentUser.email) {
        const credential = EmailAuthProvider.credential(currentUser.email, currentPasswordInput);
        await reauthenticateWithCredential(currentUser, credential);
      }

      await updatePassword(currentUser, newPasswordInput);
      setPasswordLoading(false);
      setPasswordFeedback({ type: 'success', message: 'Senha alterada com sucesso via Firebase Auth!' });
      setCurrentPasswordInput('');
      setNewPasswordInput('');
      setConfirmPasswordInput('');
    } catch (err) {
      console.error("Change password error:", err);
      setPasswordLoading(false);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setPasswordFeedback({ type: 'error', message: 'Senha atual incorreta.' });
      } else if (err.code === 'auth/requires-recent-login') {
        setPasswordFeedback({ type: 'error', message: 'Por segurança, saia e faça login novamente para alterar a senha.' });
      } else {
        setPasswordFeedback({ type: 'error', message: `Erro ao alterar senha: ${err.message}` });
      }
    }
  };

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback({ type: '', message: '' }), 4000);
  };

  const totalAtivos = products.filter(p => p.status === 'active' && p.active !== false).length;
  const totalInativos = products.filter(p => p.status === 'inactive' || p.active === false).length;

  const filteredProducts = products.filter(p => {
    const isActive = p.status === 'active' && p.active !== false;
    const matchesFilter =
      tableFilter === 'todos' ||
      (tableFilter === 'ativos' && isActive) ||
      (tableFilter === 'inativos' && !isActive);

    const matchesSearch =
      (p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--off-white)' }}>

      {/* Left Sidebar Menu */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={(tabId) => setCurrentTab(tabId)}
        onAddProductClick={handleOpenAdd}
        onLogout={handleLogout}
        onGoHome={onGoHome}
      />

      {/* Main Content View */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>

        {/* Top Header Ribbon */}
        <header style={{
          backgroundColor: 'var(--white)',
          padding: '1rem 2rem',
          borderBottom: '1px solid var(--gray-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy-darker)' }}>
              {currentTab === 'dashboard' ? 'Visão Geral (Dashboard)' :
               currentTab === 'produtos' ? 'Gerenciamento de Produtos' :
               currentTab === 'configuracoes' ? 'Configurações da Conta' : 'Painel Dulopes'}
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--gray-dark)' }}>
              Projeto Firebase: <strong style={{ color: 'var(--orange-main)' }}>dulopes-e846c</strong> • Coleção: <strong style={{ color: 'var(--navy-main)' }}>products</strong>
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="btn btn-orange"
            style={{ padding: '0.65rem 1.15rem', fontSize: '0.875rem' }}
          >
            <Plus size={18} />
            <span>Adicionar produto</span>
          </button>
        </header>

        {/* Dynamic Body Content */}
        <main style={{ padding: '2rem', flex: 1 }}>

          {/* Feedback Banner */}
          {feedback.message && (
            <div style={{
              backgroundColor: feedback.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: feedback.type === 'success' ? '1px solid #22C55E' : '1px solid #EF4444',
              color: feedback.type === 'success' ? '#15803D' : '#DC2626',
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--border-radius-md)',
              marginBottom: '1.5rem',
              fontWeight: '700',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <div>{feedback.message}</div>
            </div>
          )}

          {/* TAB 1: DASHBOARD STATS */}
          {currentTab === 'dashboard' && (
            <div>
              {/* Stat Counters Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2rem'
              }}>
                <div style={{ backgroundColor: 'var(--white)', padding: '1.5rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--gray-light)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--gray-dark)', textTransform: 'uppercase' }}>
                    Total de Produtos
                  </div>
                  <div style={{ fontSize: '2.25rem', fontWeight: '900', color: 'var(--navy-darker)', marginTop: '0.2rem' }}>
                    {products.length}
                  </div>
                  <div style={{ fontSize: '0.785rem', color: 'var(--gray-dark)', marginTop: '0.35rem' }}>
                    Cadastrados na coleção "products"
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--white)', padding: '1.5rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--gray-light)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#15803D', textTransform: 'uppercase' }}>
                    Produtos Ativos (Visíveis)
                  </div>
                  <div style={{ fontSize: '2.25rem', fontWeight: '900', color: '#15803D', marginTop: '0.2rem' }}>
                    {totalAtivos}
                  </div>
                  <div style={{ fontSize: '0.785rem', color: '#15803D', marginTop: '0.35rem' }}>
                    Exibidos no catálogo público (status = active)
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--white)', padding: '1.5rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--gray-light)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#A16207', textTransform: 'uppercase' }}>
                    Produtos Inativos (Ocultos)
                  </div>
                  <div style={{ fontSize: '2.25rem', fontWeight: '900', color: '#A16207', marginTop: '0.2rem' }}>
                    {totalInativos}
                  </div>
                  <div style={{ fontSize: '0.785rem', color: '#A16207', marginTop: '0.35rem' }}>
                    Ocultos do site público (status = inactive)
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--navy-dark)', color: 'var(--white)', padding: '1.5rem', borderRadius: 'var(--border-radius-md)', border: '1px solid rgba(255, 107, 0, 0.3)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--orange-main)', textTransform: 'uppercase' }}>
                    Conexão Firestore
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--white)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Database size={18} color="var(--orange-main)" />
                    <span>dulopes-e846c</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.35rem' }}>
                    Sincronização em Tempo Real ativa
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div style={{
                backgroundColor: 'var(--white)',
                padding: '1.75rem',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--gray-light)',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '2rem'
              }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--navy-darker)', marginBottom: '1rem' }}>
                  Ações Rápidas do Administrador
                </h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleOpenAdd}
                    className="btn btn-orange"
                    style={{ padding: '0.85rem 1.4rem' }}
                  >
                    <Plus size={18} />
                    <span>Adicionar Novo Produto</span>
                  </button>

                  <button
                    onClick={() => setCurrentTab('produtos')}
                    className="btn btn-navy"
                    style={{ padding: '0.85rem 1.4rem' }}
                  >
                    <span>Gerenciar Todos os Produtos</span>
                  </button>

                  <button
                    onClick={handleSeedDatabase}
                    disabled={seeding}
                    className="btn btn-outline-navy"
                    style={{ padding: '0.85rem 1.4rem' }}
                  >
                    <RefreshCw size={18} className={seeding ? 'spin' : ''} />
                    <span>{seeding ? 'Importando...' : 'Inicializar no Firestore'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUTOS TABLE & LIST */}
          {(currentTab === 'produtos' || currentTab === 'dashboard') && (
            <div style={{
              backgroundColor: 'var(--white)',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--gray-light)',
              boxShadow: 'var(--shadow-sm)',
              overflow: 'hidden'
            }}>
              {/* Filter Bar */}
              <div style={{
                padding: '1.25rem',
                borderBottom: '1px solid var(--gray-light)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                {/* Status Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => setTableFilter('todos')}
                    style={{
                      padding: '0.5rem 0.85rem',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      borderRadius: 'var(--border-radius-sm)',
                      backgroundColor: tableFilter === 'todos' ? 'var(--navy-main)' : 'var(--off-white)',
                      color: tableFilter === 'todos' ? 'var(--white)' : 'var(--gray-dark)',
                      border: '1px solid var(--gray-light)'
                    }}
                  >
                    Todos ({products.length})
                  </button>
                  <button
                    onClick={() => setTableFilter('ativos')}
                    style={{
                      padding: '0.5rem 0.85rem',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      borderRadius: 'var(--border-radius-sm)',
                      backgroundColor: tableFilter === 'ativos' ? 'var(--navy-main)' : 'var(--off-white)',
                      color: tableFilter === 'ativos' ? 'var(--white)' : 'var(--gray-dark)',
                      border: '1px solid var(--gray-light)'
                    }}
                  >
                    Ativos ({totalAtivos})
                  </button>
                  <button
                    onClick={() => setTableFilter('inativos')}
                    style={{
                      padding: '0.5rem 0.85rem',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      borderRadius: 'var(--border-radius-sm)',
                      backgroundColor: tableFilter === 'inativos' ? 'var(--navy-main)' : 'var(--off-white)',
                      color: tableFilter === 'inativos' ? 'var(--white)' : 'var(--gray-dark)',
                      border: '1px solid var(--gray-light)'
                    }}
                  >
                    Inativos ({totalInativos})
                  </button>
                </div>

                {/* Search Bar */}
                <div style={{ position: 'relative', minWidth: '240px' }}>
                  <input
                    type="text"
                    placeholder="Buscar produto por nome..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem 0.55rem 2.2rem',
                      fontSize: '0.85rem',
                      borderRadius: 'var(--border-radius-sm)',
                      border: '1px solid var(--gray-light)',
                      outline: 'none'
                    }}
                  />
                  <Search size={15} color="var(--gray-mid)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              {/* Table */}
              {loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-dark)' }}>
                  Buscando dados da coleção "products" no Firestore...
                </div>
              ) : filteredProducts.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--navy-dark)', color: 'var(--white)', borderBottom: '2px solid var(--orange-main)' }}>
                        <th style={{ padding: '0.85rem 1rem' }}>Imagem Principal</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Nome do Produto</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Categoria</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Preço</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((p, idx) => {
                        const isActive = p.status === 'active' && p.active !== false;
                        return (
                          <tr
                            key={p.id || idx}
                            style={{
                              borderBottom: '1px solid var(--gray-light)',
                              backgroundColor: idx % 2 === 0 ? 'var(--white)' : 'var(--off-white)',
                              opacity: isActive ? 1 : 0.65
                            }}
                          >
                            <td style={{ padding: '0.75rem 1rem' }}>
                              <div style={{
                                width: '56px',
                                height: '42px',
                                borderRadius: 'var(--border-radius-sm)',
                                overflow: 'hidden',
                                backgroundColor: '#0F172A',
                                border: '1px solid var(--gray-light)'
                              }}>
                                <img
                                  src={p.mainImage || (p.images && p.images[0]) || '/images/hero_equipment.jpg'}
                                  alt={p.name}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              </div>
                            </td>

                            <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--navy-darker)' }}>
                              <div>{p.name || p.nome}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--gray-dark)', fontWeight: '400' }}>
                                ID: {p.id}
                              </div>
                            </td>

                            <td style={{ padding: '0.75rem 1rem', color: 'var(--gray-dark)' }}>
                              {p.category || p.categoria}
                            </td>

                            <td style={{ padding: '0.75rem 1rem', fontWeight: '800', color: 'var(--orange-main)' }}>
                              {p.price ? `R$ ${p.price}` : 'Consulte'}
                            </td>

                            <td style={{ padding: '0.75rem 1rem' }}>
                              <span style={{
                                fontSize: '0.75rem',
                                fontWeight: '800',
                                padding: '0.25rem 0.65rem',
                                borderRadius: 'var(--border-radius-sm)',
                                backgroundColor: isActive ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                                color: isActive ? '#15803D' : '#A16207',
                                border: isActive ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(234, 179, 8, 0.3)'
                              }}>
                                {isActive ? 'Ativo (Público)' : 'Inativo (Oculto)'}
                              </span>
                            </td>

                            <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                                <button
                                  onClick={() => handleToggleProductStatus(p)}
                                  className="btn btn-outline-navy"
                                  style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem' }}
                                  title={isActive ? 'Ocultar (Status = inactive)' : 'Reativar (Status = active)'}
                                >
                                  {isActive ? <EyeOff size={14} color="#A16207" /> : <Eye size={14} color="#15803D" />}
                                </button>

                                <button
                                  onClick={() => handleOpenEdit(p)}
                                  className="btn btn-outline-navy"
                                  style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem' }}
                                  title="Editar Produto"
                                >
                                  <Edit size={14} />
                                </button>

                                <button
                                  onClick={() => handleDeleteProduct(p)}
                                  style={{
                                    padding: '0.4rem 0.6rem',
                                    fontSize: '0.75rem',
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    color: '#DC2626',
                                    borderRadius: 'var(--border-radius-sm)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)'
                                  }}
                                  title="Excluir do Firestore"
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
                  Nenhum produto encontrado nesta lista.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONFIGURAÇÕES & ALTERAR SENHA */}
          {currentTab === 'configuracoes' && (
            <div style={{ maxWidth: '540px' }}>
              <div style={{
                backgroundColor: 'var(--white)',
                padding: '2rem',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--gray-light)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <Lock size={22} color="var(--orange-main)" />
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy-darker)' }}>
                    Alterar Senha do Administrador
                  </h2>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--gray-dark)', marginBottom: '1.5rem' }}>
                  A atualização será realizada com segurança através do Firebase Authentication.
                </p>

                {passwordFeedback.message && (
                  <div style={{
                    backgroundColor: passwordFeedback.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: passwordFeedback.type === 'success' ? '#15803D' : '#DC2626',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: '0.875rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {passwordFeedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <div>{passwordFeedback.message}</div>
                  </div>
                )}

                <form onSubmit={handleChangePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                      Senha Atual
                    </label>
                    <input
                      type="password"
                      value={currentPasswordInput}
                      onChange={(e) => setCurrentPasswordInput(e.target.value)}
                      placeholder="Sua senha atual"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--gray-light)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                      Nova Senha *
                    </label>
                    <input
                      type="password"
                      value={newPasswordInput}
                      onChange={(e) => setNewPasswordInput(e.target.value)}
                      placeholder="No mínimo 6 caracteres"
                      required
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--gray-light)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                      Confirmar Nova Senha *
                    </label>
                    <input
                      type="password"
                      value={confirmPasswordInput}
                      onChange={(e) => setConfirmPasswordInput(e.target.value)}
                      placeholder="Digite a nova senha novamente"
                      required
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--gray-light)' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="btn btn-orange"
                    style={{ padding: '0.85rem', marginTop: '0.5rem' }}
                  >
                    {passwordLoading ? 'Atualizando Senha no Firebase...' : 'Salvar Nova Senha'}
                  </button>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Edit / Add Product Form Modal */}
      {isFormOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
          onSaveSuccess={() => {
            showFeedback('success', 'Produto salvo com sucesso na coleção "products" do Firestore!');
          }}
        />
      )}

    </div>
  );
}
