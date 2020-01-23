import React from 'react';
import { Route, Link, Switch, NavLink} from 'react-router-dom';

import Osteopathie from 'src/components/Page/Osteopathie';
import Pilates from 'src/components/Page/Pilates';

import './nav.scss';

const Nav = () => {
    return (
        <div>
          <nav className="nav">
            <div className="osteopathie">
              <NavLink to={'/osteopathie'}>Ostéopathie </NavLink>
            </div>
            <div className="pilates">
              <Link to={'/pilates'} className="pilates">Pilates</Link>
            </div>
          </nav>
        </div>
        )};

export default Nav;
