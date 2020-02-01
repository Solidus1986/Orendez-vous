import React from 'react';
import axios from 'axios';


import Pratique from 'src/components/Osteopathie/pratique';

const WP_URL = 'http://ec2-54-243-1-38.compute-1.amazonaws.com/projet-orendez-vous/WP/wp-json/wp/v2/';
const OSTEO_URL = 'osteopathie';
const PUBLIC_URL = 'osteopathie?category-osteo=2';


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

class Osteopathie extends React.Component {
  state = {
    osteo: [],
    people: [],
  }
  componentDidMount() {
    axios.get(`${WP_URL}${OSTEO_URL}`)
      .then(res => {
        const osteo = res.data;
        this.setState({ osteo });
        console.log('axios-osteo', res.data);
      })
    axios.get(`${WP_URL}${PUBLIC_URL}`)
    .then(res => {
      const people = res.data;
      this.setState({ people });
      console.log('axios-public', res.data);
    })

  }
  render() {
    const classes = styles;
    const { osteo, people} = this.state
    return (
        <div>
          <Pratique 
            osteo={osteo}
            people={people}
            classes={classes}
          />
        </div>
    );
  }
  
};

export default Osteopathie;

