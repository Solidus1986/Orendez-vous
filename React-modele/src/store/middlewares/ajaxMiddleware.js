import axios from 'axios';

import { CONNECT_USER } from 'src/store/reducer/login';
import { logUser } from 'src/store/reducer/user';

const ajaxMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case CONNECT_USER:
      
      // console.log("je vais faire l'appel à l'API");
      // console.log(store.getState().form.inputValue);
      axios.get('http://ec2-54-243-1-38.compute-1.amazonaws.com/projet-orendez-vous/WP/wp-json/jwt-auth/v1/token', user, {
        headers: {
          Authorization: `token ${store.getState().login.inputValue}`,
        },
      })
        .then((response) => {
          // on veut mettre logged à true et stocker les infos de l'utilisateur
          const actionLogUser = logUser(
            response.data.login,
            
          );
          store.dispatch(actionLogUser);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
      break;
    default:
      // par défaut, je laisse passer l'action
      next(action);
  }
};

export default ajaxMiddleware;
