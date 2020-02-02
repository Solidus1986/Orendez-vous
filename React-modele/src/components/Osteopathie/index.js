import React from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import Public from './public';


const WP_URL = 'http://ec2-54-243-1-38.compute-1.amazonaws.com/wordpress/wp-json/wp/v2/';
const OSTEO_URL = 'osteopathie';
const PUBLIC_URL = 'osteopathie?category-osteo=2';


const styles = {
  title: {
    paddingBottom: 25,
    color: 'black',
    textAlign: 'justify',
    textTranform: 'uppercase',
  },
 
    root: {
      flexGrow: 1,
      margin:'1rem 0rem',
    },
    button: {
      borderRadius: 3,
      border: 1,
      color: 'black',
      padding: '.5rem 1.4rem',
      margin:'.5rem',
      boxShadow: '0 1px 2px 1px rgb(196, 196, 196)',
    },
    text:{
      margin:'1.4rem',
      textAlign:'justify', 
  }

};

class Osteopathie extends React.Component {
  state = {
    osteo: [],
    peoples: [],
  }

  componentDidMount() {
    axios.get(`${WP_URL}${OSTEO_URL}`)
      .then((res) => {
        const osteo = res.data;
        this.setState({ osteo });
        console.log('axios-osteo', res.data);
      });
    axios.get(`${WP_URL}${PUBLIC_URL}`)
      .then((res) => {
        const peoples = res.data;
        this.setState({ peoples });
        console.log('axios-public', res.data);
      });
  }

  render() {
    const classes = styles;
    const { osteo, peoples } = this.state;
    return (
      <Grid>
        <Grid container className={classes.root}>
        <Grid item xs={12}>
          <h1 style={{ marginBottom: '1rem' }}>OSTEOPATHIE</h1>
        </Grid>
        <Grid container justify="center">
          
            
            {peoples.map((people) => (
          <Grid item xs={12}>
            <Public key={people.id} {...people} />
            
          </Grid>
         ))}
          <Grid item xs={12}>
            <Link to="/praticiens">
              <Button
                style={{ marginTop: '1.5rem', padding: '.5rem 1rem', border: 'solid 2px black' }}
                variant="outline"
              >
              Praticiens
              </Button>
            </Link>
          </Grid>
          <Grid style={{ margin: '2rem 0rem' }} item xs={6}>
            <p className={classes.text}>
            L’ostéopathie est une thérapie manuelle reconnue en France qui vise à maintenir et
            restituer un bon état de santé à votre corps. Elle ne substitue pas à la médecine
            traditionnelle. Néanmoins, c’est une médecine complémentaire qui entretient,
            et soulage de manière naturelle. Ses fondements sont l’anatomie, la
            biomécanique et la physiologie.
            Elle restitue la meilleure mobilité et intégrité aux différentes parties de votre corps
            afin que chacune d’elle puisse exercer au mieux sa fonction en harmonie (marche, mouvements,
            digestion, respiration..)
            Cette médecine ne cherche pas à soigner les symptômes mais la cause du
            déséquilibre durablement. Pour cela, le patient est considéré dans sa globalité (son corps, son
            psychisme, son environnement, ses habitudes et son hygiène de vie).

            L’ostéopathie est une science, un art et une philosophie – Andrew Taylor Still
            </p>
          </Grid>
          <Grid item xs={12}>
            <Link to="/pratiques/reservation">
              <Button
                variant="outline"
                style={{ marginTop: '1.5rem', padding: '.5rem 1rem', border: 'solid 2px black' }}
              >
               Rendez vous
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      </Grid>

    );
  }
}

export default Osteopathie;
