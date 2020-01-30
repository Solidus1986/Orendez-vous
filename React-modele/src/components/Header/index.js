import React from 'react';

import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { isLoggedIn } from "../functions";
import Button from '@material-ui/core/Button';

import './header.scss';
import logo from 'src/Images/logo.png';


const Header = () => {


  const handleLogout = () => {
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'userName' );
    window.location.assign("/connexion");
  };
  return (
  <header className="header">
    <Link to="/" className="logo"><Image src={logo} size="big" circular /></Link>
    { isLoggedIn() ? (
            <>
              <div>
								<Link to="/profil" className="profil">Profil</Link>
                <Button onClick={handleLogout} className="btn-header" >Logout</Button>
              </div>
						</>
					) : (
							<Link to="/connexion" className="profil">connexion</Link>
					) }
  </header>
  )
};  

export default Header;
