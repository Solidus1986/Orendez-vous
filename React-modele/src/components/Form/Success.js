import React, { Component } from 'react';

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
    return (
        <>
            <h1>Merci pour votre inscription</h1>
            <p>Vous allez revevoir un mail de conformation avec quelques instructions à suivre</p>
        </>
    );
  }
}

export default Success;
