import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';

import './header.scss';
import logo from 'src/Images/logo.png';


const Header = ({ logged }) => {
  console.log('header:',logged)
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.assign('/connexion');
  };
  return (
    <header className="header">
      <Link to="/" className="logo"><Image src={logo} size="big" circular /></Link>
      { logged ? (
        <div>
          <Link to="/profil" className="profil">Profil</Link>
          <Button onClick={handleLogout} className="btn-header">Logout</Button>
        </div>
      ) : (
        <Link to="/connexion" className="profil">connexion</Link>
      )}

    </header>
  );
};

Header.propTypes = {
  logged: PropTypes.bool.isRequired,
};

export default Header;
