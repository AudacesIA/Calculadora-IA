import { useState } from 'react';
import './App.css';
import { WelcomeStep } from './components/WelcomeStep';
import { LeadInfoStep } from './components/LeadInfoStep';
import { QuestionStep } from './components/QuestionStep';
import { AnalyzingStep } from './components/AnalyzingStep';
import { ResultDashboard } from './components/ResultDashboard';
import { dimensions, getQuestionByIndex } from './data/questions';

type Step = 'welcome' | 'lead_info' | 'questionnaire' | 'analyzing' | 'result';

interface LeadData {
  name: string;
  phone: string;
  website: string;
  role: string;
}

interface DimensionScore {
  name: string;
  score: number;
  description: string;
}

interface CalculatedResult {
  score: number;
  dimensionScores: DimensionScore[];
}

function App() {
  const [step, setStep] = useState<Step>('result');
  const [email, setEmail] = useState('contato@audaces.ai');
  const [leadData, setLeadData] = useState<LeadData>({
    name: 'Alexandre Silveira',
    phone: '(11) 98888-7777',
    website: 'audaces.ai',
    role: 'Fundador / CEO / Sócio'
  });
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({
    0: 66, 1: 100, 2: 66, 3: 33,
    4: 100, 5: 66, 6: 100, 7: 66,
    8: 33, 9: 66, 10: 100, 11: 33,
    12: 100, 13: 66, 14: 66, 15: 100,
    16: 33, 17: 66, 18: 100, 19: 66
  });
  const [calculatedResult, setCalculatedResult] = useState<CalculatedResult | null>({
    score: 71,
    dimensionScores: [
      { name: 'Estratégia & Liderança', score: 66, description: 'Mapeia se a alta liderança possui alinhamento e intenção estratégica para a adoção de IA.' },
      { name: 'Processos & Automação', score: 83, description: 'Avalia a maturidade de automação e integração de IA nos processos operacionais da rotina.' },
      { name: 'Dados & Infraestrutura', score: 58, description: 'Verifica a qualidade e acessibilidade dos dados para alimentar as ferramentas de inteligência.' },
      { name: 'Pessoas & Cultura', score: 83, description: 'Mede a prontidão, letramento e abertura cultural dos colaboradores para novas tecnologias.' },
      { name: 'Resultados & Mensuração', score: 66, description: 'Avalia se a empresa metrica ROI e eficiência nas soluções implantadas.' }
    ]
  });

  // 1. Navigation Actions
  const handleWelcomeNext = (capturedEmail: string) => {
    setEmail(capturedEmail);
    setStep('lead_info');
  };

  const handleLeadInfoNext = (capturedData: LeadData) => {
    setLeadData(capturedData);
    setStep('questionnaire');
  };

  const handleLeadInfoBack = () => {
    setStep('welcome');
  };

  const handleSelectAnswer = (points: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: points
    }));
  };

  const handleQuestionNext = () => {
    if (currentQuestionIndex < 19) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Last question completed, calculate and transition to analysis screen
      calculateAndShowResults();
    }
  };

  const handleQuestionBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setStep('lead_info');
    }
  };

  const handleAnalysisComplete = () => {
    setStep('result');
  };

  const handleReset = () => {
    setStep('welcome');
    setEmail('');
    setLeadData({ name: '', phone: '', website: '', role: '' });
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCalculatedResult(null);
  };

  // 2. Calculation logic
  const calculateAndShowResults = () => {
    const totalQuestions = 20;
    
    // Aggregate answers array (default to 0 if any missing)
    const answersArray = Array.from({ length: totalQuestions }, (_, i) => answers[i] ?? 0);
    
    // Score real = sum of all points / 20
    const totalScore = Math.round(answersArray.reduce((acc, pts) => acc + pts, 0) / totalQuestions);

    // Dimension breakdown
    let currentIdx = 0;
    const dimensionScores = dimensions.map(dim => {
      const qCount = dim.questions.length;
      let dimSum = 0;
      for (let i = 0; i < qCount; i++) {
        dimSum += answers[currentIdx + i] ?? 0;
      }
      currentIdx += qCount;
      return {
        name: dim.name,
        description: dim.description,
        score: Math.round(dimSum / qCount)
      };
    });

    setCalculatedResult({
      score: totalScore,
      dimensionScores
    });
    setStep('analyzing');
  };

  // 3. Render steps inside premium card layout
  const renderStepContent = () => {
    switch (step) {
      case 'welcome':
        return (
          <WelcomeStep 
            email={email} 
            onNext={handleWelcomeNext} 
          />
        );
      case 'lead_info':
        return (
          <LeadInfoStep 
            data={leadData} 
            onNext={handleLeadInfoNext} 
            onBack={handleLeadInfoBack} 
          />
        );
      case 'questionnaire': {
        const { question, dimension } = getQuestionByIndex(currentQuestionIndex);
        return (
          <QuestionStep
            question={question}
            dimension={dimension}
            questionIndex={currentQuestionIndex}
            totalQuestions={20}
            selectedAnswerPoints={answers[currentQuestionIndex] !== undefined ? answers[currentQuestionIndex] : null}
            onSelectAnswer={handleSelectAnswer}
            onNext={handleQuestionNext}
            onBack={handleQuestionBack}
          />
        );
      }
      case 'analyzing':
        return (
          <AnalyzingStep 
            onComplete={handleAnalysisComplete} 
          />
        );
      case 'result':
        if (!calculatedResult) return null;
        return (
          <ResultDashboard
            score={calculatedResult.score}
            dimensionScores={calculatedResult.dimensionScores}
            leadData={{ ...leadData, email }}
            answers={Array.from({ length: 20 }, (_, i) => answers[i] ?? 0)}
            onReset={handleReset}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Background aesthetics */}
      <div className="bg-grid"></div>
      <div className="glow-orb"></div>

      {/* Header / Upper Bar with Logo Completa */}
      <header>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" className="logo">
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M42 12 H58 L80 88 H66 L66 48 H57 L57 88 H43 L43 48 H34 L34 88 H20 Z" fill="#ffffff" />
            </svg>
            <span className="logo-text">Audaces <span>AI</span></span>
          </a>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            Diagnostic System
          </span>
        </div>
      </header>

      {/* Main Form container */}
      <div className="container" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 1 }}>
        <main style={{ padding: '20px 0' }}>
          <div className="calculator-card">
            {renderStepContent()}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
