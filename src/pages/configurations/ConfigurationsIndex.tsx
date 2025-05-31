import React, { useEffect, useState } from 'react';
import { useServices } from '../../servicesContext';
import type Configuration from '../../types/Configuration';

const ConfigurationsIndex: React.FC = () => {
  const { configurationService } = useServices();
  const [configuration, setConfiguration] = useState<Configuration>({
    radarr_enabled: false,
    radarr_base_url: '',
    radarr_api_key: '',
    radarr_base_dir: '',
    sonarr_enabled: false,
    sonarr_base_url: '',
    sonarr_api_key: '',
    sonarr_base_dir: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchConfiguration = async () => {
      try {
        setLoading(true);
        const config = await configurationService.getConfiguration();
        setConfiguration(config);
        setError(null);
      } catch (err) {
        setError('Errore nel caricamento della configurazione');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfiguration();
  }, [configurationService]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setConfiguration(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    
    try {
      await configurationService.updateConfiguration(configuration);
      setSaveSuccess(true);
      setError(null);
    } catch (err) {
      setError('Errore nel salvataggio della configurazione');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Caricamento configurazioni...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Configurazioni</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {saveSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Configurazione salvata con successo!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Radarr Configuration */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Radarr</h2>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="radarr_enabled"
                checked={configuration.radarr_enabled}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span>Abilitato</span>
            </label>
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">URL Base</label>
            <input
              type="text"
              name="radarr_base_url"
              value={configuration.radarr_base_url}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="http://localhost:7878"
              disabled={!configuration.radarr_enabled}
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">API Key</label>
            <input
              type="password"
              name="radarr_api_key"
              value={configuration.radarr_api_key}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="API Key"
              disabled={!configuration.radarr_enabled}
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">Directory Base</label>
            <input
              type="text"
              name="radarr_base_dir"
              value={configuration.radarr_base_dir}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="/path/to/movies"
              disabled={!configuration.radarr_enabled}
            />
          </div>
        </div>
        
        {/* Sonarr Configuration */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Sonarr</h2>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="sonarr_enabled"
                checked={configuration.sonarr_enabled}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span>Abilitato</span>
            </label>
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">URL Base</label>
            <input
              type="text"
              name="sonarr_base_url"
              value={configuration.sonarr_base_url}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="http://localhost:8989"
              disabled={!configuration.sonarr_enabled}
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">API Key</label>
            <input
              type="password"
              name="sonarr_api_key"
              value={configuration.sonarr_api_key}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="API Key"
              disabled={!configuration.sonarr_enabled}
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">Directory Base</label>
            <input
              type="text"
              name="sonarr_base_dir"
              value={configuration.sonarr_base_dir}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="/path/to/tvshows"
              disabled={!configuration.sonarr_enabled}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={saving}
          >
            {saving ? 'Salvataggio...' : 'Salva Configurazioni'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfigurationsIndex;
