import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducers from './reducers';

let store;

export default function configureStore() {
  const middleware = [
    thunk,
  ];

  if (!PRODUCTION) {
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
