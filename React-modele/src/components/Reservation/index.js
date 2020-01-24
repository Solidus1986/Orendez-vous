import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Reservation = () => {
  const classes = useStyles();
  const [pratique, setAge] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <div>
      <h1 style={{margin:'2rem'}} className="take_date">RENDEZ-VOUS</h1>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Pratique
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={pratique}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value={10}>Ostéopathie</MenuItem>
          <MenuItem value={20}>Pilates</MenuItem>
        </Select>
      </FormControl>
      <br/>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Praticiens
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={pratique}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value={10}>Laure Sautier</MenuItem>
          <MenuItem value={20}>Geronimo</MenuItem>
        </Select>
      </FormControl>
      <h2 style={{margin:'2rem'}} className="datum">Choisir votre date de rendez-vous</h2>

    </div>
  );
}
 export default Reservation;
