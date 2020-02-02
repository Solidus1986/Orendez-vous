import React from 'react';
// import PropTypes from 'prop-types';

import {Tabs,Paper} from '@material-ui/core';
import Tab from '@material-ui/core/Tab';

const Public = ({people, onSelect,category})=> {
console.log('public',people)
const index = category
 ?people.findIndex(group => group === category) + 1
 :0
  return (
    <>
        <Tabs
          value={index}
          // onChange={}
          indicatorColor="primary"
          textColor="primary"
          centered
        >

          <Tab label='Osteo' />
          {people.map(group =>
            <Tab label={group.title.rendered} />
          )}
         </Tabs>
    </>  
  );
}

export default Public;
