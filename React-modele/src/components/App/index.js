// == Import : npm
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Import composants
import Header from 'src/components/Header';
import Nav from 'src/components/Nav';
import Footer from 'src/components/Footer';

// == Import : local
import './app.scss';
import Pratiques from '../Pratiques';
import Praticiens from '../Praticiens';
import Infos from '../Infos';
import Profil from '../Profil';
import Form from '../Form';


// == Composant
class App extends React.Component {
  state={}

  render() {
    return (
      <div id="app">
      <Header />
        <Switch>
          <Route exact path="/">
            
            <Nav />
            <Footer />
          </Route>
          <Route path="/connexion">
            <Form />
          </Route>
          <Route path="/profil">
            <Profil />
          </Route>
          <Route exact path="/pratiques">
            <Pratiques />
          </Route>
          <Route path="/praticiens">
            <Praticiens />
          </Route>
          <Route path="/infos">
            <Infos />
          </Route>
        </Switch>
      </div>
    );
  }
}

// == Export
export default App;
