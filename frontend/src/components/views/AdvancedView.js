import React from 'react';
import './AdvancedView.css';

const AdvancedView = () => {
  return (
    <div className="advanced-view">
      <h2>Advanced Tools</h2>
      
      <div className="advanced-section">
        <h3>Screen Capture Settings</h3>
        <div className="setting-item">
          <label>Screenshot Interval</label>
          <select className="select-input">
            <option value="3">3 seconds</option>
            <option value="5">5 seconds</option>
            <option value="10">10 seconds</option>
          </select>
        </div>
        
        <div className="setting-item">
          <label>Image Quality</label>
          <select className="select-input">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="advanced-section">
        <h3>Audio Processing</h3>
        <div className="setting-item">
          <label>Noise Reduction</label>
          <input type="checkbox" />
        </div>
        
        <div className="setting-item">
          <label>Voice Enhancement</label>
          <input type="checkbox" />
        </div>
      </div>

      <div className="advanced-section">
        <h3>AI Model Settings</h3>
        <div className="setting-item">
          <label>Response Speed</label>
          <select className="select-input">
            <option value="fast">Fast</option>
            <option value="balanced">Balanced</option>
            <option value="accurate">Accurate</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AdvancedView;