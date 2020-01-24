// == Import : npm
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Import composants
import Header from 'src/components/Header';
import Nav from 'src/components/Nav';
import Footer from 'src/components/Footer';

// == Import : local
import './app.scss';
import usersData from 'src/Data/users';
import Pratiques from '../Pratiques';
import Praticiens from '../Praticiens';
import Infos from '../Infos';
import Profil from '../Profil';
import Form from '../Form';
// Data


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
          </Route>
          <Route path="/connexion">
            <Form />
          </Route>
          <Route path="/profil">
            <Profil data={usersData} />
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
        <Footer />
      </div>
    );
  }
}

// == Export
export default App;
