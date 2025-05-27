import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

interface AppLayoutProps {
}

const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <div className="">
      <div className="">
        <Header />
        <main className="max-w-[480px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
