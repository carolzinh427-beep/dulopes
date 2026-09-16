import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../../lib/firebase';
import { Lock, User, ShieldCheck, ArrowRight, AlertCircle, CheckCircle2, Home } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onGoHome }) {
  const [username, setUsername] = useState('Dulopes');
  const [password, setPassword] = useState('');
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
      setErrorMsg('Variáveis de ambiente do Firebase não encontradas na Vercel / ambiente. Configure VITE_FIREBASE_API_KEY e VITE_FIREBASE_PROJECT_ID.');
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
        setInfoMsg(`Dica: Verifique se a conta ${emailToUse} foi criada no Firebase Console em Authentication -> Users com a senha informada.`);
      } else if (err.code === 'auth/too-many-requests') {
        setErrorMsg('Acesso temporariamente bloqueado por muitas tentativas. Tente novamente mais tarde.');
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
      {/* Background Graphic Accents */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,0,0.12) 0%, rgba(10,25,47,0) 70%)',
        pointerEvents: 'none'
      }} />

      {/* Main Login Card */}
      <div style={{
        backgroundColor: 'var(--navy-main)',
        borderRadius: 'var(--border-radius-lg)',
        border: '1px solid rgba(255, 107, 0, 0.3)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '440px',
        padding: '2.5rem',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Return to Public Site Button */}
        <button
          onClick={onGoHome}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#94A3B8',
            fontSize: '0.825rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--orange-main)'}
          onMouseLeave={(e) => e.target.style.color = '#94A3B8'}
        >
          <Home size={14} />
          <span>Voltar ao site público</span>
        </button>

        {/* Header Logo Badge */}
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

          <h1 style={{ color: 'var(--white)', fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.35rem' }}>
            Painel Administrativo
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>
            DULOPES MÁQUINAS E EQUIPAMENTOS | INOX
          </p>
        </div>

        {/* Error / Alert Banner */}
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

        {/* Informational Hint Banner */}
        {infoMsg && (
          <div style={{
            backgroundColor: 'rgba(234, 179, 8, 0.15)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            borderRadius: 'var(--border-radius-md)',
            padding: '0.85rem 1rem',
            color: '#FDE047',
            fontSize: '0.825rem',
            marginBottom: '1.25rem'
          }}>
            {infoMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Username Field */}
          <div>
            <label style={{ display: 'block', color: '#E2E8F0', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
              Usuário
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: Dulopes"
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

          {/* Password Field */}
          <div>
            <label style={{ display: 'block', color: '#E2E8F0', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
              Senha
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha administrativa"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-orange btn-full"
            style={{ padding: '0.95rem', fontSize: '1rem', marginTop: '0.5rem' }}
          >
            {loading ? (
              <span>Autenticando...</span>
            ) : (
              <>
                <span>Acessar Painel</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', fontSize: '0.75rem', color: '#64748B' }}>
          Autenticação Protegida por Firebase Auth
        </div>
      </div>
    </div>
  );
}
