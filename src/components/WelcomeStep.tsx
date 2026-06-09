import React, { useState } from 'react';
import { ArrowRight, Mail, Lock } from 'lucide-react';

interface WelcomeStepProps {
  email: string;
  onNext: (email: string) => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ email, onNext }) => {
  const [localEmail, setLocalEmail] = useState(email);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localEmail) {
      setError('Por favor, informe seu e-mail.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(localEmail)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    setError('');
    onNext(localEmail);
  };

  return (
    <div className="fade-enter fade-enter-active text-center">
      <div style={{ display: 'inline-flex', marginBottom: '24px' }}>
        <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M42 12 H58 L80 88 H66 L66 48 H57 L57 88 H43 L43 48 H34 L34 88 H20 Z" fill="#ffffff" />
        </svg>
      </div>
      
      <div className="step-counter" style={{ textAlign: 'center', marginBottom: '12px' }}>
        AUDACES AI • AVALIAÇÃO EXCLUSIVA
      </div>
      
      <h1 style={{ 
        fontFamily: 'Outfit, sans-serif', 
        fontSize: 'clamp(28px, 4vw, 36px)', 
        fontWeight: 800, 
        lineHeight: 1.2, 
        marginBottom: '16px',
        color: '#f0f4ff'
      }}>
        Calculadora de <span style={{ color: 'var(--accent-glow)' }}>Cultura de IA</span> para Empresas
      </h1>
      
      <p style={{ 
        color: 'var(--text-secondary)', 
        fontSize: '16px', 
        lineHeight: 1.6, 
        marginBottom: '32px',
        maxWidth: '540px',
        marginInline: 'auto'
      }}>
        Avalie o nível de maturidade da sua operação com base nos principais frameworks do <strong>MIT CISR</strong>, <strong>Harvard Business Review</strong> e <strong>McKinsey</strong>. Receba um diagnóstico prático em menos de 5 minutos.
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '460px', margin: '0 auto' }}>
        <div className="input-group">
          <label className="input-label" htmlFor="email">
            Seu melhor e-mail corporativo <span>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ 
              position: 'absolute', 
              left: '16px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Mail size={18} />
            </span>
            <input
              id="email"
              type="email"
              placeholder="exemplo@suaempresa.com.br"
              className="text-input"
              style={{ paddingLeft: '48px' }}
              value={localEmail}
              onChange={(e) => {
                setLocalEmail(e.target.value);
                if (error) setError('');
              }}
            />
          </div>
          {error && (
            <p style={{ 
              color: '#ef4444', 
              fontSize: '13px', 
              marginTop: '8px', 
              fontWeight: 500,
              textAlign: 'left'
            }}>
              {error}
            </p>
          )}
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
          Começar Diagnóstico <ArrowRight size={18} />
        </button>
      </form>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '6px', 
        marginTop: '28px', 
        fontSize: '12px', 
        color: 'var(--text-muted)' 
      }}>
        <Lock size={12} />
        <span>Seus dados estão protegidos. Não enviamos spam.</span>
      </div>
    </div>
  );
};
