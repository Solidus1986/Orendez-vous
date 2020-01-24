import React, { Component } from 'react';
// import Dialog from '@material-ui/core/Dialog';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    flexGrow: 1,
  },
  field: {
    width: '150%',   
    marginLeft: '50px',
    marginRight: '200px',            
    paddingBottom: 12,
    marginTop: 20,
    fontWeight: 500,
  }
}


class UserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();

  }
  render() { 
    const { values, handleChange } = this.props
    const classes = styles
    return ( 
      <div className={classes.root}> 
        <Grid container spacing={3}>
          <Grid item xs={12}></Grid>
            <h2 className="userdetails-title">Créer un Compte</h2>
            <h1 className="userdetails-subtilte">Saississez vos informations</h1>
          </Grid>
          <Grid item xs={12}>
            <TextField 
              style={classes.field}
              placeholder ="Prénom"
              label="Prénom"
              onChange={handleChange('firstName')}
              defaultValue={values.firstName}
              variant="outlined"
              size={classes.field}
            />
            <br/>
            <TextField 
              style={classes.field}
              placeholder ="Nom"
              label="Nom"
              onChange={handleChange('lastName')}
              defaultValue={values.lastName}
              variant="outlined"
              size="small"
            />
            <br/>
            <TextField 
              style={classes.field}
              placeholder="Téléphone"
              label="Téléphone"
              onChange={handleChange('phone')}
              defaultValue={values.phone}
              variant="outlined"
              size="small"
            />
            <br/>
            <TextField 
              style={classes.field}
              placeholder="Téléphone"
              label="Téléphone"
              onChange={handleChange('phone')}
              defaultValue={values.phone}
              variant="outlined"
              size="small"
            />
            <br/>
            <TextField 
              style={classes.field}
              placeholder ="Confirmez email"
              label="Confirmez email"
              onChange={handleChange('emailConfirm')}
              defaultValue={values.emailConfirm}
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
            </Grid>
          </div>
     );
  }
}
 
export default UserDetails;
