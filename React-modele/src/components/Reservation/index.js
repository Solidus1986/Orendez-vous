import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';


const styles = makeStyles(theme => ({
  root: {
    flexGrow: '1'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    width:'35vw',
    marginLeft: '50px',
    marginRight: '50px',            
    paddingBottom: 5,
    marginTop: 10,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    
  },
  button: {
    borderRadius: 3,
    border: 1,
    color: 'black',
    padding: '.5rem 1.4rem',
    margin:'.5rem',
    boxShadow: '0 3px 5px 2px grey',
  },

  panel:{
    margin:'1rem 0rem'
  },
  summary:{
    boderRadius:'5px',
  }
}));


const Reservation = () => {

  const classes = styles();
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
    <Grid container className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <h1 style={{marginBottom:'1rem'}} className="take_date">RENDEZ-VOUS</h1>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <h2 style={{margin:'1rem'}} className="datum">Choisir votre date de rendez-vous</h2>
        </Grid>
        
        <Grid item xs={6}>
          <ExpansionPanel
            className={classes.panel}
          >
            <ExpansionPanelSummary
              className={classes.summary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Dimanche 26 Janvier</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Link
                className={classes.button}
                component="button"
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >9H30
              </Link>
              <Link
                className={classes.button}
                component="button"
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >10H30
              </Link>     
              <Link
                className={classes.button}
                component="button"
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >11H00
              </Link> 
            </ExpansionPanelDetails>
          </ExpansionPanel>

          {/* ------------------------------------------------ */}

          <ExpansionPanel
            className={classes.panel}
          >
            <ExpansionPanelSummary
              className={classes.summary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Lundi 27 Janvier</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Link
                className={classes.button}
                component="button"
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >13H00
              </Link>         
            </ExpansionPanelDetails>
          </ExpansionPanel>

          {/* ------------------------------------------------ */}

          <ExpansionPanel
            className={classes.panel}
          >
            <ExpansionPanelSummary
              className={classes.summary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Mardi 28 Janvier</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Link
                className={classes.button}
                component="button"
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >10H30
              </Link>          
            </ExpansionPanelDetails>
          </ExpansionPanel>

        </Grid>
    </Grid>
  </Grid>
  );
}
 export default withStyles(styles)(Reservation);

