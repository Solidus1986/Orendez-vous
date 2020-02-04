import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


class UserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();

  }
  render() { 
    const { classes, values, handleChange } = this.props
    return ( 
      <div style={classes.root}> 
        <Grid container justify = "center">
          <Grid>
            <div>
              <h2 style={classes.title}>Créer un Compte</h2>
              <h1 style={classes.title}>Saississez vos informations</h1>
            </div>
            <TextField 
              style={classes.field}
              placeholder ="Prénom"
              label="Prénom"
              onChange={handleChange('firstname')}
              defaultValue={values.firstname}
              variant="outlined"
              size='small'
            />
            <br/>
            <TextField 
              style={classes.field}
              placeholder ="Nom"
              label="Nom"
              onChange={handleChange('lastname')}
              defaultValue={values.lastname}
              variant="outlined"
              size="small"
            />
            <br/>
            <TextField 
              style={classes.field}
              placeholder ="Pseudo"
              label="Pseudo"
              onChange={handleChange('username')}
              defaultValue={values.username}
              variant="outlined"
              size="small"
            />
            <br/>
            <TextField 
              style={classes.field}
              placeholder="Téléphone"
              label="Téléphone"
              onChange={handleChange('phone_number')}
              defaultValue={values.phone_number}
              variant="outlined"
              size="small"
            />
            <br/>
            <TextField 
              style={classes.field}
              placeholder="Adresse email"
              label="Adresse email"
              onChange={handleChange('email')}
              defaultValue={values.email}
              variant="outlined"
              size="small"
            />
            <br/>
            <TextField 
              style={classes.field}
              placeholder ="Confirmez email"
              label="Confirmez email"
              onChange={handleChange('email_validation')}
              defaultValue={values.email_validation}
              variant="outlined"
              size="small"
            />
            <br/>
            <TextField 
              style={classes.field}
              type="password"
              placeholder ="Mot de passe"
              label="Mot de passe"
              onChange={handleChange('password')}
              defaultValue={values.password}
              variant="outlined"
              size="small"
            />
            <br/>
            <TextField 
              style={classes.field}
              type="password"
              placeholder="Confirmez mot de passe"
              label="Confirmez mot de passe"
              onChange={handleChange('password_validation')}
              defaultValue={values.password_validation}
              variant="outlined"
              size="small"
            />
            <br/>
            <br />
              <Button
                variant="outlined"
                onClick={this.continue}
                style={classes.button}
              >Continue</Button>
            </Grid>
          </Grid>
          </div>
     );
  }
}
 
export default UserDetails;
