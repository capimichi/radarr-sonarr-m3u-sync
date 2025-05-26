import React, { ReactNode } from 'react';
import Header from '../components/Header';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-content">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
