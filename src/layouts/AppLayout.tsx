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
        <main className="max-w-[768px] mx-auto my-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
