import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  panel: {
    margin: '1rem 1rem',
  },
  card: {
    display: 'flex',
    padding: theme.spacing(3),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    filter: 'grayscale(100%)',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  button: {
    border: 'solid black 2px',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
    height: 500,
    backgroundColor: 'white',
  },
}));

const Praticien = () => {
  // config pour slide botton
  const classes = useStyles();
  const [state, setState] = React.useState({
    bottom: false,
  });
  const toggleDrawer = (side, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const fullList = (side) => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                Laure Sautier
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Osteopathe
              </Typography>
              <Typography variant="body">
              Je suis ostéopathe D.0. exclusif diplômée de l’Ecole Supérieure d’Ostéopathie de Paris (2011) : j’ai effectué une formation de 6 années à temps complet (+ de 5000 heures) pour devenir ostéopathe. J’ai été formée dans un établissement agréé par l’Etat et mon diplôme est national.
              J’exerce depuis 8 ans dans mon propre cabinet au Pré Saint Gervais. Cela fait 11 ans que je soigne les patients de tout âge : adulte, sportif, senior, enfant, nourrisson, femme enceinte.
              Je me suis spécialisée en maternité : j’ai suivi les femmes enceintes et les nourrissons de l’hôpital de Pontoise et de la clinique Vauban à Livry Gargan. J’ai créé le service d’ostéopathie à l’hôpital Notre-Dame de Bon Secours à Paris. (J’étais l’unique ostéopathe du service et je suivais les patientes tout au long de leur grossesse).
              J’ai également effectué des stages sportifs (athlétisme, salle fitness, hand ball, volley..) et des stages dans le milieu artistique de la danse et du cirque (tels que le plus grand cabaret du monde, le cirque fratellini..).
              J’ai complété ma formation en ostéopathie tissulaire (approche tissulaire Pierre Tricot 2016).
              Je me suis spécialisée aussi en Stretching-Postural (diplômée en 2017).
              Je me suis également faite former au Pilates (diplômée en 2019 par l’Institut des Métiers de la Forme).
              Qu’est ce que le stretching postural ?
              Le stretching postural est un concept d’étirements plus efficaces, rapides, et simples mis en place afin d’éviter les douleurs de votre corps. Il vous garantie souplesse malgré les effets du temps.
              Vous pouvez être conseillé(e) sur les étirements indiqués pour soigner votre posture en fonction de l’état de votre corps, votre position de travail, et vos loisirs.
              Le stretching postural a aussi un rôle capital dans le sport  : il éloigne les risques de blessure mais surtout il vous fait gagner l’amplitude, l’agilité et l’amortissement nécessaires à votre activité. Vos mouvements sont plus aisés et plus grandes sont vos sensations.
              Qu’est-ce que le Pilates ?
              Le Pilates est une gymnastique douce conçue pour soigner. C’est une solution aux douleurs de dos. Il muscle spécifiquement les muscles du dos et des abdominaux (le centre du corps).  Vous gagnerez une bonne posture et plus de stabilité dans vos mouvements. Il est accessible à tous quelque soit sa condition physique.
              Le Pilates apporte au sportif de meilleures performances grâce au renforcement de ses muscles profonds (souvent peu utilisés) qui viendront booster l’action des muscles superficiels du corps qu’il sollicite.
              Vous pouvez être conseillé(e) sur les exercices de Pilates les plus utiles à votre corps.
              </Typography>
            </CardContent>
          </div>
        </Card>
      </List>
    </div>
  );

  return (
    <div>
      <Button variant="outlined" className={classes.button} onClick={toggleDrawer('bottom', true)}>En savoir +</Button>
      <Drawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)}>
        {fullList('bottom')}
      </Drawer>
    </div>
  );
};

export default Praticien;
