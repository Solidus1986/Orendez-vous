import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import './nav.scss';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin:'7rem 0rem',
  },
  pratique:{
    height: '100%',
    width: '100%',
    margin:'1.4rem',
    textTransform: 'uppercase',
    fontSize: '2.4rem',
    borderRadius: '50%',
    backgroundColor:'white',
    border: 'solid 2px black',
    padding: '8rem',
    '@media screen and (min-width: 600px) and (max-width: 1200px)': {
      fontSize: '1.7rem',
      borderRadius: '50%',
      padding: '9rem', 
  }}
}));

const Nav = (props) => {
  const classes = useStyles();
  const { data } = props
  console.log("data:",data);

  return (
      <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {data.map(p => (
            <Grid key={p.id}>
              <Link to="/pratiques" className={classes.pratique}>{p.pratique}</Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Nav;
