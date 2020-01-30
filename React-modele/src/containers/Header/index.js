import { connect } from 'react-redux';

import Header from 'src/components/Header';

// eslint-disable-next-line arrow-body-style
const mapStateToProps = (state) => {
  // console.log(state);

  // en combinant les reducers on a un niveau supplémentaire "state.user"
  return {
    logged: state.user.logged,
  };
};

const mapDispatchToProps = {};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default HeaderContainer;
