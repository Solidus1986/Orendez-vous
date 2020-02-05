import React, {useState, useEffect} from 'react';
import axios from 'axios';

//import Material UI
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const WP_URL = 'http://ec2-54-243-1-38.compute-1.amazonaws.com/wordpress/wp-json/wp/v2/';
const HORAIRES_URL = 'appointments/me';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const Dates = () => {
  const classes = useStyles();
  const [date, setDate] = useState([]);

  useEffect(()=>{
    console.log('date', date);
 
    axios.get(`${WP_URL}${HORAIRES_URL}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => {
        console.log('recuperation date', res.data);
    
        setDate(res.data)
      })
      .catch(e => console.log(e));
  },[])

  const cleanDate = (date) => {
    const event = new Date (date)
    const jours = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
    const mois = new Array("Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre");
    let datum = jours[event.getDay()] + " "; 
    datum += event.getDate() + " ";
    datum += mois[event.getMonth()] + " " + " à ";
    datum += event.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    return datum;
  }
  
  return (
    <List className={classes.root}>
    {date.map(myDate => (
      <>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="logo" src="src/Images/logo.png" />
          </ListItemAvatar>
          <ListItemText
            primary={myDate.type}
            secondary={
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
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
      ))}
      
    </List>
  );
};

export default Dates;
