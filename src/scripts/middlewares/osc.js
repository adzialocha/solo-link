import OSC from 'osc-js';

import ActionTypes from '../actionTypes';

const osc = new OSC();

export const OSC_ACTION = Symbol('osc-middleware-action');
export const OSC_SEND = Symbol('osc-middleware-send');

function registerEventHandlers(store) {
  osc.on('open', () => {
    store.dispatch({
      type: ActionTypes.OSC_OPEN,
    });
  });

  osc.on('close', () => {
    store.dispatch({
      type: ActionTypes.OSC_CLOSE,
    });
  });

  osc.on('error', error => {
    store.dispatch({
      type: ActionTypes.OSC_ERROR,
      error,
    });
  });
}

function registerMessageHandlers(store) {
  // @TODO
}

function handleAction(store, type) {
  const state = store.getState();
  const { host, port } = state.settings.network;

  if (type === 'init') {
    registerEventHandlers(store);
    registerMessageHandlers(store);

    store.dispatch({
      type: ActionTypes.OSC_READY,
    });
  } else if (type === 'open') {
    if (!state.osc.isOpen) {
      osc.open({ host, port });
    }
  } else if (type === 'close') {
    if (state.osc.isOpen) {
      osc.close();
    }
  }
}

function sendMessage(address, args) {
  osc.send(new OSC.Message(address, ...args));
}

export default store => next => action => {
  if (OSC_ACTION in action) {
    const { type } = action[OSC_ACTION];
    handleAction(store, type);
  } else if (OSC_SEND in action) {
    const { address, args } = action[OSC_SEND];
    sendMessage(address, args);
  } else {
    return next(action);
  }
};
