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
import pratiqueData from 'src/Data/pratiques';
import Pratiques from '../Pratiques';
import Praticiens from '../Praticiens';
import Infos from '../Infos';
import Profil from '../Profil';
import Form from '../Form';
import Reservation from '../Reservation';
import Praticien from '../Praticiens/singlePraticien';

// Data

const styles = {
  root: {
    flexGrow: 1,
  },
};

// == Composant
class App extends React.Component {
  render() {
    const classes = styles.root;
    return (
      <div id="app" className={classes}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <Switch>
              <Route exact path="/">
                <Nav data={pratiqueData}/>
              </Route>
              <Route path="/connexion">
                <Form />
              </Route>
              <Route path="/profil">
                <Profil data={usersData} />
              </Route>
              <Route exact path="/pratiques">
                <Pratiques data={pratiqueData}/>
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
              <Route path="/infos">
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
