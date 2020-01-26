import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: {  
        firstName,
        lastName,
        phone,
        email,
      }, classes
    } = this.props;
    return (
      <div style={classes.root}> 
        <Grid container justify = "center">
          <Grid>
          <List>
            <ListItem>
              <ListItemText primary="Prénom :" secondary={firstName} /> 
            </ListItem>
            <ListItem>
              <ListItemText primary="Nom :" secondary={lastName} /> 
            </ListItem>
            <ListItem>
              <ListItemText primary="Téléphone :" secondary={phone} /> 
            </ListItem>
            <ListItem>
              <ListItemText primary="adresse email :" secondary={email} /> 
            </ListItem>
          </List>
          <br />
        
          <Button
            variant='outline'
            style={classes.button}
            onClick={this.back}
          >Back</Button>

          <Button
            variant='outline'
            style={classes.button}
            onClick={this.continue}
          >Confirm</Button>
        </Grid>
      </Grid>
    </div>
 
    );
  }
}

export default Confirm;
