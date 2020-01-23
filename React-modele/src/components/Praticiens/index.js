import React from 'react';
import {Link} from 'react-router-dom';

import './praticiens.scss';

const Praticiens = () => {
    return(
      <div>   
        <h1>All Praticiens</h1> 
        <div className="avatar">
            <Link to={'/osteopathie/praticiens/praticien'}>Praticiens</Link>
        </div>   
      </div>
    )
};

export default Praticiens;
