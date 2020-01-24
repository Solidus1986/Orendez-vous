
import React from 'react';
import UserDetails from './UserDetails';
import Confirm from './Comfirm';
import Success from './Success'


class Form extends React.Component {
  state = { 
    step: 1,
    firstName: '',
    lastName:'',
    phone:'',
    email:'',
    emailConfirm:'',
    password:'',
    confirmPassword:'',
   }
  
   // Proceed to next step
   nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = input => e => {
    this.setState({
      [input]:e.target.value,
    })
  }
  

  render() { 
    const { step } = this.state;
    const { 
    firstName,
    lastName,
    phone,
    email,
    emailConfirm,
    password,
    confirmPassword,
    } = this.state;
    const values = {
    firstName,
    lastName,
    phone,
    email,
    emailConfirm,
    password,
    confirmPassword,
    }

    switch(step){
      case 1:
        return (
          <UserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
           />
        )
      case 2 :
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        )
        case 3:
          return <Success />;
      }
    }
  }
 
export default Form;