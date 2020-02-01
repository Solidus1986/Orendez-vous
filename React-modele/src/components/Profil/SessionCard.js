import React from 'react';

//import 


const SessionCard = ({meta}) => {
  console.log('session',meta)
   return (
    <div>
    {meta.nb_seance} séances pilates
    </div>
  );
};


export default SessionCard;
