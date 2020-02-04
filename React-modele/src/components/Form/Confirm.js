import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


class Confirm extends Component {
  onSumit = e => {
    e.preventDefault();
    // PROCESS FORM //
    const { values } = this.state;
    

    axios.post('http://ec2-54-243-1-38.compute-1.amazonaws.com/wordpress/wp-json/wp/v2/users/register', { values }, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then((result) => {
        console.log(result)
        alert('Votre inscription est réussi');
         this.props.nextStep();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  

  render() {
    const {
      values: {  
        firstName,
        lastName,
        userName,
        phone,
        email,
        emailConfirm,
        password,
        confirmPassword,
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
              <ListItemText primary="Pseudo :" secondary={userName} /> 
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
            onClick={this.onSubmit}
          >Confirm</Button>
        </Grid>
      </Grid>
    </div>
 
    );
  }
}

export default Confirm;
