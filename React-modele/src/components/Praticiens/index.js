import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: '1',
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
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  contained: {
    float: 'right',
  },
}));


const Praticiens = () => {

  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <h1 style={{ marginBottom: '1rem' }}>Les praticiens</h1>
        </Grid>
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
              <Link to={'/osteopathie/praticiens/praticien'}>
                <Button variant="contained" color="primary">
                  En savoir +
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Praticiens;
