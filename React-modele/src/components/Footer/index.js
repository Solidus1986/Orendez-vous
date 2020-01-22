import React from 'react';
import {Switch, NavLink, Route} from 'react-router-dom';



import Infos from 'src/components/Infos';
import Page from 'src/components/Page';


import './footer.scss';

const Footer = () => {

    return (
    <div>
        
        <button className="btn-infos-osteo"><NavLink to={'/infos'}>Infos</NavLink></button>
        <button className="btn-activity-pilates"><NavLink to={'/page'}>Page</NavLink></button>
        <Switch>
          <Route path='/infos' component={Infos} />
          <Route path='/page' component={Page} />
      </Switch>
    </div>
    )
};

export default Footer;