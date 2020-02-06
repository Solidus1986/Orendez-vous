import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';

import Alert from '@material-ui/lab/Alert';


class Confirm extends Component {
  state={
    snackOpen: false,
  }

  handleClose = (e) => {
    this.setState({ snackOpen: false });
}

  
  onSubmit = (e) => {
    e.preventDefault();
    // PROCESS FORM //
    const { values } = this.props;


    axios.post('http://ec2-54-243-1-38.compute-1.amazonaws.com/wordpress/wp-json/wp/v2/users/register', values, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((result) => {
        console.log(result);
        this.props.nextStep();
      })
      .catch((error) => {
        console.error('c\'est une erreur', error.response.data.message);
        this.setState({ snackOpen: true });
      });
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };


  render() {
    const {
      values: {
        firstname,
        lastname,
        username,
        phone_number,
        email,
        email_validation,
        password,
        password_validation,
      }, classes,
    } = this.props;
    return (
      <div style={classes.root}>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.snackOpen}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="error">
          Verifiez vos informations!
          </Alert>
        </Snackbar>
        <Grid container justify="center">
          <Grid>
            <List>
              <ListItem>
                <ListItemText primary="Prénom :" secondary={firstname} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Nom :" secondary={lastname} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Pseudo :" secondary={username} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Téléphone :" secondary={phone_number} />
              </ListItem>
              <ListItem>
                <ListItemText primary="adresse email :" secondary={email} />
              </ListItem>
            </List>
            <br />

            <Button
              variant="outline"
              style={classes.button}
              onClick={this.back}
            >Back
            </Button>

            <Button
              variant="outline"
              style={classes.button}
              onClick={this.onSubmit}
            >Confirm
            </Button>
          </Grid>
        </Grid>
      </div>

    );
  }
}

export default Confirm;
