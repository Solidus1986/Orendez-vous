// == Import : npm
import React from 'react';
import { Route, Link, Switch, NavLink} from 'react-router-dom';



// Import composants
import Header from 'src/components/Header';
import Nav from 'src/components/Nav';
import Footer from 'src/components/Footer';



// == Import : local
import './app.scss';

// == Composant
class App extends React.Component {
  state={
    currentView: [],
  }

  render () {
    return(
      <div id="app">
          <Header />
          <Nav />
          <Footer />
        
      </div>
    )
  }
};

// == Export
export default App;

      
     