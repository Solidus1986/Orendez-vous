// == Import : npm
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

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
import Reservation from '../Reservation';
import Praticien from '../Praticiens/singlePraticien';


// Data
import usersData from 'src/Data/users';
import pratiqueData from 'src/Data/pratiques';
import infosData from 'src/Data/infos';

// const WP_URL ='http://ec2-54-243-1-38.compute-1.amazonaws.com/projet-orendez-vous/WP/wp-json';

const styles = {
  root: {
    flexGrow: 1,   
    height:"100vh"
  },
};

// == Composant
class App extends React.Component {
  // state = {}

  // componentDidMount() {
  //   axios.get(`${WP_URL}`)
  //     .then(res => {
  //       const persons = res.data;
  //       this.setState({ persons });
  //     })
  // }


  render() {
    const classes = styles.root;
    return (
      <div id="app" className={classes}>
        <Grid container id='carton' spacing={2}>
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
                <Infos infos={infosData}/>
              </Route>
            </Switch>
          </Grid>
          <Grid item xs={12}>
            <Footer  />
          </Grid>
        </Grid>
      </div>
    );
  }
}

// == Export
export default App;
