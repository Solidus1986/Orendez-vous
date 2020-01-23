import React from 'react';
import { Link } from 'react-router-dom';

import './nav.scss';

const Nav = () => {
  return (
    <div className="nav">
      <nav>
        <Link to="/pratiques" id="pratiques">pratique</Link>
      </nav>
    </div>
  );
};

export default Nav;