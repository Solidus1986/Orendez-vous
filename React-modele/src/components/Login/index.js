import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'auto',
    width: '100vw',
  },
  '& label.Mui-focused': {
    color: 'green',
  },
  title: {
    paddingBottom: 25,
    color: 'black',
    textAlign: 'center',
  },
  field: {
    width: '35vw',
    marginLeft: '50px',
    marginRight: '50px',
    paddingBottom: 5,
    marginTop: 20,
  },
  button: {
    margin: '1.5rem',
    border: 'solid 2px black',
  },
};

const Login = ({
  username, password, onValueChange, onSubmit,
}) => {
  const classes = styles;

  const handleOnChange = (e) => {
    onValueChange(e.target.name, e.target.value);
  };


  return (
    <div style={classes.root}>
      <Grid container justify="center">
        <Grid>
          <div>
            <h2 style={classes.title}>SE CONNECTER</h2>
          </div>
          <form onSubmit={onSubmit}>
            <TextField
              style={classes.field}
              placeholder="Username"
              label="Username"
              onChange={handleOnChange}
              defaultValue={username}
              type="text"
              name="username"
              variant="outlined"
              size="small"
            />
            <br />
            <br />
            <TextField
              style={classes.field}
              type="password"
              name="password"
              placeholder="Mot de passe"
              label="Mot de passe"
              onChange={handleOnChange}
              defaultValue={password}
              variant="outlined"
              size="small"
            />
            <br />
            <Button
              type="submit"
              variant="outlined"
              style={classes.button}
            >CONNEXION
            </Button>
          </form>
        </Grid>
      </Grid>
      <div>
        <h2 style={{ fontSize: '.8rem', textDecoration: 'underline' }}><Link to="/inscription">Inscrivez-vous</Link> </h2>

      </div>
    </div>
  );
};
Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
