import React from 'react';
import './CustomizeView.css';

const CustomizeView = ({ 
  selectedProfile,
  selectedLanguage,
  layoutMode,
  advancedMode,
  setSelectedProfile,
  setSelectedLanguage,
  setLayoutMode,
  setAdvancedMode
}) => {
  
  const profiles = [
    { id: 'interview', name: 'Interview Mode', description: 'Optimized for job interviews' },
    { id: 'presentation', name: 'Presentation Mode', description: 'For presentations and demos' },
    { id: 'general', name: 'General Mode', description: 'All-purpose assistance' }
  ];

  const languages = [
    { id: 'en-US', name: 'English (US)' },
    { id: 'en-GB', name: 'English (UK)' },
    { id: 'es-ES', name: 'Spanish' },
    { id: 'fr-FR', name: 'French' },
    { id: 'de-DE', name: 'German' }
  ];

  const layoutModes = [
    { id: 'normal', name: 'Normal', description: 'Standard window size' },
    { id: 'compact', name: 'Compact', description: 'Smaller window size' },
    { id: 'minimal', name: 'Minimal', description: 'Minimal interface' }
  ];

  const handleProfileChange = (profileId) => {
    setSelectedProfile(profileId);
    localStorage.setItem('selectedProfile', profileId);
  };

  const handleLanguageChange = (languageId) => {
    setSelectedLanguage(languageId);
    localStorage.setItem('selectedLanguage', languageId);
  };

  const handleLayoutChange = (layoutId) => {
    setLayoutMode(layoutId);
    localStorage.setItem('layoutMode', layoutId);
    document.documentElement.setAttribute('data-layout', layoutId);
  };

  const handleAdvancedModeToggle = () => {
    const newMode = !advancedMode;
    setAdvancedMode(newMode);
    localStorage.setItem('advancedMode', newMode.toString());
  };

  return (
    <div className="customize-view">
      <h2>Customize Settings</h2>
      
      <div className="setting-section">
        <h3>Profile</h3>
        <div className="options-grid">
          {profiles.map(profile => (
            <div 
              key={profile.id}
              className={`option-card ${selectedProfile === profile.id ? 'selected' : ''}`}
              onClick={() => handleProfileChange(profile.id)}
            >
              <div className="option-name">{profile.name}</div>
              <div className="option-description">{profile.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="setting-section">
        <h3>Language</h3>
        <select 
          value={selectedLanguage} 
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="select-input"
        >
          {languages.map(language => (
            <option key={language.id} value={language.id}>
              {language.name}
            </option>
          ))}
        </select>
      </div>

      <div className="setting-section">
        <h3>Layout Mode</h3>
        <div className="options-grid">
          {layoutModes.map(layout => (
            <div 
              key={layout.id}
              className={`option-card ${layoutMode === layout.id ? 'selected' : ''}`}
              onClick={() => handleLayoutChange(layout.id)}
            >
              <div className="option-name">{layout.name}</div>
              <div className="option-description">{layout.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="setting-section">
        <h3>Advanced Features</h3>
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={advancedMode}
            onChange={handleAdvancedModeToggle}
          />
          <span className="toggle-slider"></span>
          Enable Advanced Mode
        </label>
      </div>
    </div>
  );
};

export default CustomizeView;