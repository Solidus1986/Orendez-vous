import React from 'react';

import './pilates.scss'

const Pilates = () => {
  return (
  <div className="pilates">
    <h1>Pilates</h1>
      <ul>
        <li>Pour Qui?</li>
        <li>Matériel</li>
      </ul>
    <a className="coach">Praticien</a>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas magnam dolorum vitae aut qui quam laboriosam eius 
      omnis quo? Dolore explicabo incidunt quia fugiat consequuntur vero unde omnis eius tempore?
    </p>
    <a className="appointment">Rendez-vous</a>
    <a className="infos-pilates">Infos</a>
    <a className="activity-osteo">Ostéopathie</a>
  </div>
  )
}

export default Pilates;
