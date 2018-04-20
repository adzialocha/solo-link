import OSC from 'osc-js';

import AbletonSetup from '../services/ableton-setup';
import ActionTypes from '../actionTypes';

const osc = new OSC();

const abletonSetup = new AbletonSetup({
  osc,
});

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
  } else if (type === 'setup') {
    if (abletonSetup.isLoading) {
      return;
    }

    store.dispatch({
      type: ActionTypes.OSC_SETUP_BEGIN,
    });

    abletonSetup.load()
      .then(setup => {
        store.dispatch({
          setup,
          type: ActionTypes.OSC_SETUP_END,
        });
      });
  }
}

function sendMessage(address, args) {
  if (typeof args !== 'object') {
    osc.send(new OSC.Message(address, ...args));
  } else {
    const message = new OSC.Message(address);

    args.forEach(item => {
      message.add(item);
    });

    osc.send(message);
  }
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
