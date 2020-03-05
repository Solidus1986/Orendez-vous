import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';

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

const AntTabs = withStyles({
    indicator: {
      backgroundColor: '#C2DCFF',
    },
  })(Tabs);

export default function SimpleTabs({ peoples }) {
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event,newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AntTabs value={value} onChange={handleChange} aria-label="simple tabs example" centered variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
        {peoples.map((peo, index) => (
          <Tab label={peo.slug} {...a11yProps(index)} />
        ))}
      </AntTabs>
      {peoples.map((peo, index) => (
        <TabPanel key={peo.id} value={value} index={index}>
            <div style={{fontSize:'1rem',textAlign:'justify'}} dangerouslySetInnerHTML={{ __html: peo.content.rendered }} />
        </TabPanel>
      ))}
    </div>
  );
}
