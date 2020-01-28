import React from 'react';
import { Link } from 'react-router-dom';

//impoort Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


// import local
import './pratique.scss'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin:'1rem 0rem',
  },
  pratique:{
    display:'inline-block',
    margin:'1.4rem',
    textTransform: 'uppercase',
    fontSize: '12rem',
    backgroundColor:'white',
    '@media screen and (min-width: 600px) and (max-width: 1200px)': {
      fontSize: '10rem',
  },
  button: {
    borderRadius: 3,
    border: 1,
    color: 'black',
    padding: '.5rem 1.4rem',
    margin:'.5rem',
    boxShadow: '0 3px 5px 2px grey',
  }
}
}));


const Pratique = () => {
  const classes = useStyles();
    return(
      <Grid>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <h1 style={{marginBottom:'1rem'}}>INFOS</h1>
          </Grid>
          <Grid container justify="center">
           <Grid item xs={12}>
              <Button
              variant='outline'
              style={classes.button}
              >
                Adulte
              </Button>
              <Button
              variant='outline'
              style={classes.button}
              >
                Femme enceinte
              </Button>
              <Button
              variant='outline'
              style={classes.button}
              >
                Nourisson
              </Button>
              <Button
              variant='outline'
              style={classes.button}
              >
                Sportif
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link to={'/praticiens'}>
                <Button 
                  variant='outline'
                  style={classes.button}
                >
                Praticiens
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={12}>
              <Link to={'/pratiques/reservation'}>
                <Button 
                  variant='outline'
                  className={classes.button}
                >
                 Rendez vous
                </Button>
              </Link>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
    )
  }


export default Pratique;

