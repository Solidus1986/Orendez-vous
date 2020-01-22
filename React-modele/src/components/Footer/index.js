import React from 'react';
import {Switch, NavLink, Route} from 'react-router-dom';



import Infos from 'src/components/Infos';
import Pilates from 'src/components/Pilates';


import './footer.scss';

const Footer = () => {

    return (
    <div>
        
        <button className="btn-infos-osteo"><NavLink to={'/infos'}>Infos</NavLink></button>
        <button className="btn-activity-pilates"><NavLink to={'pilates'}>Pilates</NavLink></button>
        <Switch>
          <Route path='/infos' component={Infos} />
          <Route path='/pilates' component={Pilates} />
      </Switch>
    </div>
    )
};

export default Footer;