import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  return (
    <header className=" mx-auto bg-blue-800 text-white flex items-center justify-between p-4 shadow-md">
      <div className="max-w-[768px] mx-auto w-full flex items-center justify-between">
        <div className="logo">
          <Link to="/" className="no-underline text-white">
            <h1 className="text-xl font-bold m-0">Streamr</h1>
          </Link>
        </div>
        <div className="settings">
          <Link to="/app/configurations" className="text-white hover:text-blue-200 transition-colors">
            <FontAwesomeIcon icon={faCog} className="text-xl" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
