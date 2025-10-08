import React, { useState, useEffect } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import MainView from './components/views/MainView';
import CustomizeView from './components/views/CustomizeView';
import HelpView from './components/views/HelpView';
import HistoryView from './components/views/HistoryView';
import AssistantView from './components/views/AssistantView';
import OnboardingView from './components/views/OnboardingView';
import AdvancedView from './components/views/AdvancedView';

function App() {
  const [currentView, setCurrentView] = useState(() => 
    localStorage.getItem('onboardingCompleted') ? 'main' : 'onboarding'
  );
  const [statusText, setStatusText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(() => 
    localStorage.getItem('selectedProfile') || 'interview'
  );
  const [selectedLanguage, setSelectedLanguage] = useState(() => 
    localStorage.getItem('selectedLanguage') || 'en-US'
  );
  const [responses, setResponses] = useState([]);
  const [currentResponseIndex, setCurrentResponseIndex] = useState(-1);
  const [selectedScreenshotInterval, setSelectedScreenshotInterval] = useState(() => 
    localStorage.getItem('selectedScreenshotInterval') || '5'
  );
  const [selectedImageQuality, setSelectedImageQuality] = useState(() => 
    localStorage.getItem('selectedImageQuality') || 'medium'
  );
  const [layoutMode, setLayoutMode] = useState(() => 
    localStorage.getItem('layoutMode') || 'normal'
  );
  const [advancedMode, setAdvancedMode] = useState(() => 
    localStorage.getItem('advancedMode') === 'true'
  );
  const [, setIsClickThrough] = useState(false);
  const [awaitingNewResponse, setAwaitingNewResponse] = useState(false);
  const [shouldAnimateResponse, setShouldAnimateResponse] = useState(false);

  const updateLayoutMode = React.useCallback(() => {
    document.documentElement.setAttribute('data-layout', layoutMode);
  }, [layoutMode]);

  const setResponse = React.useCallback((response) => {
    const isFillerResponse =
      response.length < 30 &&
      (response.toLowerCase().includes('hmm') ||
        response.toLowerCase().includes('okay') ||
        response.toLowerCase().includes('next') ||
        response.toLowerCase().includes('go on') ||
        response.toLowerCase().includes('continue'));

    if (awaitingNewResponse || responses.length === 0) {
      setResponses(prev => [...prev, response]);
      setCurrentResponseIndex(responses.length);
      setAwaitingNewResponse(false);
    } else if (!isFillerResponse && responses.length > 0) {
      setResponses(prev => {
        const newResponses = [...prev];
        newResponses[newResponses.length - 1] = response;
        return newResponses;
      });
    }
  }, [awaitingNewResponse, responses.length]);

  useEffect(() => {
    updateLayoutMode();
  }, [layoutMode, updateLayoutMode]);

  useEffect(() => {
    // Set up IPC listeners if available
    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      
      const handleUpdateResponse = (_, response) => {
        setResponse(response);
      };
      
      const handleUpdateStatus = (_, status) => {
        setStatusText(status);
      };
      
      const handleClickThroughToggled = (_, isEnabled) => {
        setIsClickThrough(isEnabled);
      };

      ipcRenderer.on('update-response', handleUpdateResponse);
      ipcRenderer.on('update-status', handleUpdateStatus);
      ipcRenderer.on('click-through-toggled', handleClickThroughToggled);

      return () => {
        ipcRenderer.removeAllListeners('update-response');
        ipcRenderer.removeAllListeners('update-status');
        ipcRenderer.removeAllListeners('click-through-toggled');
      };
    }
  }, [setResponse]);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    const commonProps = {
      statusText,
      startTime,
      isRecording,
      sessionActive,
      selectedProfile,
      selectedLanguage,
      responses,
      currentResponseIndex,
      selectedScreenshotInterval,
      selectedImageQuality,
      layoutMode,
      advancedMode,
      setStatusText,
      setStartTime,
      setIsRecording,
      setSessionActive,
      setSelectedProfile,
      setSelectedLanguage,
      setResponses,
      setCurrentResponseIndex,
      setSelectedScreenshotInterval,
      setSelectedImageQuality,
      setLayoutMode,
      setAdvancedMode,
      shouldAnimateResponse,
      setShouldAnimateResponse,
    };

    switch (currentView) {
      case 'main':
        return <MainView {...commonProps} />;
      case 'customize':
        return <CustomizeView {...commonProps} />;
      case 'help':
        return <HelpView {...commonProps} />;
      case 'history':
        return <HistoryView {...commonProps} />;
      case 'assistant':
        return <AssistantView {...commonProps} />;
      case 'onboarding':
        return <OnboardingView {...commonProps} onViewChange={handleViewChange} />;
      case 'advanced':
        return <AdvancedView {...commonProps} />;
      default:
        return <MainView {...commonProps} />;
    }
  };

  const getMainContentClass = () => {
    let classes = 'main-content';
    if (currentView === 'assistant') classes += ' assistant-view';
    if (currentView === 'onboarding') classes += ' onboarding-view';
    if (currentView !== 'assistant' && currentView !== 'onboarding') classes += ' with-border';
    return classes;
  };

  return (
    <div className="App">
      <div className="window-container">
        <div className="container">
          {currentView !== 'onboarding' && (
            <AppHeader 
              currentView={currentView}
              onViewChange={handleViewChange}
              layoutMode={layoutMode}
              advancedMode={advancedMode}
            />
          )}
          <div className={getMainContentClass()}>
            <div className="view-container">
              {renderCurrentView()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;