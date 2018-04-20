import update from 'immutability-helper';

import ActionTypes from '../actionTypes';
import { getItem, setItem, hasItem } from '../services/storage';

const STORAGE_NETWORK_KEY = 'settings-network';

const initialState = {
  network: {
    host: 'localhost',
    port: 9789,
  },
  setup: {
    devices: [],
    isComplete: false,
    isLoading: false,
    parameters: [],
    tracks: [],
  },
};

export default function settings(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SETTINGS_SAVE:
      const updatedState = update(state, {
        [action.namespace]: { $set: action.settings },
      });

      setItem(STORAGE_NETWORK_KEY, JSON.stringify(updatedState));

      return updatedState;
    case ActionTypes.SETTINGS_LOAD:
      if (hasItem(STORAGE_NETWORK_KEY)) {
        return update(state, {
          network: { $set: JSON.parse(getItem(STORAGE_NETWORK_KEY)) },
        });
      }

      return state;
    case ActionTypes.OSC_SETUP_BEGIN:
      return update(state, {
        setup: {
          devices: { $set: [] },
          isComplete: { $set: false },
          isLoading: { $set: true },
          parameters: { $set: [] },
          tracks: { $set: [] },
        },
      });
    case ActionTypes.OSC_SETUP_END:
      const { devices, parameters, tracks } = action.setup;

      return update(state, {
        setup: {
          devices: { $set: devices },
          isComplete: { $set: true },
          isLoading: { $set: false },
          parameters: { $set: parameters },
          tracks: { $set: tracks },
        },
      });
    default:
      return state;
  }
}
