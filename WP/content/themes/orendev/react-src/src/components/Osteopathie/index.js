import React from 'react';

import './osteopathie.scss'

const Osteopathie = () => {
  return (
  <>
    <h1>Ostéopathie</h1>
      <ul>
        <li>Adulte</li>
        <li>Femme enceinte</li>
        <li>Nourisson</li>
        <li>Sportif</li>
        <li>Sénior</li>
      </ul>
    <button className="coach">Praticiens</button>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas magnam dolorum vitae aut qui quam laboriosam eius 
      omnis quo? Dolore explicabo incidunt quia fugiat consequuntur vero unde omnis eius tempore?
    </p>
    <button className="appointment">Rendez-vous</button>
    <button className="infos-osteo">Infos</button>
    <button className="activity-pilates">Pilates</button>
    
  </>
  )
}

export default Osteopathie;
