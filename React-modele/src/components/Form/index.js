import React, { Component } from 'react';

import './form.scss';


class Form extends Component {
  state = {
    fullName: '',
    LastName:'',
    phone:'',
    email:'',
    emailConfirm:'',
    password:'',
    confirmPassword:'',
  };

  handleSubmitForm(event) {
    alert('Full Name: ' + this.state.fullName);
    event.preventDefault();
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({
      fullName: value,
      LastName: value,
      phone: value,
      email: value,
      emailConfirm: value,
      password: value,
      confirmPassword: value,

    });
  }

  render() {
    const { fullName } = this.state;
    return (
      <form onSubmit={(event) => this.handleSubmitForm(event)}>
        <label>
          <input
            placeholder="Prénom"
            type="text"
            value={fullName}
            onChange={(event) => this.handleChange(event)}
          />
        </label>
        <label>
          <input
            placeholder="Nom"
            type="text"
            value={fullName}
            onChange={(event) => this.handleChange(event)}
          />
        </label>
        <label>
          <input
            placeholder="Téléphone"
            type="text"
            value={fullName}
            onChange={(event) => this.handleChange(event)}
          />
        </label>
        <label>
          <input
            placeholder="Votre adresse email"
            type="text"
            value={fullName}
            onChange={(event) => this.handleChange(event)}
          />
        </label>
        <label>
          <input
            placeholder="Confirmez votre adresse email"
            type="text"
            value={fullName}
            onChange={(event) => this.handleChange(event)}
          />
        </label>
        <label>
          <input
            placeholder="Choississez votre mot de passe"
            type="text"
            value={fullName}
            onChange={(event) => this.handleChange(event)}
          />
        </label>
        <label>
          <input
            placeholder="Confirmez votre mot de passe"
            type="text"
            value={fullName}
            onChange={(event) => this.handleChange(event)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;
