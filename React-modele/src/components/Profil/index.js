import React from 'react';
import PropTypes from 'prop-types';


import './profil.scss';


const Profil = ({ data }) => {

  return (
    <div className="fiche">
      <div className="fiche-info">Prenom: {data.firstname}</div>
      <div className="fiche-info">Nom: {data.lastname}</div>
      <div className="fiche-info">Telephone: {data.phone}</div>
      <div className="fiche-info">Mail: {data.mail}</div>
      <div className="fiche-info">Pseudo: {data.username}</div>
      <div className="fiche-info">Mot de passe: {data.password}</div>
    </div>
  );

Profil.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      firstname: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
};

export default Profil;
