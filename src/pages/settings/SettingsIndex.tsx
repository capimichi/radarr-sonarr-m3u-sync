import React, { useState } from 'react';
import AppLayout from '../../layouts/AppLayout';

interface SettingsForm {
  radarrApiUrl: string;
  radarrApiKey: string;
  sonarrApiUrl: string;
  sonarrApiKey: string;
  m3uOutputPath: string;
}

const SettingsIndex: React.FC = () => {
  const [settings, setSettings] = useState<SettingsForm>({
    radarrApiUrl: '',
    radarrApiKey: '',
    sonarrApiUrl: '',
    sonarrApiKey: '',
    m3uOutputPath: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic would go here
    console.log('Settings to save:', settings);
    // Call to API or service to save settings
  };

  return (
    <AppLayout>
      <div className="settings-page">
        <h1>Settings</h1>
        
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-section">
            <h2>Radarr Configuration</h2>
            
            <div className="form-group">
              <label htmlFor="radarrApiUrl">Radarr API URL</label>
              <input
                type="text"
                id="radarrApiUrl"
                name="radarrApiUrl"
                value={settings.radarrApiUrl}
                onChange={handleChange}
                placeholder="http://localhost:7878/api"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="radarrApiKey">Radarr API Key</label>
              <input
                type="password"
                id="radarrApiKey"
                name="radarrApiKey"
                value={settings.radarrApiKey}
                onChange={handleChange}
                placeholder="Your Radarr API key"
              />
            </div>
          </div>
          
          <div className="form-section">
            <h2>Sonarr Configuration</h2>
            
            <div className="form-group">
              <label htmlFor="sonarrApiUrl">Sonarr API URL</label>
              <input
                type="text"
                id="sonarrApiUrl"
                name="sonarrApiUrl"
                value={settings.sonarrApiUrl}
                onChange={handleChange}
                placeholder="http://localhost:8989/api"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="sonarrApiKey">Sonarr API Key</label>
              <input
                type="password"
                id="sonarrApiKey"
                name="sonarrApiKey"
                value={settings.sonarrApiKey}
                onChange={handleChange}
                placeholder="Your Sonarr API key"
              />
            </div>
          </div>
          
          <div className="form-section">
            <h2>M3U Output Configuration</h2>
            
            <div className="form-group">
              <label htmlFor="m3uOutputPath">M3U Output Path</label>
              <input
                type="text"
                id="m3uOutputPath"
                name="m3uOutputPath"
                value={settings.m3uOutputPath}
                onChange={handleChange}
                placeholder="/path/to/output.m3u"
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-button">Save Settings</button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default SettingsIndex;
