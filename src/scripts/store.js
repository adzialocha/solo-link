import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import loggerFilter from './middlewares/logger-filter';
import osc from './middlewares/osc';
import player from './middlewares/player';
import reducers from './reducers';

let store;

export default function configureStore() {
  const middleware = [
    osc,
    player,
    thunk,
  ];

  if (process.env.NODE_ENV === 'development') {
    middleware.push(loggerFilter);
    middleware.push(createLogger());
  }

  store = createStore(
    reducers,
    applyMiddleware(...middleware),
  );

  return store;
}

export function getStore() {
  return store;
}
