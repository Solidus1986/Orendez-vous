import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  footer:{
    backgroundColor: "#F8F8F8",
    borderTop: "2px solid black",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "50px",
    width: "100%",
    'z-index':'2000'
  }
}

import './footer.scss';

const Footer = () => {
  const classes = styles
  return(
    <div style={classes.footer}>
      <Link to="/infos" >Infos</Link>
    </div>

  )
};

export default Footer;
