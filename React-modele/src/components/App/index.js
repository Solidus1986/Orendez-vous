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

// == Composant
class App extends React.Component {
  state={}

  render() {
    return (
      <div id="app">
        <Switch>
          <Route exact path="/">
            <Header />
            <Nav />
            <Footer />
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
