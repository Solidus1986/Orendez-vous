import React from 'react'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
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
  title:{
    paddingBottom: 25,
    color: 'black',
    textAlign:'center'
  },
  field: {
    width:'35vw',
    marginLeft: '50px',
    marginRight: '50px',            
    paddingBottom: 5,
    marginTop: 20,
  },
  button:{
    margin:'1.5rem',
    border:'solid 2px black'
  }
}

class Login extends React.Component {
  state = {
			username: '',
      password: '',
      userNiceName: '',
			userEmail: '',
			loggedIn: false,
			loading: false,
			error: ''
		}
	

	createMarkup = ( data ) => ({
		__html: data
	});

	onFormSubmit = ( event ) => {
		event.preventDefault();

		const siteUrl = 'http://ec2-54-243-1-38.compute-1.amazonaws.com/projet-orendez-vous/WP';

		const loginData = {
			username: this.state.username,
			password: this.state.password,
		};

		this.setState( { loading: true }, () => {
			axios.post( `${siteUrl}/wp-json/jwt-auth/v1/token`, loginData )
				.then( res => {
          // console.log('tokentome:',res.data);
					if ( undefined === res.data.token ) {
						this.setState( { error: res.data.message, loading: false } );
						return;
					}

					const { token, user_nicename, user_email } = res.data;

					localStorage.setItem( 'token', token );
					localStorage.setItem( 'userName', user_nicename );

					this.setState( {
						loading: false,
            token: token,
            userNiceName: user_nicename,
						userEmail: user_email,
						loggedIn: true
					} )
				} )
				.catch( err => {
          // console.log('error',err);
					this.setState( { error: err.response.data.message, loading: false } );
				} )
		} )
	};

	handleOnChange =  TextField => e => {
		this.setState( { [TextField]: e.target.value } );
	};

    render() { 
      const classes = styles;
      const { username, password, userNiceName, loggedIn, error, loading } = this.state;

      const user = ( userNiceName ) ? userNiceName : localStorage.getItem( 'userName' );

      

      if ( loggedIn || localStorage.getItem( 'token' ) ) {
        return ( <Redirect to={`/profil/${user}`} noThrow /> )
    } else {
      

      return ( 
        <div style={classes.root}> 
          { error && <div dangerouslySetInnerHTML={ this.createMarkup( error ) }/> }
          <Grid container justify = "center">              
            <Grid >
              <div>
                <h2 style={classes.title}>SE CONNECTER</h2>
              </div>
              <form onSubmit={ this.onFormSubmit }>
              <TextField 
                style={classes.field}
                placeholder ="Identifiant"
                label="Identifiant"
                onChange={this.handleOnChange('username')}
                value={username}
                type="text"
                variant="outlined"
                size='small'
              />
              <br/>
              <br/>
              <TextField 
                style={classes.field}
                type="password"
                placeholder ="Mot de passe"
                label="Mot de passe"
                onChange={this.handleOnChange('password')}
                value={password}
                variant="outlined"
                size="small"
              />
              <br />
                <Button
                  
                  type="submit" 
                  variant="outlined"
                  style={classes.button}
                >CONNEXION</Button>
                {loading}
                </form>
              </Grid>   
            </Grid>
            <div>
              <h2 style={{fontSize:'.8rem',textDecoration:'underline'}}><Link to="/inscription">Inscrivez-vous</Link> </h2>
               
              </div>
            </div>
       )
    }
    }
};
 
export default Login;
