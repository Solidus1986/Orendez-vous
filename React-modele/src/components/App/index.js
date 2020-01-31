// == Import : npm
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import store from 'src/store';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { userData } from 'src/store/reducer/login';


// Import composants
import Header from 'src/containers/Header';
import Nav from 'src/components/Nav';
import Footer from 'src/components/Footer';

// == Import : local
import './app.scss';
import Login from 'src/containers/Login';

import pratiqueData from 'src/Data/pratiques';
import Pratiques from '../Pratiques';
import Praticiens from '../Praticiens';
import Infos from '../Infos';
import Profil from '../Profil';
import Form from '../Form';
import Reservation from '../Reservation';
import Praticien from '../Praticiens/singlePraticien';

// Data
// import usersData from 'src/Data/users';
// import infosData from 'src/Data/infos';

// const WP_URL ='http://ec2-54-243-1-38.compute-1.amazonaws.com/projet-orendez-vous/WP/wp-json';

const styles = {
  root: {
    flexGrow: 1,
    height: '100vh',
  },
};

// == Composant
class App extends React.Component {
  state = {}

  componentDidMount() {
    // Vérifier que j'ai un token dans le local storage

    // => code
    const log = localStorage.getItem('token');

    console.log('Token, mon token, es-tu la?', log);

    // Si j'ai un token, appeler l'action refresh du middleware pour récupérer mes informations
    if (log) {
      store.dispatch(userData());
    }
    // => code
  }

  render() {
    const classes = styles.root;
    return (
      <div id="app" className={classes}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <Switch>
              <Route exact path="/">
                <Nav data={pratiqueData} />
              </Route>
              <Route exact path="/inscription">
                <Form />
              </Route>
              <Route exact path="/connexion">
                <Login />
              </Route>
              <Route exact path="/profil">
                <Profil data={userData} />
                {console.log('je suis le userData', userData)};
              </Route>
              <Route exact path="/pratiques">
                <Pratiques data={pratiqueData} />
              </Route>
              <Route exact path="/pratiques/reservation">
                <Reservation />
              </Route>
              <Route exact path="/praticiens">
                <Praticiens />
              </Route>
              <Route exact path="/praticiens/praticien">
                <Praticien />
              </Route>
              <Route exact path="/infos">
                <Infos />
              </Route>
            </Switch>
          </Grid>
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </div>
    );
  }
}

// == Export
export default App;
