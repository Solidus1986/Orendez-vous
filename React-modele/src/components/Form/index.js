
import React from 'react';
import UserDetails from './UserDetails';
import Confirm from './Confirm';
import Success from './Success';


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

class Form extends React.Component {
  state = { 
    step: 1,
    firstName: '',
    lastName:'',
    userName:'',
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

  handleChange = TextField => e => {
    this.setState({
      [TextField]:e.target.value,
    })
  }
  

  render() { 
    const classes = styles;
    const { step } = this.state;
    const { 
    firstName,
    lastName,
    userName,
    phone,
    email,
    emailConfirm,
    password,
    confirmPassword,
    } = this.state;
    const values = {
    firstName,
    lastName,
    userName,
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
              classes={classes}
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              values={values}
            />
        )
      case 2 :
        return (
          
            <Confirm
              classes={classes}
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              values={values}
            />
        )
        case 3:
          return (
            <Success
              classes={classes}
          />);

            
          
      }
    }
  }
 
export default Form;
