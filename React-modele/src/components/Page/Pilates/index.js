import React from 'react';

import './pilates.scss'

const Pilates = () => {
  return (
  <>
    <h1>Pilates</h1>
      <ul>
        <li>Pour Qui?</li>
        <li>Matériel</li>
      </ul>
    <button className="coach">Praticien</button>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas magnam dolorum vitae aut qui quam laboriosam eius 
      omnis quo? Dolore explicabo incidunt quia fugiat consequuntur vero unde omnis eius tempore?
    </p>
    <button className="appointment">Rendez-vous</button>
    <button className="infos-pilates">Infos</button>
    <button className="activity-osteo">Ostéopathie</button>
    
  </>
  )
}

export default Pilates;
