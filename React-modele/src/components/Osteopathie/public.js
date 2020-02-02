import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    borderRadius: 3,
    border: 1,
    color: 'black',
    padding: '.5rem 1.4rem',
    margin:'.5rem',
    boxShadow: '0 1px 2px 1px rgb(196, 196, 196)',
  },
  div: {
    position: 'absolute',
    top: 28,
    right: 0,
    left: 0,
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },

}));

export default function Public({ title, content }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.wrapper} >
        <button type="button" onClick={handleClick}>
          {title.rendered}
        </button>
        {open ? (
          <div className={classes.div} dangerouslySetInnerHTML={{__html:content.rendered}} />
        ) : null}
      </div>
    </ClickAwayListener>
  );
}