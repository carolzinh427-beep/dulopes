import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../../lib/firebase';
import { User, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('Dulopes');
  const [password, setPassword] = useState('Dulopes26');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Por favor, preencha o usuário e a senha.');
      return;
    }

    // Map username "Dulopes" to "dulopes@dulopesmaquinas.com.br"
    let emailToUse = username.trim();
    if (!emailToUse.includes('@')) {
      emailToUse = `${emailToUse.toLowerCase()}@dulopesmaquinas.com.br`;
    }

    setLoading(true);

    if (!isFirebaseConfigured) {
      setLoading(false);
      setErrorMsg('Variáveis de ambiente do Firebase não encontradas.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, emailToUse, password);
      setLoading(false);
      onLoginSuccess();
    } catch (err) {
      console.error("Firebase auth login error:", err);
      setLoading(false);

      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setErrorMsg('Usuário ou senha incorretos.');
        setInfoMsg(`Aviso: Caso seja o primeiro acesso no Firebase Console (dulopes-e846c), cadastre o e-mail "${emailToUse}" na aba Authentication -> Users com a senha desejada.`);
      } else {
        setErrorMsg(`Erro na autenticação: ${err.message}`);
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--navy-dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Graphic Accent */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,0,0.15) 0%, rgba(10,25,47,0) 70%)',
        pointerEvents: 'none'
      }} />

      {/* Main Login Box */}
      <div style={{
        backgroundColor: 'var(--navy-main)',
        borderRadius: 'var(--border-radius-lg)',
        border: '1px solid rgba(255, 107, 0, 0.3)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '420px',
        padding: '2.5rem',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            backgroundColor: 'var(--navy-dark)',
            border: '2px solid var(--orange-main)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto',
            boxShadow: '0 8px 20px rgba(255, 107, 0, 0.25)'
          }}>
            <span style={{ color: 'var(--white)', fontWeight: '900', fontSize: '1.5rem' }}>
              D<span style={{ color: 'var(--orange-main)' }}>L</span>
            </span>
          </div>

          <h1 style={{ color: 'var(--white)', fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.25rem' }}>
            Dulopes
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
            Painel Administrativo
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--border-radius-md)',
            padding: '0.85rem 1rem',
            color: '#FCA5A5',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>{errorMsg}</div>
          </div>
        )}

        {/* Info Hint */}
        {infoMsg && (
          <div style={{
            backgroundColor: 'rgba(234, 179, 8, 0.15)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            borderRadius: 'var(--border-radius-md)',
            padding: '0.85rem 1rem',
            color: '#FDE047',
            fontSize: '0.8rem',
            marginBottom: '1.25rem'
          }}>
            {infoMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', color: '#E2E8F0', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
              Usuário
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuário"
                required
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.6rem',
                  backgroundColor: 'var(--navy-dark)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 'var(--border-radius-md)',
                  color: 'var(--white)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <User size={18} color="var(--orange-main)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: '#E2E8F0', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
              Senha
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.6rem',
                  backgroundColor: 'var(--navy-dark)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 'var(--border-radius-md)',
                  color: 'var(--white)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <Lock size={18} color="var(--orange-main)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-orange btn-full"
            style={{ padding: '0.95rem', fontSize: '1rem', marginTop: '0.5rem' }}
          >
            {loading ? (
              <span>Entrando...</span>
            ) : (
              <>
                <span>Entrar</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', fontSize: '0.75rem', color: '#64748B' }}>
          Dulopes Máquinas | Autenticação Segura
        </div>
      </div>
    </div>
  );
}
