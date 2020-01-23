import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';


const Header = () => (
  <div className="header">
    <div className="logo">logo du site</div>
    <Link to="/profil" className="profil">compte utilisateur </Link>
    <Link to="/connexion" className="profil">Connexion</Link>
  </div>
);

export default Header;
