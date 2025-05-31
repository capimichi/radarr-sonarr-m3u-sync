import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

interface AppLayoutProps {
}

const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <div className="bg-background">
      <div className="">
        <Header />
        <main className="max-w-[768px] mx-auto my-7">
          <div className="min-h-screen">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
