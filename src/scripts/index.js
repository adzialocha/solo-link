import '../styles/app.scss';

import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import configureStore from './store';
import { App } from './views';
import { init, close } from './actions/osc';
import { loadScenes } from './actions/scenes';
import { loadSettings } from './actions/settings';

const store = configureStore();

function initializeOSC() {
  store.dispatch(init());

  window.onbeforeunload = () => {
    store.dispatch(close());
  };
}

function initializeProject() {
  store.dispatch(loadScenes());
  store.dispatch(loadSettings());
}

initializeOSC();
initializeProject();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
