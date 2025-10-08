import React from 'react';
import './AssistantView.css';

const AssistantView = ({ 
  responses, 
  currentResponseIndex, 
  statusText,
  shouldAnimateResponse 
}) => {
  const getCurrentResponse = () => {
    if (responses.length === 0 || currentResponseIndex < 0) {
      return '';
    }
    return responses[currentResponseIndex] || '';
  };

  return (
    <div className="assistant-view">
      <div className="response-container">
        <div className={`response-text ${shouldAnimateResponse ? 'animating' : ''}`}>
          {getCurrentResponse() || (
            <div className="placeholder">
              {statusText || 'Waiting for response...'}
            </div>
          )}
        </div>
      </div>
      
      <div className="response-controls">
        <div className="response-counter">
          {responses.length > 0 && (
            `${currentResponseIndex + 1} / ${responses.length}`
          )}
        </div>
      </div>
    </div>
  );
};

export default AssistantView;