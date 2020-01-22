// == Import : npm
import React from 'react';
import { Route, Link, Switch, NavLink} from 'react-router-dom';



// Import composants
import Header from 'src/components/Header';
import Nav from 'src/components/Nav';
import Footer from 'src/components/Footer';



// == Import : local
import './app.scss';
import Osteopathie from '../Page/Osteopathie';
import Pilates from '../Page/Pilates';
import Praticiens from '../Praticiens';

// == Composant
class App extends React.Component {
  state={
    isEmptyState: true 
  }

  render () {
    return(
      <div id="app">
          <Switch>
                <Route exact path='/'>
                  <Header />
                  <Nav />
                  <Footer />  
                </Route>
                <Route exact path='/osteopathie'>
                  <Osteopathie />
                </Route>
                <Route exact path='/pilates'>
                  <Pilates />
                </Route>
                <Route path='/osteopathie/praticiens'>
                  <Praticiens />
                </Route>

          </Switch>
        
      </div>
    )
  }
}

// == Export
export default App;

      
     