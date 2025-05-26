import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

interface AppLayoutProps {
}

const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
