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

const Praticien = ({ content, title, type }) => {
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
                {title.rendered}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {type}
              </Typography>
              <Typography
                variant="body"
                dangerouslySetInnerHTML={{ __html: content.rendered }}
               />
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
