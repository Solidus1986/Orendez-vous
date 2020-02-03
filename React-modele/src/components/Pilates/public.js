import React from 'react';
import PropTypes from 'prop-types';


import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import yellow from '@material-ui/core/colors/yellow';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
// const primary = yellow[500];
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
const AntTabs = withStyles({
    indicator: {
      backgroundColor: 'yellow',
    },
  })(Tabs);

const AntTabPanel = withStyles({
  text: {
    backgroundColor: 'yellow',
  },
})(TabPanel);
  

export default function SimpleTabs({ pilates }) {
  const classes = useStyles();
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AntTabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
        {pilates.map((pilate, index) => (
          <Tab label={pilate.slug} {...a11yProps(index)} />
        ))}
      </AntTabs>
      {pilates.map((pilate, index) => (
        <TabPanel key={pilate.id} value={value} index={index}>
            <div  style={{fontSize:'1.2rem',textAlign:'justify'}} dangerouslySetInnerHTML={{ __html: pilate.content.rendered }} />
        </TabPanel>
      ))}
    </div>
  );
}
