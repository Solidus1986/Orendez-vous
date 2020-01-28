import React from 'react';
import axios from 'axios';

// import material Ui

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Praticien from './singlePraticien';

const WP_URL = 'http://ec2-54-243-1-38.compute-1.amazonaws.com/projet-orendez-vous/WP/wp-json/wp/v2/';
const Osteopathes = 'osteopathie?category-osteo=4';
const Pilates = 'pilates?category-pilates=13';

const styles = {
  root: {
    flexGrow: 1,
  },
  panel: {
    margin: '1rem 1rem',
  },
  card: {
    display: 'flex',
    margin: '2rem',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    filter: 'grayscale(100%)',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    padding: '2rem'
  },
  playIcon: {
    height: 38,
    width: 38,
  },
};

class Praticiens extends React.Component {
  state = {
    osteopathes: [],
    pilates:[]
  }
  

  componentDidMount() {
    axios.get(`${WP_URL}${Osteopathes}`)
      .then(res => {
        const osteopathes = res.data;
        this.setState({ osteopathes });
        console.log('axios-osteo', res.data);
      })
      axios.get(`${WP_URL}${Pilates}`)
      .then(res => {
        const pilates = res.data;
        this.setState({ pilates });
        console.log('axios-pilates', res.data);
      })

  }


  render() {
    const classes = styles;
    const { osteopathes, pilates } = this.state;
    return (
      <Grid container style={classes.root}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <h1 style={{ textTransform: 'uppercase', marginBottom: '1rem' }}>Les praticiens</h1>
          </Grid>
          <Grid style={classes.panel}>
            {osteopathes.map((osteo=>(
                <Card key={osteo.id} style={classes.card}>
                  <CardMedia
                    style={classes.cover}
                    image="src/Images/avatar1.jpg"
                    title={osteo.title.rendered}
                  />
                  <div style={classes.details}>
                    <CardContent style={classes.content}>
                      <Typography component="h5" variant="h5">
                        {osteo.title.rendered}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {osteo.type}
                      </Typography>
                    </CardContent>
                    <div style={classes.controls}>
                      <Praticien key={osteo.id} {...osteo}/>
                    </div>
                  </div>
                </Card>
            )))}
          </Grid>
          <Grid style={classes.panel}>
            {pilates.map((pilate=>(
                <Card key={pilate.id} style={classes.card}>
                  <CardMedia
                    style={classes.cover}
                    image="src/Images/avatar1.jpg"
                    title={pilate.title.rendered}
                  />
                  <div style={classes.details}>
                    <CardContent style={classes.content}>
                      <Typography component="h5" variant="h5">
                        {pilate.title.rendered}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {pilate.type}
                      </Typography>
                    </CardContent>
                    <div style={classes.controls}>
                      <Praticien key={pilate.id} {...pilate}/>
                    </div>
                  </div>
                </Card>
            )))}
          </Grid>
        </Grid>
      </Grid>
    );
    }
};

export default Praticiens;
