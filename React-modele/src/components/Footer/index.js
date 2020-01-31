import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const styles = {
  footer:{
    backgroundColor: "#F8F8F8",
    borderTop: "2px solid black",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "50px",
    width: "100%",
    'z-index':'3'
  }
}


const Footer = () => {
  const classes = styles
  return(
    <div style={classes.footer}>
      <Link to="/infos" >Infos</Link>
    </div>

  )
};

export default Footer;
