import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: '1',
  },
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

const Profil = ({ id,first_name,last_name,meta}) => {
  const classes = useStyles();
  console.log('je suis l\'id du user',id)
  return (

    <Grid className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <h1 style={{ marginBottom: '1rem' }} className="take_date">{first_name} {last_name}</h1>
        </Grid>
        <Grid item xs={6} classe={classes.panel}>
          <ExpansionPanel
            className={classes.panel}
          >
            <ExpansionPanelSummary

              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              content={classes.title}
            >
                Mes informations
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <UserInfo meta={meta}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel
            className={classes.panel}
          >
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

          <ExpansionPanel
            className={classes.panel}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
                Ma carte Pilates
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SessionCard meta={meta}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    </Grid>
  );
};

Profil.propTypes = {
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    nb_seance: PropTypes.number.isRequired,
    phone_number: PropTypes.string.isRequired,
  }),

};

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
    slug: state.user.slug,
    meta: state.user.meta,
    first_name: state.user.first_name, 
    last_name: state.user.last_name,
    
  };
}

export default connect(mapStateToProps)(Profil)
