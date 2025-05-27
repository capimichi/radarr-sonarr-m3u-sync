import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  return (
    <header className="max-w-[480px] mx-auto bg-blue-800 text-white flex items-center justify-between p-4 shadow-md">
      <div className="logo">
        <Link to="/" className="no-underline text-white">
          <h1 className="text-xl font-bold m-0">Streamr</h1>
        </Link>
      </div>
      <div className="settings">
        <Link to="/settings" className="text-white hover:text-blue-200 transition-colors">
          <FontAwesomeIcon icon={faCog} className="text-xl" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
