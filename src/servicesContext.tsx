import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import BackendClient from './clients/BackendClient';
import SearchService from './services/SearchService';

// Definizione dell'interfaccia per il contesto dei servizi
interface ServicesContextType {
  searchService: SearchService;
}

// Creazione del contesto React
const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

// Provider component per rendere disponibili i servizi
interface ServicesProviderProps {
  children: ReactNode;
}

export const ServicesProvider: React.FC<ServicesProviderProps> = ({
  children
}) => {
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

    // Inizializzazione dei client e dei servizi
    const backendClient = new BackendClient(backendUrl);
    const searchService = new SearchService(backendClient);

    const services: ServicesContextType = {
        searchService,
    };

    return (
        <ServicesContext.Provider value={services}>
        {children}
        </ServicesContext.Provider>
    );
};

// Hook personalizzato per utilizzare i servizi
export const useServices = (): ServicesContextType => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServices deve essere utilizzato all\'interno di un ServicesProvider');
  }
  return context;
};