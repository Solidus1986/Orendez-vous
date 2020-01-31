import { connect } from 'react-redux';

import Profil from 'src/components/Profil';

// eslint-disable-next-line arrow-body-style
const mapStateToProps = (state) => {
  return {
    user_nicename: state.user_nicename,
  };
};

const mapDispatchToProps = {};

const ProfilContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profil);

export default ProfilContainer;