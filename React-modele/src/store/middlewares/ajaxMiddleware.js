import axios from 'axios';

import { CONNECT_USER, REFRESH } from 'src/store/reducer/login';
import { logUser } from 'src/store/reducer/user';

const ajaxMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case CONNECT_USER:
      console.log(store.getState());
      // console.log("je vais faire l'appel à l'API");
      // console.log(store.getState().form.inputValue);
      axios.post('http://ec2-54-243-1-38.compute-1.amazonaws.com/projet-orendez-vous/WP/wp-json/jwt-auth/v1/token', {

        username: store.getState().login.username,
        password: store.getState().login.password,

      })
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          // on veut mettre logged à true et stocker les infos de l'utilisateur
          const actionLogUser = logUser(
            response.data.user_display_name,
            response.data.user_nicename,
            response.data.user_email,

          );
          store.dispatch(actionLogUser);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
      break;

    case REFRESH:

      axios.get('http://ec2-54-243-1-38.compute-1.amazonaws.com/projet-orendez-vous/WP/wp-json/jwt-auth/v1/token/validate', {
        headers: {
          Authorization: `token ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => {
          // on veut mettre logged à true et stocker les infos de l'utilisateur
          const actionRefresh = logUser(
            response.data.user_display_name,
            response.data.user_nicename,
            response.data.user_email,

          );
          console.log('response data', response);
          store.dispatch(actionRefresh);
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
