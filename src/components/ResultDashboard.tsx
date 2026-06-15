import React from 'react';
import { RefreshCw, MessageSquare, BarChart2, ShieldAlert, Compass } from 'lucide-react';

interface LeadData {
  name: string;
  phone: string;
  website: string;
  role: string;
  email: string;
}

interface DimensionScore {
  name: string;
  score: number;
  description: string;
}

interface ResultDashboardProps {
  score: number;
  dimensionScores: DimensionScore[];
  leadData: LeadData;
  answers: number[];
  onReset: () => void;
}

interface ActionStep {
  title: string;
  desc: string;
}

const actionStepsMap: Record<string, ActionStep[]> = {
  'Estratégia & Liderança': [
    {
      title: 'Workshop de Alinhamento Executivo',
      desc: 'Rodar um workshop com a alta liderança para mapear as maiores dores de eficiência e definir as primeiras 3 metas prioritárias de automação.'
    },
    {
      title: 'Nomeação de um Champion de IA',
      desc: 'Designar um responsável direto (líder interno) com autonomia e tempo dedicado para coordenar iniciativas e testes de ferramentas.'
    },
    {
      title: 'Política de Uso e Governança',
      desc: 'Estabelecer diretrizes claras e simples sobre segurança de dados corporativos e quais ferramentas de IA são homologadas para o time.'
    }
  ],
  'Processos & Automação': [
    {
      title: 'Mapeamento de Gargalos Repetitivos',
      desc: 'Listar os 3 processos operacionais mais repetitivos (ex: triagem de leads, relatórios, cobranças) para focar os esforços de automação.'
    },
    {
      title: 'Agente de IA no Atendimento Comercial',
      desc: 'Implementar um assistente inteligente integrado ao WhatsApp para fazer qualificação de leads, responder dúvidas e direcionar o contato 24/7.'
    },
    {
      title: 'Integração de Sistemas via API',
      desc: 'Automatizar tarefas de transferência de dados (como copiar informações entre WhatsApp, CRM e Planilhas) utilizando ferramentas como Make ou n8n.'
    }
  ],
  'Dados & Infraestrutura': [
    {
      title: 'Centralização em CRM Único',
      desc: 'Migrar todos os dados de clientes, histórico de conversas e transações para um CRM de mercado (ex: HubSpot ou ActiveCampaign).'
    },
    {
      title: 'Erradicação de Silos de Dados',
      desc: 'Substituir o uso de planilhas locais soltas e blocos de notas pessoais por campos padronizados e compartilhados nos sistemas.'
    },
    {
      title: 'Conectores Automatizados de Informação',
      desc: 'Estabelecer fluxos automáticos de sincronização de dados via APIs nativas ou webhooks para garantir que a IA acesse dados sempre atualizados.'
    }
  ],
  'Pessoas & Cultura': [
    {
      title: 'Treinamento Prático de Prompting',
      desc: 'Capacitar a equipe com oficinas práticas focadas em engenharia de prompt (ChatGPT/Claude) direcionadas às tarefas reais do dia a dia.'
    },
    {
      title: 'Hub de Compartilhamento Interno',
      desc: 'Criar um canal específico (ex: Slack ou Teams) para o time compartilhar prompts validados, novas ferramentas descobertas e casos de uso.'
    },
    {
      title: 'Programa de Incentivo à Inovação',
      desc: 'Reconhecer e premiar os colaboradores que criarem ou sugerirem as automações mais eficazes para o negócio.'
    }
  ],
  'Resultados & Mensuração': [
    {
      title: 'Auditoria de Tempo Operacional',
      desc: 'Criar uma planilha simples de rastreio de horas de trabalho operacional economizadas por semana com o uso de automações.'
    },
    {
      title: 'Definição de Métricas de Sucesso',
      desc: 'Definir 2 ou 3 indicadores claros (ex: velocidade de atendimento, taxa de conversão) para auditar o ROI financeiro direto da IA.'
    },
    {
      title: 'Revisão Mensal de Custos e Licenças',
      desc: 'Realizar auditorias regulares em ferramentas e créditos de APIs para desativar licenças sem uso e otimizar a eficiência de custos.'
    }
  ]
};

export const ResultDashboard: React.FC<ResultDashboardProps> = ({
  score,
  dimensionScores,
  leadData,
  answers,
  onReset
}) => {
  // 1. Determine Classification
  let classification = '';
  let colorHex = '';
  let emoji = '';

  if (score <= 25) {
    classification = 'Ponto Zero';
    colorHex = '#ef4444';
    emoji = '🔴';
  } else if (score <= 50) {
    classification = 'Despertando';
    colorHex = '#eab308';
    emoji = '🟡';
  } else if (score <= 75) {
    classification = 'Em Transição';
    colorHex = '#3b82f6';
    emoji = '🔵';
  } else {
    classification = 'Cultura de IA';
    colorHex = '#10b981';
    emoji = '🟢';
  }

  // 2. Calculate P20 Self-Perception Contrast
  const p20Points = answers[19] !== undefined ? answers[19] : 0;
  let selfPerceptionVal = 0;
  if (p20Points === 0) {
    selfPerceptionVal = 20;
  } else if (p20Points === 33) {
    selfPerceptionVal = 45;
  } else if (p20Points === 66) {
    selfPerceptionVal = 65;
  } else {
    selfPerceptionVal = 90;
  }

  const gap = selfPerceptionVal - score;

  // 3. Find the lowest performing dimension
  const lowestDimension = [...dimensionScores].sort((a, b) => a.score - b.score)[0];

  // Get action steps
  const steps = actionStepsMap[lowestDimension.name] || actionStepsMap['Processos & Automação'];

  // Status helper for dimensions
  const getScoreStatusClass = (dimScore: number) => {
    if (dimScore <= 25) return { color: 'color-critical', bg: 'bg-critical' };
    if (dimScore <= 50) return { color: 'color-warning', bg: 'bg-warning' };
    if (dimScore <= 75) return { color: 'color-stable', bg: 'bg-stable' };
    return { color: 'color-advanced', bg: 'bg-advanced' };
  };

  // Micro insights helper
  const getMicroInsight = (dimName: string, dimScore: number): string => {
    if (dimName === 'Estratégia & Liderança') {
      if (dimScore <= 25) return 'Liderança desalinhada em relação ao potencial da IA no negócio.';
      if (dimScore <= 50) return 'Discussões iniciais acontecendo, mas sem planejamento estratégico formal.';
      if (dimScore <= 75) return 'Liderança engajada com projetos pilotos isolados, mas falta foco estruturado.';
      return 'IA integrada ao planejamento estratégico com forte engajamento da diretoria.';
    }
    if (dimName === 'Processos & Automação') {
      if (dimScore <= 25) return 'Operação 100% manual e dependente de intervenção humana constante.';
      if (dimScore <= 50) return 'Poucas automações pontuais em produção, sem integração entre sistemas.';
      if (dimScore <= 75) return 'Processos relevantes automatizados com gargalos ainda existentes no fluxo.';
      return 'Múltiplos fluxos críticos rodando com agentes de IA e automação integrada.';
    }
    if (dimName === 'Dados & Infraestrutura') {
      if (dimScore <= 25) return 'Dados de clientes e processos dispersos (silos operacionais crônicos).';
      if (dimScore <= 50) return 'Informações salvas em sistemas ou planilhas desatualizadas e fragmentadas.';
      if (dimScore <= 75) return 'Sistemas principais centralizados, mas integrações manuais frequentes.';
      return 'Base de dados unificada, limpa e integrada via APIs de tempo real.';
    }
    if (dimName === 'Pessoas & Cultura') {
      if (dimScore <= 25) return 'Alta resistência ou letramento digital básico da equipe frente à IA.';
      if (dimScore <= 50) return 'Uso individual e esporádico de IA, sem capacitação oficializada pela empresa.';
      if (dimScore <= 75) return 'Equipe aberta à experimentação com treinamentos e incentivos pontuais.';
      return 'Cultura ativa de inovação com capacitação contínua e experimentação estimulada.';
    }
    // Resultados & Mensuração
    if (dimScore <= 25) return 'Nenhuma mensuração de ganho de tempo, custos ou ROI de ferramentas.';
    if (dimScore <= 50) return 'Percepção subjetiva dos benefícios do uso de IA, sem KPIs definidos.';
    if (dimScore <= 75) return 'Métricas acompanhadas de forma assistida em áreas específicas.';
    return 'Rastreamento exato de retorno financeiro e tempo economizado com dashboards ativos.';
  };

  // Gap description helper
  const getGapAnalysisText = () => {
    if (gap > 10) {
      return (
        <>
          A alta liderança possui uma expectativa estratégica elevada de <strong>{selfPerceptionVal}%</strong>, porém a maturidade técnica real dos processos mapeados na operação está em <strong>{score}%</strong>. Este desvio de <strong>{gap}% (Gap de Consciência Alto)</strong> indica um desalinhamento relevante: a diretoria pode estar subestimando a complexidade prática ou superestimando a prontidão tecnológica atual das equipes no dia a dia.
        </>
      );
    } else if (gap < -10) {
      return (
        <>
          Sua empresa apresenta uma maturidade operacional de <strong>{score}%</strong>, superando a percepção declarada da liderança de <strong>{selfPerceptionVal}%</strong>. Este desvio de <strong>{Math.abs(gap)}% (Operação Avançada)</strong> sinaliza que as equipes e ferramentas estão se movendo mais rápido e com maior autonomia do que o reportado formalmente ao board, indicando que a liderança pode acelerar iniciativas sem medo de barreiras culturais.
        </>
      );
    } else {
      return (
        <>
          Alinhamento estratégico sólido. Com um desvio mínimo de <strong>{Math.abs(gap)}% (Gap de Consciência Alinhado)</strong>, a visão estratégica da liderança (<strong>{selfPerceptionVal}%</strong>) está em perfeita sintonia com a realidade operacional auditada (<strong>{score}%</strong>). Isto demonstra um conhecimento profundo e realista sobre os gargalos e as reais capacidades de entrega da estrutura corporativa.
        </>
      );
    }
  };

  // 4. Build WhatsApp redirection link
  const messageBody = `Olá! Acabei de visualizar os insights do meu diagnóstico de Cultura de IA da Audaces AI. Meu score final foi de ${score}% (${classification}). Quero agendar meu diagnóstico gratuito.`;
  const whatsappUrl = `https://wa.me/5548999319446?text=${encodeURIComponent(messageBody)}`;

  return (
    <div className="fade-enter fade-enter-active" style={{ textAlign: 'left' }}>
      
      {/* HEADER LOGO */}
      <div className="result-logo-container">
        <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M42 12 H58 L80 88 H66 L66 48 H57 L57 88 H43 L43 48 H34 L34 88 H20 Z" fill="#ffffff" />
        </svg>
        <div className="result-logo-text">
          Audaces <span>AI</span>
        </div>
      </div>

      <div className="dashboard-grid">
        
        {/* CARD 1: MATURIDADE GERAL */}
        <div className="large-progress-section" style={{ marginBottom: 0 }}>
          <div className="large-progress-label">Relatório de Diagnóstico Corporativo</div>
          <div className="large-progress-percentage">{score}%</div>
          <div className="large-progress-bar-bg">
            <div 
              className="large-progress-bar-fill" 
              style={{ width: `${score}%`, backgroundColor: colorHex }}
            ></div>
          </div>
          <div style={{ marginTop: '14px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
            ESTÁGIO ATUAL: <span style={{ color: colorHex, fontWeight: 700 }}>{classification.toUpperCase()} {emoji}</span>
          </div>
        </div>

        {/* CARD 2: BREAKDOWN DE DIMENSÕES */}
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            <BarChart2 size={18} className="color-stable" />
            Análise por Dimensão
            <span>Métricas</span>
          </div>
          <div className="dimensions-container">
            {dimensionScores.map((dim, index) => {
              const status = getScoreStatusClass(dim.score);
              return (
                <div className="dimension-item-row" key={index}>
                  <div className="dimension-row-header">
                    <span className="dimension-name-text">{dim.name}</span>
                    <span className={`dimension-score-val ${status.color}`}>{dim.score}%</span>
                  </div>
                  <div className="dimension-progress-bg">
                    <div 
                      className={`dimension-progress-fill-bar ${status.bg}`} 
                      style={{ width: `${dim.score}%` }}
                    ></div>
                  </div>
                  <span className="dimension-micro-insight-text">
                    {getMicroInsight(dim.name, dim.score)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CARD 3: GAP DE CONSCIÊNCIA */}
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            <ShieldAlert size={18} className="color-warning" />
            Alinhamento Liderança vs. Operação
            <span>Gap de Consciência</span>
          </div>
          <div className="gap-analysis-layout">
            <div className="gap-metrics-grid">
              <div className="gap-metric-box">
                <div className="gap-metric-label">Visão Estratégica</div>
                <div className="gap-metric-number">{selfPerceptionVal}%</div>
              </div>
              <div className="gap-metric-box">
                <div className="gap-metric-label">Maturidade Real</div>
                <div className="gap-metric-number">{score}%</div>
              </div>
            </div>
            
            <div className="gap-badge-container">
              <div className={`gap-badge-num ${Math.abs(gap) > 10 ? 'color-warning' : 'color-advanced'}`}>
                {gap > 0 ? `+${gap}%` : `${gap}%`}
              </div>
              <div className="gap-badge-title">Desvio Detectado</div>
            </div>
          </div>
          <div className="gap-explanation-box" style={{ marginTop: '20px' }}>
            <p>{getGapAnalysisText()}</p>
          </div>
        </div>

        {/* CARD 4: PLANO DE AÇÃO */}
        <div className="dashboard-card" style={{ border: '1px solid rgba(16, 185, 129, 0.25)', background: 'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(16, 185, 129, 0.02) 100%)' }}>
          <div className="dashboard-card-title">
            <Compass size={18} className="color-advanced" />
            Plano de Ação Sugerido
            <span style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.15)' }}>Prioridade</span>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
            Identificamos que seu maior gargalo reside em <strong>{lowestDimension.name} ({lowestDimension.score}%)</strong>. Foque na execução dos seguintes 3 passos práticos para destravar produtividade:
          </p>
          <div className="action-steps-group">
            {steps.map((step, idx) => (
              <div className="action-step-card-item" key={idx}>
                <div className="action-step-badge-num">{idx + 1}</div>
                <div className="action-step-text-wrapper">
                  <span className="action-step-title-text">{step.title}</span>
                  <span className="action-step-desc-text">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 5: CTA "O MAPA DA IA" */}
        <div className="mapa-cta-card">
          <h3 className="mapa-cta-title">Agendar O Mapa da IA</h3>
          <p className="mapa-cta-desc">
            Solicite uma sessão estratégica de 30 minutos com nossos especialistas. Vamos detalhar gratuitamente este diagnóstico e desenhar o mapa prático de implantação de IA para a <strong>{leadData.website || 'sua empresa'}</strong>.
          </p>
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary"
            style={{ 
              textDecoration: 'none', 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px',
              width: '100%',
              fontWeight: 700
            }}
          >
            Acessar Sessão Estratégica Gratuita <MessageSquare size={16} />
          </a>
        </div>

      </div>

      {/* REFAZER TESTE */}
      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <button 
          type="button" 
          className="btn-secondary"
          onClick={onReset}
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            background: 'transparent', 
            border: 'none', 
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          <RefreshCw size={12} /> Refazer Teste
        </button>
      </div>

    </div>
  );
};
