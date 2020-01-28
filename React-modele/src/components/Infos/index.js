import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const WP_URL = 'http://ec2-54-243-1-38.compute-1.amazonaws.com/projet-orendez-vous/WP/wp-json/wp/v2/';
const Informations = 'osteopathie?category-osteo=4';

const styles = {
  root: {
    flexGrow: '1'
  },
  panel:{
    margin:'1rem 0rem'
  },
  summary:{
    boderRadius:'5px',
  }
};

class Infos extends React.Component {
  state = {
    infos: [],
  }

  componentDidMount() {
    axios.get(`${WP_URL}${Informations}`)
      .then(res => {
        const infos = res.data;
        this.setState({ infos });
        console.log('axios', res.data);
      })
  }
  render(){
    const classes = styles;
    const {infos}= this.state;
      return (
        <Grid container style={classes.root}>
          <Grid item xs={12}>
            <h1 style={{marginBottom:'1rem'}}>INFOS</h1>
          </Grid>
           <Grid container justify="center">
             <Grid item xs={6}>
               {infos.map(info => (
                 <Grid key={info.id}>
                 {console.log('info:',info.title.rendered)}
                 
                     <ExpansionPanel
                       style={classes.panel}
                     >
                       <ExpansionPanelSummary
                         style={classes.summary}
                         expandIcon={<ExpandMoreIcon />}
                         aria-controls="panel1a-content"
                         id="panel1a-header"
                       >
                         <Typography style={classes.heading}>{info.title.rendered}</Typography>
                       </ExpansionPanelSummary>
                       <ExpansionPanelDetails>
                         <Typography
                         dangerouslySetInnerHTML={{__html:info.content.rendered}}
                         >
                         </Typography>
                       </ExpansionPanelDetails>
                     </ExpansionPanel>
                   </Grid>
               ))}
                 </Grid>
             </Grid>
      </Grid>
    );

  }
}
export default withStyles(styles)(Infos);
