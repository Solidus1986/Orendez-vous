import React from 'react';

const UserInfo = ({meta}) => {

  return (
  <div className="fiche">
    <div className="fiche-info">Prénom : {meta.first_name} </div>
    <div className="fiche-info">Nom : {meta.last_name} </div>
    <div className="fiche-info">Téléphone : {meta.phone_number} </div>
    <div className="fiche-info">Email : {meta.email} </div>
  </div>
  )};
    
export default UserInfo;
