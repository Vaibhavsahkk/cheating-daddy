import React from 'react';
import './HistoryView.css';

const HistoryView = ({ responses }) => {
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      // Clear history logic would go here
      console.log('Clearing history...');
    }
  };

  return (
    <div className="history-view">
      <div className="history-header">
        <h2>Conversation History</h2>
        <button onClick={handleClearHistory} className="clear-button">
          Clear History
        </button>
      </div>
      
      {responses.length === 0 ? (
        <div className="empty-state">
          <p>No conversation history yet.</p>
          <p>Start a session to see your responses here.</p>
        </div>
      ) : (
        <div className="history-list">
          {responses.map((response, index) => (
            <div key={index} className="history-item">
              <div className="history-index">#{index + 1}</div>
              <div className="history-content">{response}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;