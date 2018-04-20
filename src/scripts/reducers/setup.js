import update from 'immutability-helper';

import ActionTypes from '../actionTypes';

const initialState = {
  devices: [],
  isComplete: false,
  isLoading: false,
  parameters: [],
  tracks: [],
};

export default function setup(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.OSC_SETUP_BEGIN:
      return update(state, {
        devices: { $set: [] },
        isComplete: { $set: false },
        isLoading: { $set: true },
        parameters: { $set: [] },
        tracks: { $set: [] },
      });
    case ActionTypes.OSC_SETUP_END:
      const { devices, parameters, tracks } = action.setup;

      return update(state, {
        devices: { $set: devices },
        isComplete: { $set: true },
        isLoading: { $set: false },
        parameters: { $set: parameters },
        tracks: { $set: tracks },
      });
    default:
      return state;
  }
}
