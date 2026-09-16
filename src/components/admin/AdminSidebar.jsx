import React from 'react';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function AdminSidebar({
  currentTab,
  onSelectTab,
  onAddProductClick,
  onLogout,
  onGoHome
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'produtos', label: 'Produtos', icon: Package },
    { id: 'adicionar', label: 'Adicionar produto', icon: PlusCircle, action: onAddProductClick },
    { id: 'configuracoes', label: 'Configurações', icon: Settings }
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--navy-dark)',
      color: 'var(--white)',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid rgba(255, 107, 0, 0.2)',
      flexShrink: 0
    }} className="admin-sidebar">
      {/* Brand Header */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'var(--navy-main)',
          border: '2px solid var(--orange-main)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(255, 107, 0, 0.25)'
        }}>
          <span style={{ color: 'var(--white)', fontWeight: '900', fontSize: '1.1rem' }}>
            D<span style={{ color: 'var(--orange-main)' }}>L</span>
          </span>
        </div>
        <div>
          <div style={{ fontSize: '1.05rem', fontWeight: '800', lineHeight: '1.1' }}>
            Dulopes Admin
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--orange-main)', fontWeight: '700', letterSpacing: '0.08em' }}>
            PAINEL DE CONTROLE
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{ flex: 1, padding: '1.25rem 0.85rem' }}>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      onSelectTab(item.id);
                    }
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--border-radius-md)',
                    backgroundColor: isActive ? 'var(--orange-main)' : 'transparent',
                    color: isActive ? 'var(--white)' : '#CBD5E1',
                    fontWeight: isActive ? '800' : '600',
                    fontSize: '0.925rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                      e.currentTarget.style.color = 'var(--white)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#CBD5E1';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon size={18} color={isActive ? 'var(--white)' : 'var(--orange-main)'} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={14} opacity={isActive ? 1 : 0.4} />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Quick Actions */}
      <div style={{
        padding: '1.25rem 0.85rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <button
          onClick={onGoHome}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--border-radius-sm)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: '#94A3B8',
            fontSize: '0.825rem',
            fontWeight: '600'
          }}
        >
          <ExternalLink size={15} />
          <span>Ver Site Público</span>
        </button>

        <button
          onClick={onLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--border-radius-sm)',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            color: '#FCA5A5',
            fontSize: '0.825rem',
            fontWeight: '700'
          }}
        >
          <LogOut size={15} />
          <span>Sair da Conta</span>
        </button>
      </div>

    </aside>
  );
}
