import { OSC_ACTION, OSC_SEND } from '../middlewares/osc';

export function init() {
  return {
    [OSC_ACTION]: {
      type: 'init',
    },
  };
};

export function open() {
  return {
    [OSC_ACTION]: {
      type: 'open',
    },
  };
};

export function close() {
  return {
    [OSC_ACTION]: {
      type: 'close',
    },
  };
};

export function send(...args) {
  const address = args.shift();

  return {
    [OSC_SEND]: {
      address,
      args,
    },
  };
};
