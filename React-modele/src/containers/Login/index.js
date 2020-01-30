import { connect } from 'react-redux';

import Login from 'src/components/Login';

import { changeInput, connectUser } from 'src/store/reducer/login';

// eslint-disable-next-line arrow-body-style
const mapStateToProps = (state) => {
  return {
    inputValue: state.login.inputValue,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onValueChange: (value) => {
    const action = changeInput(value);
    dispatch(action);
  },
  onSubmit: () => {
    const action = connectUser();
    dispatch(action);
  },
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default LoginContainer;
