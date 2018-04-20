import ActionTypes from '../actionTypes';

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
