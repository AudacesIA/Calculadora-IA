import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, User, Phone, Globe } from 'lucide-react';

interface LeadData {
  name: string;
  phone: string;
  website: string;
  role: string;
}

interface LeadInfoStepProps {
  data: LeadData;
  onNext: (data: LeadData) => void;
  onBack: () => void;
}

const ROLES = [
  'Fundador / CEO / Sócio',
  'Diretor / C-Level',
  'Gerente / Coordenador',
  'Colaborador',
  'Outro'
];

export const LeadInfoStep: React.FC<LeadInfoStepProps> = ({ data, onNext, onBack }) => {
  const [name, setName] = useState(data.name);
  const [phone, setPhone] = useState(data.phone);
  const [website, setWebsite] = useState(data.website);
  const [role, setRole] = useState(data.role);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPhone = (val: string) => {
    const cleanValue = val.replace(/\D/g, '');
    if (cleanValue.length === 0) return '';
    if (cleanValue.length <= 2) return `(${cleanValue}`;
    if (cleanValue.length <= 6) return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2)}`;
    if (cleanValue.length <= 10) return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2, 6)}-${cleanValue.slice(6)}`;
    return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2, 7)}-${cleanValue.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Nome é obrigatório.';
    
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) newErrors.phone = 'Insira um telefone/WhatsApp válido.';
    
    if (!website.trim()) newErrors.website = 'Site ou Instagram da empresa é obrigatório.';
    if (!role) newErrors.role = 'Selecione sua função.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext({ name, phone, website, role });
  };

  return (
    <div className="fade-enter fade-enter-active">
      <div className="step-counter">01 / 02 • CONTEXTO</div>
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: '50%' }}></div>
      </div>

      <h2 style={{ 
        fontFamily: 'Outfit, sans-serif', 
        fontSize: '24px', 
        fontWeight: 700, 
        marginBottom: '20px',
        color: '#f0f4ff',
        textAlign: 'left'
      }}>
        Fale um pouco sobre você e sua empresa
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label" htmlFor="name">
            Nome completo <span>*</span>
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
              <User size={18} />
            </span>
            <input
              id="name"
              type="text"
              placeholder="Digite seu nome completo..."
              className="text-input"
              style={{ paddingLeft: '48px' }}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
              }}
            />
          </div>
          {errors.name && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>{errors.name}</p>}
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="phone">
            WhatsApp <span>*</span>
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
              <Phone size={18} />
            </span>
            <input
              id="phone"
              type="text"
              placeholder="(00) 00000-0000"
              className="text-input"
              style={{ paddingLeft: '48px' }}
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
          {errors.phone && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>{errors.phone}</p>}
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="website">
            Qual sua empresa? (Site ou @ do Instagram) <span>*</span>
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
              <Globe size={18} />
            </span>
            <input
              id="website"
              type="text"
              placeholder="@suaempresa ou www.suaempresa.com"
              className="text-input"
              style={{ paddingLeft: '48px' }}
              value={website}
              onChange={(e) => {
                setWebsite(e.target.value);
                if (errors.website) setErrors(prev => ({ ...prev, website: '' }));
              }}
            />
          </div>
          {errors.website && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>{errors.website}</p>}
        </div>

        <div className="input-group">
          <label className="input-label">
            Qual sua função hoje? <span>*</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '8px' }}>
            {ROLES.map((roleOption) => (
              <div
                key={roleOption}
                className={`option-item ${role === roleOption ? 'selected' : ''}`}
                style={{ padding: '14px 16px' }}
                onClick={() => {
                  setRole(roleOption);
                  if (errors.role) setErrors(prev => ({ ...prev, role: '' }));
                }}
              >
                <div className="option-radio">
                  <div className="option-radio-dot"></div>
                </div>
                <span className="option-text" style={{ fontSize: '14px' }}>{roleOption}</span>
              </div>
            ))}
          </div>
          {errors.role && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>{errors.role}</p>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', gap: '16px' }}>
          <button type="button" className="btn-secondary" onClick={onBack}>
            <ArrowLeft size={18} /> Voltar
          </button>
          <button type="submit" className="btn-primary">
            Próximo <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};
