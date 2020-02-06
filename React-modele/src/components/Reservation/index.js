
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const WP_URL = 'http://ec2-54-243-1-38.compute-1.amazonaws.com/wordpress/wp-json/wp/v2/';
const PRATIQUE_URL = 'practitioners';
const HORAIRES_URL = 'appointments';

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: '1',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    width: '35vw',
    marginLeft: '50px',
    marginRight: '50px',
    paddingBottom: 5,
    marginTop: 10,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),

  },
  button: {
    margin: '1.5rem',
    border: 'solid 2px black',
  },
  panel: {
    margin: '1rem 0rem',
  },
  summary: {
    boderRadius: '5px',
  },
}));


const Reservation = () => {
  const classes = styles();

  const [snack, setSnack] = useState([
    {
      snackOpen: false,
      snackMessage: '',
    },
  ]);

  const handleClose = (event) =>
  // event.preventDefault();
    setSnack({ snackOpen: false });

  const [values, setValues] = useState([{
    type: 'osteo',
  }, {
    type: 'pilates',
  },
  ]);

  const [selectValue, setSelectValue] = useState('');

  const [practitioners, setPractitioners] = useState([]);
  const [selectPractitioner, setSelectPractitioner] = useState('');

  const [dates, setDates] = useState([]);
  const [selectDate, setSelectDate] = useState('');

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);


  // ------------------> APPEL AXIOS <-----------------------

  useEffect(() => {
    console.log('type', values);
    console.log('selectValue', selectValue);
    // axios({
    //   method: 'get',
    //   url: `${WP_URL}${PRATIQUE_URL}`,
    //   param: {
    //     type: 'coach'
    //     },
    //   headers: {
    //     // 'Authorization': 'Bearer ' + app.getToken()
    //     'Content-Type': 'application/json'
    //   }
    // })
    axios.get(`${WP_URL}${PRATIQUE_URL}?type=${selectValue}`)
      .then((res) => {
        console.log('praticiens', res);

        setPractitioners(res.data);
      })
      .catch((e) => console.log(e));
  }, [selectValue]);


  useEffect(() => {
    axios.get(`${WP_URL}${HORAIRES_URL}?user_id=${selectPractitioner}&type=${selectValue}`)
      .then((res) => {
        console.log('creneaux des praticiens', res.data);
        setDates(res.data);
      })
      .catch((e) => console.log(e));
  }, [selectPractitioner]);


  // ------------------> HANDLE <-----------------------


  const handleChange = (event) => {
    setSelectValue(
      event.target.value,
    );
  };
  const handleChangePractitioner = (event) => {
    setSelectPractitioner(
      event.target.value,
    );
  };

  const handleChangeDate = (event) => {
    setSelectDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const bookingForm = event.target;
    const bookingFormData = new FormData(bookingForm);
    const data_appointment = {};
    data_appointment.appointment_id = bookingFormData.get('position');
    axios.post(`${WP_URL}${HORAIRES_URL}`, data_appointment, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => {
        console.log('dates', res);
        setSnack({ snackOpen: true, snackMessage: 'Votre Rendez-vous est bien confirmé' });
      })
      .catch((e) => {
        console.log('c\'est une erreur', e.response.data.message);
        setSnack({ snackOpen: true, snackMessage: "Veuillez vous connecter au préalable pour choisir un Rendez-vous"});
      });
  };

  const cleanDate = (date) => {
    const event = new Date(date);
    const datum = event.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return datum;
  };

  // ------------------> RETURN <-----------------------

  return (

    <>
      {/* // ------------------> SELECT <----------------------- */}
      <Snackbar
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        open={snack.snackOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snack.snackMessage}
        action={(
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <Link to="/"><CloseIcon fontSize="small" /></Link>
            </IconButton>
          </>
        )}
      />

      <Grid container className={classes.root}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <h1 style={{ marginBottom: '1rem' }} className="take_date">RENDEZ-VOUS</h1>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
              Pratique
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={handleChange}
                value={selectValue}
                labelWidth={labelWidth}
              >
                <MenuItem value="osteo">Ostéopathie</MenuItem>
                <MenuItem value="pilates">Pilates</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
             Praticiens
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={selectPractitioner}
                onChange={handleChangePractitioner}
                labelWidth={labelWidth}
              >
                {practitioners.map((practitioner, index) => <MenuItem key={index} value={practitioner.id} primarytext={practitioner.first_name}>{practitioner.first_name}</MenuItem>)}

              </Select>
            </FormControl>
          </Grid>


          {/* // ------------------> DATE <----------------------- */}

          <Grid item xs={12}>
            <h2 style={{ margin: '1rem' }} className="datum">Choisir votre date de rendez-vous</h2>
          </Grid>

          <Grid item xs={6}>
            <form onSubmit={handleSubmit}>
              {Object.keys(dates).map((date, index) => (
                <ExpansionPanel
                  key={index}
                  className={classes.panel}
                >
                  <ExpansionPanelSummary
                    className={classes.summary}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >

                    <Typography key={index} className={classes.heading}>{date}</Typography>
                    {/* {console.log('qui es tu?', dates)} */}
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    {Object.keys(dates[date]).map((d, index) => (
                      <RadioGroup key={index} aria-label="position" name="position" value={selectDate} onChange={handleChangeDate} row>
                        {/* {console.log('quelle heure est t-il?', cleanDate(dates[date][d].start_date))} */}
                        <FormControlLabel
                          key={index}
                          value={dates[date][d].id}
                          control={<Radio color="primary" />}
                          label={cleanDate(dates[date][d].start_date)}
                          labelPlacement="end"
                        />
                      </RadioGroup>

                    ))}
                  </ExpansionPanelDetails>

                </ExpansionPanel>
              ))}
              <Button
                type="submit"
            // variant='outline'
                className={classes.button}
              >VALIDATION
              </Button>
            </form>
          </Grid>

        </Grid>
      </Grid>
    </>
  );
};
export default withStyles(styles)(Reservation);


//  <Link
//  className={classes.button}
//  component="button"
//  variant="body2"
//  onClick={() => {
//    console.info("I'm a button.");
//  }}
// >9H30
// </Link>
