import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import './nav.scss';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Nav = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
       <Grid container spacing={3}>
        <Grid item xs={6}>
          <Link className={classes.paper} to="/pratiques1" id="pratiques">Ostéopathie</Link>
        </Grid>
        <Grid item xs={6}>
        <Link className={classes.paper} to="/pratiques2" id="pratiques">Pilates</Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Nav;
