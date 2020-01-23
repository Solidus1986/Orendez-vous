import React from 'react';
import { Link } from 'react-router-dom';


import './footer.scss';

const Footer = () => (
  <div>
    <Link to="/infos" className="btn-infos-osteo">Infos</Link>
  </div>
);

export default Footer;
