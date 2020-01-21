// == Import : npm
import React from 'react';
import { Route, Link, Switch, NavLink} from 'react-router-dom'



// Import composants
import Osteopathie from './components/Osteopathie'
import Pilates from './components/Pilates'


// == Import : local
import './app.scss';

// == Composant
class App extends React.Component {
  state={
    currentView: [],
  }

  render () {
    return(
      <div id="app">
        <header>
          <div className="logo"><Link to={'/ORENDEZVOUS/projet-rdv-osteo-pilates/WP/wp'}></Link>Logo</div>
          <div className="profil">Compte</div>
          <div>
          <nav className="nav">
            <div className="osteopathie">
              <NavLink to={'/osteopathie'}>Ostéopathie </NavLink>
            </div>
            <div className="pilates">
              <Link to={'/pilates'} className="pilates">Pilates</Link>
            </div>
          </nav>
          <Switch>
              <Route exact path='/ORENDEZVOUS/projet-rdv-osteo-pilates/WP/wp'/>
              <Route path='/osteopathie' component={Osteopathie} />
              <Route path='/pilates' component={Pilates} />
          </Switch>
        </div>
          
        </header>
    
        <footer>
          <div className="infos">Infos</div>
        </footer>
      </div>
    )
  }
};

// == Export
export default App;

      
     