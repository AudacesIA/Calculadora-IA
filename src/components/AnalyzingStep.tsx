import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface AnalyzingStepProps {
  onComplete: () => void;
}

export const AnalyzingStep: React.FC<AnalyzingStepProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Iniciando análise de prontidão operacional...');

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 25) {
      setMessage('Estruturando diagnóstico estratégico (MIT CISR)...');
    } else if (progress < 50) {
      setMessage('Medindo eficiência operacional e automações (McKinsey)...');
    } else if (progress < 75) {
      setMessage('Mapeando integridade de dados e infraestrutura (Harvard)...');
    } else if (progress < 90) {
      setMessage('Analisando cultura organizacional e resistências (BCG)...');
    } else if (progress < 100) {
      setMessage('Confrontando autopercepção com maturidade real...');
    } else {
      setMessage('Diagnóstico concluído! Redirecionando...');
      const timeout = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div className="fade-enter fade-enter-active text-center" style={{ padding: '40px 0' }}>
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '32px' }}>
        <RefreshCw 
          size={48} 
          className="spin"
          style={{ 
            color: 'var(--accent)', 
            animation: 'spin 2s linear infinite',
            filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))'
          }} 
        />
      </div>

      <h3 style={{ 
        fontFamily: 'Outfit, sans-serif', 
        fontSize: '20px', 
        fontWeight: 600, 
        color: '#f0f4ff', 
        marginBottom: '16px' 
      }}>
        Processando seu Diagnóstico
      </h3>
      
      <p style={{ 
        color: 'var(--text-secondary)', 
        fontSize: '14px', 
        marginBottom: '24px', 
        minHeight: '24px',
        fontWeight: 500
      }}>
        {message}
      </p>

      <div className="progress-bar-container" style={{ maxWidth: '300px', margin: '0 auto' }}>
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
