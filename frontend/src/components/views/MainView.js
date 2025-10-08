import React, { useState, useEffect } from 'react';
import './MainView.css';

const MainView = ({ 
  isInitializing,
  setIsRecording,
  setSessionActive,
  setStartTime,
  onViewChange
}) => {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('apiKey') || '');
  const [showApiKeyError, setShowApiKeyError] = useState(false);

  const triggerApiKeyError = React.useCallback(() => {
    setShowApiKeyError(true);
    setTimeout(() => {
      setShowApiKeyError(false);
    }, 1000);
  }, []);

  const handleStartClick = React.useCallback(() => {
    if (isInitializing) {
      return;
    }

    if (!apiKey.trim()) {
      triggerApiKeyError();
      return;
    }

    // Start the session
    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send('start-session', { apiKey: apiKey.trim() });
    }
    
    setIsRecording(true);
    setSessionActive(true);
    setStartTime(Date.now());
    onViewChange('assistant');
  }, [isInitializing, apiKey, setIsRecording, setSessionActive, setStartTime, onViewChange, triggerApiKeyError]);

  useEffect(() => {
    // Load layout mode on mount
    loadLayoutMode();
    
    // Add keyboard event listener for Ctrl+Enter (or Cmd+Enter on Mac)
    const handleKeydown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isStartShortcut = isMac ? e.metaKey && e.key === 'Enter' : e.ctrlKey && e.key === 'Enter';

      if (isStartShortcut) {
        e.preventDefault();
        handleStartClick();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    // Set up Electron IPC listeners if available
    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      const handleSessionInitializing = (event, initializing) => {
        // Handle session initializing state
      };
      
      ipcRenderer.on('session-initializing', handleSessionInitializing);
      
      return () => {
        document.removeEventListener('keydown', handleKeydown);
        ipcRenderer.removeAllListeners('session-initializing');
      };
    }

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [handleStartClick]);

  const handleInput = (e) => {
    const value = e.target.value;
    setApiKey(value);
    localStorage.setItem('apiKey', value);
    
    // Clear error state when user starts typing
    if (showApiKeyError) {
      setShowApiKeyError(false);
    }
  };

  const handleAPIKeyHelpClick = () => {
    if (window.require) {
      const { shell } = window.require('electron');
      shell.openExternal('https://aistudio.google.com/app/apikey');
    }
  };

  const loadLayoutMode = () => {
    const savedLayoutMode = localStorage.getItem('layoutMode');
    if (savedLayoutMode && savedLayoutMode !== 'normal') {
      // Apply saved layout mode to document
      document.documentElement.setAttribute('data-layout', savedLayoutMode);
    }
  };

  const getStartButtonContent = () => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    
    const CmdIcon = () => (
      <svg width="14px" height="14px" viewBox="0 0 24 24" strokeWidth="2" fill="none">
        <path d="M9 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9H18C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15H18C19.6569 15 21 16.3431 21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const EnterIcon = () => (
      <svg width="14px" height="14px" strokeWidth="2" viewBox="0 0 24 24" fill="none">
        <path
          d="M10.25 19.25L6.75 15.75L10.25 12.25"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.75 15.75H12.75C14.9591 15.75 16.75 13.9591 16.75 11.75V4.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    if (isMac) {
      return (
        <>
          Start Session 
          <span className="shortcut-icons">
            <CmdIcon />
            <EnterIcon />
          </span>
        </>
      );
    } else {
      return (
        <>
          Start Session 
          <span className="shortcut-icons">
            Ctrl
            <EnterIcon />
          </span>
        </>
      );
    }
  };

  return (
    <div className="main-view">
      <div className="welcome">Welcome</div>

      <div className="input-group">
        <input
          type="password"
          placeholder="Enter your Gemini API Key"
          value={apiKey}
          onChange={handleInput}
          className={showApiKeyError ? 'api-key-error' : ''}
        />
        <button 
          onClick={handleStartClick} 
          className={`start-button ${isInitializing ? 'initializing' : ''}`}
        >
          {getStartButtonContent()}
        </button>
      </div>
      
      <p className="description">
        dont have an api key?{' '}
        <span onClick={handleAPIKeyHelpClick} className="link">
          get one here
        </span>
      </p>
    </div>
  );
};

export default MainView;