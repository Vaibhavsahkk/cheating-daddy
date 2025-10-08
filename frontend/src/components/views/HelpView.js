import React from 'react';
import './HelpView.css';

const HelpView = () => {
  const shortcuts = [
    { key: 'Ctrl+Enter (Cmd+Enter)', description: 'Start new session' },
    { key: 'Ctrl+\\ (Cmd+\\)', description: 'Toggle visibility' },
    { key: 'Ctrl+M (Cmd+M)', description: 'Toggle click-through' },
    { key: 'Ctrl+[ (Cmd+[)', description: 'Previous response' },
    { key: 'Ctrl+] (Cmd+])', description: 'Next response' },
    { key: 'Ctrl+Shift+E (Cmd+Shift+E)', description: 'Emergency erase' }
  ];

  return (
    <div className="help-view">
      <h2>Help & Shortcuts</h2>
      
      <div className="help-section">
        <h3>Keyboard Shortcuts</h3>
        <div className="shortcuts-list">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="shortcut-item">
              <span className="shortcut-key">{shortcut.key}</span>
              <span className="shortcut-description">{shortcut.description}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="help-section">
        <h3>How to Use</h3>
        <ol className="instructions-list">
          <li>Enter your Gemini API key in the main screen</li>
          <li>Click "Start Session" or use Ctrl+Enter</li>
          <li>The app will capture your screen and audio</li>
          <li>Ask questions or wait for AI responses</li>
          <li>Use keyboard shortcuts for quick navigation</li>
        </ol>
      </div>

      <div className="help-section">
        <h3>About</h3>
        <p>Cheating Daddy is an AI assistant that helps you during interviews and presentations by providing real-time responses based on screen capture and audio analysis.</p>
      </div>
    </div>
  );
};

export default HelpView;