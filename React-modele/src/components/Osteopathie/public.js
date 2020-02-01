import React from 'react';
// import PropTypes from 'proptypes';
 const Public = ({title, content}) => {
   console.log('public:',title, content)
   return(
   <div>
     <h2>{title}</h2>
     <p>{content}</p>
   </div>
   )
 };
//  Public.propTypes = {
//     title:PropTypes.string.isRequired,
//     content:PropTypes.string.isRequired,
//   };
 export default Public;
