import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  console.log("tabpanel",props)
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
  
 };

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto({people}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event,newValue) => {
    setValue(newValue);
  };

  // const handleSelect = (event,index)=>handleChange(index===0?'':people[index-1])

  return (
    <div className={classes.root}>

      
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="default"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
        {people.map(peo=>(

          <Tab key ={peo.id} label={peo.title.rendered} {...a11yProps(peo.id)} />
         ))}
         </Tabs>
       
         {/* <TabPanel value={value} index={1}>
        {data[2].title.rendered}
      </TabPanel> */}
    </div>
  );
}

