import { connect } from 'react-redux';

import Profil from 'src/components/Profil';

// eslint-disable-next-line arrow-body-style
const mapStateToProps = (state) => {
  return {
    username: state.name,
  };
};

const mapDispatchToProps = {};

const ProfilContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profil);

export default ProfilContainer;