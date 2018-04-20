import ActionTypes from '../actionTypes';

import { OSC_ACTION } from '../middlewares/osc';

export function saveSettings(namespace, settings) {
  return {
    namespace,
    settings,
    type: ActionTypes.SETTINGS_SAVE,
  };
};

export function loadSettings() {
  return {
    type: ActionTypes.SETTINGS_LOAD,
  };
};

export function loadAbletonSetup() {
  return {
    [OSC_ACTION]: {
      type: 'setup',
    },
  };
};
