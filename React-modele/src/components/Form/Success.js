import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';


class Success extends Component {
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
    const {classes} = this.props
    return (
      <div style={classes.root}> 
        <Grid container justify = "center">
          <Grid>
            <div style={{border:'solid 2px black',borderRadius:'5px',padding:'1.5rem'}}>
              <h1>Merci pour votre inscription</h1>
              <br/>
              <p>Vous allez revevoir un mail de conformation avec quelques instructions à suivre</p>
            </div>
          </Grid>
        </Grid>
      </div>
        

    );
  }
}

export default Success;
