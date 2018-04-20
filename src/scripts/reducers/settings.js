import update from 'immutability-helper';

import ActionTypes from '../actionTypes';
import { getItem, setItem, hasItem } from '../services/storage';

const STORAGE_KEY = 'settings';

const initialState = {
  network: {
    host: 'localhost',
    port: 9789,
  },
};

export default function view(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SETTINGS_SAVE:

      const updatedState = update(state, {
        [action.namespace]: { $set: action.settings },
      });

      setItem(STORAGE_KEY, JSON.stringify(updatedState));

      return updatedState;
    case ActionTypes.SETTINGS_LOAD:
      if (hasItem(STORAGE_KEY)) {
        return update(state, { $set: JSON.parse(getItem(STORAGE_KEY)) });
      }

      return state;
    default:
      return state;
  }
}
