import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';

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
      }
    } = this.props;
    return (
        <>
          <List>
            <ListItem>
              <ListItemText primary="Prénom" secondary={firstName} /> 
            </ListItem>
            <ListItem>
              <ListItemText primary="Nom" secondary={lastName} /> 
            </ListItem>
            <ListItem>
              <ListItemText primary="Téléphone" secondary={phone} /> 
            </ListItem>
            <ListItem>
              <ListItemText primary="adresse email" secondary={email} /> 
            </ListItem>
          </List>
          <br />
        
          <Button
            color="secondary"
            variant="contained"
            onClick={this.back}
          >Back</Button>

          <Button
            color="primary"
            variant="contained"
            onClick={this.continue}
          >Confirm</Button>
        </>
    );
  }
}

export default Confirm;
