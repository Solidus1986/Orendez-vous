import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import './praticien.scss';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

const singlePraticien = () => {

    const classes = useStyles();

    return (
    <div className={classes.root}>
        <Avatar alt="Laure Sautier" src="src/Images/avatar1.jpg" className={classes.large} />
        <h2>Laure Sautier</h2>
        <p>je suis un praticien</p>
    </div>
    )
};

export default singlePraticien;