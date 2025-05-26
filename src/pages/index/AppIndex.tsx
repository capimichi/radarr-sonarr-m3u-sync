import React from 'react';
import AppLayout from '../../layouts/AppLayout';

const AppIndex: React.FC = () => {
  return (
    <AppLayout>
      <div className="app-index-page">
        <h1>Welcome to Radarr/Sonarr M3U Sync</h1>
        <div className="dashboard-summary">
          <div className="card">
            <h2>Movies</h2>
            <p>Manage your Radarr movie library</p>
          </div>
          <div className="card">
            <h2>Series</h2>
            <p>Manage your Sonarr series library</p>
          </div>
          <div className="card">
            <h2>Settings</h2>
            <p>Configure your application settings</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AppIndex;
