import { connect } from 'react-redux';

import Reservation from 'src/components/Reservation';

// eslint-disable-next-line arrow-body-style
const mapStateToProps = (state) => {
  return {
    logged: state.user.logged,
    
  };
};

const mapDispatchToProps = {
  
};

const ReservationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reservation);

export default ReservationContainer;
