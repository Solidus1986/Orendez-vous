import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '7rem 0rem',
  },

  pratique:{
    display:'inline-block',
    textTransform: 'uppercase',
    fontSize: '12rem',
    backgroundColor:'white',
    '@media screen and (min-width: 600px) and (max-width: 1200px)': {

      fontSize: '9rem',
  },
  '@media screen and (min-width: 200px) and (max-width: 600px)': {
    fontSize: '4rem',
  },
  '&:hover':{
    color:'#ffef05'
  }
}
}));



const Nav = (props) => {
  const classes = useStyles();
  const { data } = props;
  console.log("data:",data);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="center">
                {data.map(p => (
                  <div key={p.id}>
                    <Link to="/pratiques" className={classes.pratique}>{p.pratique}</Link>
                  </div>
                ))}
          </Grid>
    </Grid>
    </Grid>
  );
};

export default Nav;



// const WP_URL = 'http://ec2-54-243-1-38.compute-1.amazonaws.com/projet-orendez-vous/WP/wp-json/wp/v2/';
// const Osteopathie = 'osteopathie?category-osteo=2';
// const Pilates = 'pilates?category-pilates=6';

// class Nav extends React.Component {
//   state = {
//     osteos: [],
//     pilates:[],
//   }
  
//   componentDidMount() {
//     axios.get(`${WP_URL}${Osteopathie}`)
//       .then(res => {
//         const osteos = res.data;
//         this.setState({ osteos });
//         console.log('axios-osteo', res.data);
//       })
//       // axios.get(`${WP_URL}${Pilates}`)
//       // .then(res => {
//       //   const pilates = res.data;
//       //   this.setState({ pilates });
//       //   console.log('axios-pilates', res.data);
//       // })

//   }

//   render(){
//   const classes = styles;
//   const { osteos } = this.state
//   return (
//       <Grid container className={classes.root} spacing={2}>
//         <Grid item xs={12}>
//           <Grid container justify="center" spacing={2}>
//             {osteos.map(o => (
//               <Grid key={o.id}>
//                 <Link to="/pratiques" className={classes.pratique}>{o.type}</Link>
//               </Grid>
//             ))}
//           </Grid>
//           {/* <Grid container justify="center" spacing={2}>
//             {pilates.map(p => (
//               <Grid key={p.id}>
//                 <Link to="/pratiques" className={classes.pratique}>{p.pratique}</Link>
//               </Grid>
//             ))}
//           </Grid> */}
//         </Grid>
//     </Grid>
//   )
//   }
// } 

