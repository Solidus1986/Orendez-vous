// == Import : npm
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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
import Reservation from '../Reservation';
// Data

const styles = {
  root: {
    flexGrow: 1,
  },
};

// == Composant
class App extends React.Component {
  state={}

  render() {
    const classes = styles.root;
    return (
      <div id="app" className={classes}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Header />
          </Grid>
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
            <Route exact path="/pratiques1">
              <Pratiques />
            </Route>
            <Route exact path="/pratiques/reservation">
              <Reservation />
            </Route>
            <Route exact path="/pratiques2">
              <Pratiques />
            </Route>
            <Route path="/praticiens">
              <Praticiens />
            </Route>
            <Route path="/infos">
              <Infos />
            </Route>
          </Switch>
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
