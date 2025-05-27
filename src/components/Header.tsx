import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">
          <h1>Streamr</h1>
        </Link>
      </div>
      <div className="settings">
        <Link to="/settings">
          <FontAwesomeIcon icon={faCog} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
