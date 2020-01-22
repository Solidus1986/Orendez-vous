import React from 'react';
import {Switch, NavLink, Route} from 'react-router-dom';

import './praticiens.scss';
import singlePraticien from 'src/components/Praticiens';

const Praticiens = () => {
    return(
      <div>   
        <h1>All Praticiens</h1> 
        <div className="avatar">Toto
            <NavLink to={'/osteopathie/praticiens/praticien'}>Praticiens</NavLink>
        </div>  
        <Switch>
            <Route path='/osteopathie/praticiens/praticien' component={singlePraticien} />
        </Switch>    
      </div>
    )
};

export default Praticiens;