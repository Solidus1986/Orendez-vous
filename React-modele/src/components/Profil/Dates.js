import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import Material UI
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const WP_URL = 'http://ec2-54-243-1-38.compute-1.amazonaws.com/wordpress/wp-json/wp/v2/';
const HORAIRES_URL = 'appointments/me';
const DELETE_URL = 'appointments/';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  button: {
    marginTop: '.4rem',
    padding: '.5rem 1rem',
    border: 'solid 2px black',
  },
}));

const Dates = () => {
  const classes = useStyles();
  const [date, setDate] = useState([]);

  useEffect(() => {
    console.log('date', date);

    axios.get(`${WP_URL}${HORAIRES_URL}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => {
        console.log('recuperation date', res.data);

        setDate(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const cleanDate = (date) => {
    const event = new Date(date);
    const jours = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
    const mois = new Array('Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre');
    let datum = `${jours[event.getDay()]  } `;
    datum += `${event.getDate()  } `;
    datum += `${mois[event.getMonth()]  } ` + ` à `;
    datum += event.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return datum;
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const id = e.target.parentElement;
    date.splice(id, 1);
    setDate([...date]);
    axios.delete(`${WP_URL}${DELETE_URL}`, date, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => {
        console.log('votre annulation est validé', res.data);
        setDate(res.data);
      })
      .catch((e) => {
        console.log('vous ne pouvez pas annuler', e.response.data.message);
      });
  };

  return (
    <List className={classes.root}>
      {date.map((myDate) => (
      <>

        {console.log('myDate', myDate)}
        <ListItem key={myDate.id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="logo" src="src/Images/logo.png" />
          </ListItemAvatar>
          <ListItemText
            primary={
              myDate.type == 'osteo' ? 'Ostéopathie' : 'Pilates'
              }
            secondary={(
              <React.Fragment>
              
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Rendez-vous le {cleanDate(myDate.start_date)}
                </Typography>
              </React.Fragment>
            )}
          />
          <Button
            key={myDate.id}
            className={classes.button}
            onClick={handleDelete}
          >
          Annuler le rendez-vous
          </Button>
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    ))}

    </List>
  );
};

export default Dates;
