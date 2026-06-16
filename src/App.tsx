import { useState } from 'react';
import './App.css';
import { WelcomeStep } from './components/WelcomeStep';
import { LeadInfoStep } from './components/LeadInfoStep';
import { QuestionStep } from './components/QuestionStep';
import { AnalyzingStep } from './components/AnalyzingStep';
import { ResultDashboard } from './components/ResultDashboard';
import { dimensions, getQuestionByIndex } from './data/questions';
import { saveDiagnostico, markAsContacted } from './lib/saveData';

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
  const [step, setStep] = useState<Step>('welcome');
  const [email, setEmail] = useState('');
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    phone: '',
    website: '',
    role: ''
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [calculatedResult, setCalculatedResult] = useState<CalculatedResult | null>(null);
  const [diagnosticoId, setDiagnosticoId] = useState<string | null>(null);

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
    setDiagnosticoId(null);
  };

  const handleContact = () => {
    if (diagnosticoId) {
      markAsContacted(diagnosticoId);
    }
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

    // Persist to Supabase
    const classificacao = totalScore <= 25 ? 'Inicial'
      : totalScore <= 50 ? 'Em Desenvolvimento'
      : totalScore <= 75 ? 'Em Transição'
      : 'Avançado';

    saveDiagnostico(
      { email, nome: leadData.name, telefone: leadData.phone, website: leadData.website, cargo: leadData.role },
      totalScore,
      classificacao,
      dimensionScores,
      answers
    ).then(id => {
      if (id) setDiagnosticoId(id);
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
            onContact={handleContact}
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
