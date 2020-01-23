import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react'


import './profil.scss';


const Profil = ({ firstname, lastname, phone, mail, username, password }) => {

  return (
    <div className="fiche">
      <div className="fiche-info">Prenom: {firstname}</div>
      <div className="fiche-info">Nom: {lastname}</div>
      <div className="fiche-info">Telephone: {phone}</div>
      <div className="fiche-info">Mail: {mail}</div>
      <div className="fiche-info">Pseudo: {username}</div>
      <div className="fiche-info">Mot de passe: ffffffffffffffffffffffffffffffffffdddddddddddddffff{password}</div>
    </div>
  );

Profil.propTypes = {
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    mail: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};
};

export default Profil;
