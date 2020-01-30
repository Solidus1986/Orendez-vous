import { createStore, applyMiddleware, compose } from 'redux';

import ajaxMiddleware from 'src/store/middlewares/ajaxMiddleware';

// on importe le reducer qui combine les autres
import reducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    ajaxMiddleware,
  ),
);

const store = createStore(
  reducer,
  enhancers,
);

export default store;
