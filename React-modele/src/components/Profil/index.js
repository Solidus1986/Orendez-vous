import React from 'react';
import PropTypes from 'prop-types';


import './profil.scss';

// import Materail Ui
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



// Import component
import UserInfo from './UserInfo';
import Dates from './Dates';
import SessionCard from './SessionCard';

import './profil.scss';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 2),
    height: 'auto',
    width: '100%',
  },
  panel: {
    color: 'blue',
    width: '100%',
    margin: '50px',
    textAlign: 'center',
  },
}));

const Profil = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
    <ExpansionPanel classe={classes.panel}>
        <ExpansionPanelSummary 
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Mes informations
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <UserInfo />
        </ExpansionPanelDetails>
    </ExpansionPanel>
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
    </div>
     
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
