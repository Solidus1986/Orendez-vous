import React from 'react';

//import Material UI
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="src/Images/avatar1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Consultation osteopathie"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Rendez-vous le 17/02/2020 à 18h00
              </Typography>
              {" — avec Laure Sautier"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Laure Sautier" src="src/Images/avatar1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary="Cours Pilates"
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              Rendez-vous le 22/02/2020 à 11h00
            </Typography>
            {" — avec Laure Sautier"}
          </React.Fragment>
        }
      />
    </ListItem>
      <Divider variant="inset" component="li" />

    </List>
  );
};

export default Dates;