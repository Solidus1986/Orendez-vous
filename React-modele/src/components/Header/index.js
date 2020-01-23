import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

import './header.scss';
import logo from 'src/Images/logo.png';


const Header = () => (
  <div className="header">
    <Link to="/" className="logo"><Image src={logo} size="big" circular /></Link>
    <Link to="/profil" className="profil">compte utilisateur</Link>
    <Link to="/connexion" className="profil">Connexion</Link>
  </div>
);

export default Header;
