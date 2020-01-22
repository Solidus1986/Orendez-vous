import React from 'react';

import './praticiens.scss';

const Praticiens = () => {
    return(
      <div>
            <button className="coachs"><NavLink to={'/osteopathie/praticiens/praticien'}>Praticiens</NavLink></button>
            <Switch>
              <Route path='/osteopathie/praticiens/praticien' component={Praticien} />
            </Switch>
        <h1>All Praticiens</h1> 
        <div className="avatar">Toto</div>      
      </div>
    )
};

export default Praticiens;