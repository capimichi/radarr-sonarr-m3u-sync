import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import AuthService from './services/AuthService';
import UserService from './services/UserService';
import VehicleService from './services/VehicleService';
import AuthClient from './clients/AuthClient';
import BackendClient from './clients/BackendClient';
import UserClient from './clients/UserClient';
import VehicleClient from './clients/VehicleClient';

// Definizione dell'interfaccia per il contesto dei servizi
interface ServicesContextType {
  authService: AuthService;
  userService: UserService;
  vehicleService: VehicleService;
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
    const authClient = new AuthClient(backendClient);
    const authService = new AuthService(authClient);
    
    // Create clients without token (they'll get it from Redux store)
    const userClient = new UserClient(backendClient);
    const userService = new UserService(userClient);
    
    // Vehicle service initialization
    const vehicleClient = new VehicleClient(backendClient);
    const vehicleService = new VehicleService(vehicleClient);

    const services: ServicesContextType = {
        authService,
        userService,
        vehicleService
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

// Hooks di utilità per accedere direttamente ai singoli servizi
export const useAuthService = (): AuthService => {
  return useServices().authService;
};

export const useUserService = (): UserService => {
  return useServices().userService;
};

export const useVehicleService = (): VehicleService => {
  return useServices().vehicleService;
};