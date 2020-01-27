import React from 'react';

import Pratique from 'src/components/Pratiques/pratique';

import './pratiques.scss';

const styles = {
  title:{
    paddingBottom: 25,
    color: 'black',
    textAlign:'center'
  },
  button:{
    margin:'1.5rem',
    border:'solid 2px black'
  }
}

class Pratiques extends React.Component {

  render () {
    const classes = styles;
    return (
        <div>
          <Pratique 
            classes={classes}
          />
        </div>
    );
  }
};

export default Pratiques;

