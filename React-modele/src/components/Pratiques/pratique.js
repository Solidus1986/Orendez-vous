import React from 'react';
import { Link } from 'react-router-dom';

//impoort Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


// import local
import './pratique.scss'


class Pratique extends React.Component {

  render() {
    const {classes} = this.props
    return(
      <div>
        <Grid container justify = "center">
          <Grid>
          <h1 style={classes.title}>L'ostéopathie</h1>
            <div>
              <Button
              variant='outline'
              style={classes.button}
              // onClick={this.continue}
              >
                Adulte
              </Button>
              <Button
              variant='outline'
              style={classes.button}
              // onClick={this.continue}
              >
                Femme enceinte
              </Button>
              <Button
              variant='outline'
              style={classes.button}
              // onClick={this.continue}
              >
                Nourisson
              </Button>
              <Button
              variant='outline'
              style={classes.button}
              // onClick={this.continue}
              >
                Sportif
              </Button>
            </div>
          <Link to={'/praticiens'}>
            <Button 
              variant='outline'
              style={classes.button}
            >
            Praticiens
            </Button>
          </Link>
          <p>
          L’ostéopathie est une thérapie manuelle reconnue en France qui vise à maintenir et
          restituer un bon état de santé à votre corps. Elle ne substitue pas à la médecine
          traditionnelle. Néanmoins, c’est une médecine complémentaire qui entretient,
          et soulage de manière naturelle. Ses fondements sont l’anatomie, la
          biomécanique et la physiologie.
          Elle restitue la meilleure mobilité et intégrité aux différentes parties de votre corps
          afin que chacune d’elle puisse exercer au mieux sa fonction en harmonie (marche, mouvements,
          digestion, respiration..)
          Cette médecine ne cherche pas à soigner les symptômes mais la cause du
          déséquilibre durablement. Pour cela, le patient est considéré dans sa globalité (son corps, son
          psychisme, son environnement, ses habitudes et son hygiène de vie). 
          
          L’ostéopathie est une science, un art et une philosophie – Andrew Taylor Still
          </p>

        <Link to={'/pratiques/reservation'}>
          <Button 
            variant='outline'
            style={classes.button}
          >
          Prendre rendez vous
          </Button>
        </Link>
        </Grid>
      </Grid>
    </div>
    )
  }
}

export default Pratique;

