import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const styles = makeStyles(theme => ({
  root: {
    flexGrow: '1'
  },
  panel:{
    margin:'1rem 0rem'
  },
  summary:{
    boderRadius:'5px',
  }
}));

const Infos = (props) => {
  
  const { infos } = props
  console.log("infos:",infos)
  const classes = styles()
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <h1 style={{marginBottom:'1rem'}}>INFOS</h1>
        </Grid>
         <Grid container justify="center">
           <Grid item xs={6}>
             {infos.map(info => (
               <Grid key={info.id}>
               {console.log('info:',info.title.rendered)}
               
                   <ExpansionPanel
                     className={classes.panel}
                   >
                     <ExpansionPanelSummary
                       className={classes.summary}
                       expandIcon={<ExpandMoreIcon />}
                       aria-controls="panel1a-content"
                       id="panel1a-header"
                     >
                       <Typography className={classes.heading}>{info.title.rendered}</Typography>
                     </ExpansionPanelSummary>
                     <ExpansionPanelDetails>
                       <Typography>
                         {info.content.rendered}
                       </Typography>
                     </ExpansionPanelDetails>
                   </ExpansionPanel>
                 </Grid>
             ))}
               </Grid>
           </Grid>
    </Grid>
  );
};
export default withStyles(styles)(Infos);
