import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

import './header.scss';
import logo from 'src/Images/logo.png';


const Header = () => (
  <header className="header">
    <Link to="/" className="logo"><Image src={logo} size="big" circular /></Link>
    <Link to="/profil" className="profil">Utilisateur</Link>
    <Link to="/connexion" className="profil">Connexion</Link>
  </header>
);

export default Header;
