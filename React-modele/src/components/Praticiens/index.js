import React from 'react';
import { Link } from 'react-router-dom';

// import material Ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  panel: {
    margin: '1rem 1rem',
  },
  card: {
    display: 'flex',
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
    padding: theme.spacing(3),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  button: {
    border: 'solid black 2px',
  },
}));

import Praticien from './singlePraticien';


const Praticiens = () => {

  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <h1 style={{ textTransform: 'uppercase', marginBottom: '1rem' }}>Les praticiens</h1>
        </Grid>
        <Grid className={classes.panel}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cover}
              image="src/Images/avatar1.jpg"
              title="Laure Sautier"
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Laure Sautier
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Osteopathe
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <Praticien />
              </div>
            </div>
          </Card>
        </Grid>
        <Grid className={classes.panel}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cover}
              image="src/Images/avatar2.jpg"
              title="Dalai Lama"
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Dalai Lama
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Coach Pilates
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <Praticien />
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Praticiens;
