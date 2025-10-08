import React, { useState } from 'react';
import './OnboardingView.css';

const OnboardingView = ({ onViewChange }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to Cheating Daddy',
      description: 'Your AI assistant for interviews and presentations',
      icon: '👋'
    },
    {
      title: 'Screen Capture',
      description: 'We capture your screen to understand the context',
      icon: '📱'
    },
    {
      title: 'Voice Analysis',
      description: 'We listen to conversations to provide relevant assistance',
      icon: '🎤'
    },
    {
      title: 'AI Assistance',
      description: 'Get intelligent responses and suggestions in real-time',
      icon: '🤖'
    },
    {
      title: 'Ready to Start',
      description: 'You are all set! Click finish to begin using Cheating Daddy',
      icon: '🚀'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    onViewChange('main');
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="onboarding-view">
      <div className="onboarding-container">
        <div className="step-indicator">
          {steps.map((_, index) => (
            <div 
              key={index} 
              className={`step-dot ${index <= currentStep ? 'active' : ''}`}
            />
          ))}
        </div>

        <div className="step-content">
          <div className="step-icon">{currentStepData.icon}</div>
          <h2 className="step-title">{currentStepData.title}</h2>
          <p className="step-description">{currentStepData.description}</p>
        </div>

        <div className="step-controls">
          {currentStep > 0 && (
            <button onClick={handlePrevious} className="btn-secondary">
              Previous
            </button>
          )}
          
          <button onClick={handleNext} className="btn-primary">
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingView;