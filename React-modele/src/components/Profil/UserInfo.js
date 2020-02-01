import React from 'react';

const UserInfo = ({meta}) => {

  return (
  <div className="fiche">
    <div className="fiche-info">Prenom : {meta.first_name} </div>
    <div className="fiche-info">Nom : {meta.last_name} </div>
    <div className="fiche-info">Telephone : {meta.phone_number} </div>
    <div className="fiche-info">Mail : {meta.email} </div>
  </div>
  )};
    
export default UserInfo;
