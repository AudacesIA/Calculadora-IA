import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { Question, Dimension } from '../data/questions';

interface QuestionStepProps {
  question: Question;
  dimension: Dimension;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswerPoints: number | null;
  onSelectAnswer: (points: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({
  question,
  dimension,
  questionIndex,
  totalQuestions,
  selectedAnswerPoints,
  onSelectAnswer,
  onNext,
  onBack
}) => {
  const [animationClass, setAnimationClass] = useState('fade-enter fade-enter-active');

  // Trigger animation when questionIndex changes
  useEffect(() => {
    setAnimationClass('fade-enter');
    const timer = setTimeout(() => {
      setAnimationClass('fade-enter fade-enter-active');
    }, 50);
    return () => clearTimeout(timer);
  }, [questionIndex]);

  const progressPercent = ((questionIndex) / totalQuestions) * 100;

  const handleOptionClick = (points: number) => {
    onSelectAnswer(points);
    // Auto-advance with a minor delay for user feedback
    setTimeout(() => {
      onNext();
    }, 350);
  };

  return (
    <div className={animationClass}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span className="dim-badge">{dimension.name}</span>
        <span className="step-counter" style={{ margin: 0 }}>
          Pergunta {questionIndex + 1} / {totalQuestions}
        </span>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <div style={{ textAlign: 'left', minHeight: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ 
            fontFamily: 'Outfit, sans-serif', 
            fontSize: 'clamp(18px, 3.5vw, 22px)', 
            fontWeight: 700, 
            lineHeight: 1.35,
            color: '#f0f4ff', 
            marginBottom: '10px' 
          }}>
            {question.text}
          </h2>
          <p style={{ 
            fontSize: '13px', 
            color: 'var(--text-muted)', 
            marginBottom: '24px',
            fontStyle: 'italic'
          }}>
            {dimension.description}
          </p>

          <div className="options-list">
            {question.options.map((option) => {
              const isSelected = selectedAnswerPoints === option.points;
              return (
                <div
                  key={option.letter}
                  className={`option-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option.points)}
                >
                  <div className="option-radio">
                    <div className="option-radio-dot"></div>
                  </div>
                  <span className="option-text">
                    <strong style={{ color: isSelected ? 'var(--accent)' : 'var(--text-primary)', marginRight: '6px' }}>
                      {option.letter})
                    </strong>
                    {option.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '36px', gap: '16px' }}>
          <button type="button" className="btn-secondary" onClick={onBack}>
            <ArrowLeft size={18} /> Voltar
          </button>
          
          <button 
            type="button" 
            className="btn-primary" 
            onClick={onNext}
            disabled={selectedAnswerPoints === null}
          >
            {questionIndex === totalQuestions - 1 ? 'Finalizar' : 'Próxima'} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
