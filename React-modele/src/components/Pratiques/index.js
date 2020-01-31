import React from 'react';

import Pratique from 'src/components/Pratiques/pratique';


const styles = {
  title: {
    paddingBottom: 25,
    color: 'black',
    textAlign: 'justify',
    textTranform: 'uppercase',
  },
  button: {
    margin: '1.5rem',
    border: 'solid 2px black',
  },
};

const  Pratiques = (osteo) => {
    const classes = styles;
    return (
        <div>
          <Pratique 
            classes={classes}
          />
        </div>
    );
  
};

export default Pratiques;

