import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';


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
    margin: '1rem 0rem',
  },
  button: {
    marginTop: '1.4rem',
    padding: '.5rem 1rem',
    border: 'solid 2px black',
  },
  text: {
    margin: '1.4rem',
    textAlign: 'justify',
  },

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
    const { peoples } = this.state;
    return (
      <Grid container className={classes.root}>
        <Grid>
          <Grid xs={12}>
            <h1 style={{ marginBottom: '1rem' }}>OSTEOPATHIE</h1>
          </Grid>
          <Grid container justify="center">
            <Grid xs={10}>
              <Public peoples={peoples} />
            </Grid>
            <Grid container justify="center">
              <Grid xs={3}>
                <Link to="/praticiens">
                  <Button
                    style={classes.button}
                    variant="outline"
                  >
                Praticiens
                  </Button>
                </Link>
              </Grid>
              <Grid xs={3}>
                <Link to="/reservation">
                  <Button
                    variant="outline"
                    style={classes.button}
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

export default Osteopathie;
