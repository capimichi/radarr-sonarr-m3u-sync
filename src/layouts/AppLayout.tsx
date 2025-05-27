import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

interface AppLayoutProps {
}

const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="app-layout w-full max-w-[480px] bg-white shadow-md">
        <Header />
        <main className="app-content p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
