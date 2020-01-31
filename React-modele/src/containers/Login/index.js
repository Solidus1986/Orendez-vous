import { connect } from 'react-redux';

import Login from 'src/components/Login';

import { changeInput, connectUser } from 'src/store/reducer/login';

// eslint-disable-next-line arrow-body-style
const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    password: state.login.password,

  };
};

const mapDispatchToProps = (dispatch) => ({
  onValueChange: (inputName, value) => {
    const action = changeInput(inputName, value);
    dispatch(action);
  },
  onSubmit: (e) => {
    e.preventDefault();
    const action = connectUser();
    dispatch(action);
    // window.location.assign('/profil');
  },
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default LoginContainer;
