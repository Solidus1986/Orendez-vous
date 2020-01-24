import React, { Component } from 'react';
// import Dialog from '@material-ui/core/Dialog';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
  button:{
    margin: 5
  },
  textField:{
    padding: "15rem",
    backgroundColor: 'blue',
  }
}

class UserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();

  }
  render() { 
    const { values, handleChange } = this.props
    return ( 

      <MuiThemeProvider>
        <>
          <h2 className="userdetails-title">Créer un Compte</h2>
          <h1 className="userdetails-subtilte">Saississez vos informations</h1>
          <TextField 
            // inputStyle={styles.textFiled}
            placeholder ="Prénom"
            label="Prénom"
            onChange={handleChange('firstName')}
            defaultValue={values.firstName}
            variant="outlined"
            size="small"
          />
          <br/>
          <TextField 
            placeholder ="Nom"
            label="Nom"
            onChange={handleChange('lastName')}
            defaultValue={values.lastName}
            variant="outlined"
            size="small"
          />
          <br/>
          <TextField 
            placeholder="Téléphone"
            label="Téléphone"
            onChange={handleChange('phone')}
            defaultValue={values.phone}
            variant="outlined"
            size="small"
          />
          <br/>
          <TextField 
            placeholder ="Votre adresse email"
            label="Votre adresse email"
            onChange={handleChange('email')}
            defaultValue={values.email}
            variant="outlined"
            size="small"
          />
          <br/>
          <TextField 
            placeholder ="Confirmez email"
            label="Confirmez email"
            onChange={handleChange('emailConfirm')}
            defaultValue={values.emailConfirm}
            variant="outlined"
            size="small"
          />
          <br/>
          <TextField 
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
            type="password"
            placeholder ="Confirmez mot de passe"
            label="Confirmez mot de passe"
            onChange={handleChange('confirmPassword')}
            defaultValue={values.confirmPassword}
            variant="outlined"
            size="small"
          />
          <br/>
          <br />
            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
              style={styles.button}
            >Continue</Button>
        </>
      </MuiThemeProvider>
     );
  }
}
 
export default UserDetails;
