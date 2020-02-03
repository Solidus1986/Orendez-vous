import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';


import Public from './public';


const WP_URL = 'http://ec2-54-243-1-38.compute-1.amazonaws.com/wordpress/wp-json/wp/v2/';
const PILATES_URL = 'pilates?category-pilates=7';



const styles = {
  title: {
    paddingBottom: 25,
    color: 'black',
    textAlign: 'justify',
    textTranform: 'uppercase',
  },

  root: {
    flexGrow: 1,
    margin: '1rem 0rem',
  },
  button: {
    borderRadius: 3,
    border: 1,
    color: 'black',
    padding: '.5rem 1.4rem',
    margin: '.5rem',
    boxShadow: '0 1px 2px 1px rgb(196, 196, 196)',
  },
  text: {
    margin: '1.4rem',
    textAlign: 'justify',
  },

};

class Pilates extends React.Component {
  state = {
    pilates: [],
  }

  componentDidMount() {
    axios.get(`${WP_URL}${PILATES_URL}`)
      .then((res) => {
        const pilates = res.data;
        this.setState({ pilates });
        console.log('axios-pilates', res.data);
      });
  }

  render() {
    const classes = styles;
    const { pilates } = this.state;
    return (
      <Grid>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <h1 style={{ marginBottom: '1rem' }}>PILATES</h1>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={10}>
              <Public pilates={pilates} />
            </Grid>
            <Grid container justify='center'>
              <Grid item xs={3}>
                <Link to="/praticiens">
                  <Button
                    style={{ marginTop: '1.5rem', padding: '.5rem 1rem', border: 'solid 2px black' }}
                    variant="outline"
                  >
                Praticiens
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link to="/reservation">
                  <Button
                    variant="outline"
                    style={{ marginTop: '1.4rem', padding: '.5rem 1rem', border: 'solid 2px black' }}
                  >
                 Rendez vous
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    );
  }
}

export default Pilates;
