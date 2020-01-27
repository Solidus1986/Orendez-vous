import React from 'react';
import PropTypes from 'prop-types';


import './profil.scss';

// import Materail Ui
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

// Import component
import UserInfo from './UserInfo';
import Dates from './Dates';
import SessionCard from './SessionCard';

import './profil.scss';

const useStyles = makeStyles(theme => ({
  panel: {
    margin: '1rem 1rem',
  },
  root: {
    padding: theme.spacing(2, 2),
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
  },
}));

const Profil = () => {

  const classes = useStyles();

  return (

    <Grid className={classes.root} container justify="center" item xs={12}>
      <Grid classe={classes.panel}>
      <ExpansionPanel>
          <ExpansionPanelSummary 
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            content={classes.title}
          >
            Mes informations
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <UserInfo />
          </ExpansionPanelDetails>
      </ExpansionPanel>
      </Grid>
      <Grid classe={classes.panel}>
      <ExpansionPanel>
          <ExpansionPanelSummary 
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Mes Rendez-vous
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Dates />
          </ExpansionPanelDetails>
      </ExpansionPanel>
      </Grid>
      <Grid classe={classes.panel}>
      <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />} 
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Ma carte Pilates
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <SessionCard />
          </ExpansionPanelDetails>
      </ExpansionPanel>
      </Grid>
    </Grid>
  );

Profil.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      firstname: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
};

export default Profil;
