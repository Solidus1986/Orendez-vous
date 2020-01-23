import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';


const Header = () => (
  <div className="header">
    <Link to="/" className="logo">logo du site</Link>
    <Link to="/profil" className="profil">compte utilisateur</Link>
    <Link to="/connexion" className="profil">Connexion</Link>
  </div>
);

export default Header;
