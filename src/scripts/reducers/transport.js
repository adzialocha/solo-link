import update from 'immutability-helper';

import ActionTypes from '../actionTypes';

const initialState = {
  isPlaying: false,
  isRecording: false,
};

export default function transport(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.TRANSPORT_PLAY:
      return update(state, {
        isPlaying: { $set: true },
      });
    case ActionTypes.TRANSPORT_STOP:
      return update(state, {
        isPlaying: { $set: false },
        isRecording: { $set: false },
      });
    case ActionTypes.TRANSPORT_RECORD:
      return update(state, {
        isPlaying: { $set: true },
        isRecording: { $set: true },
      });
    default:
      return state;
  }
}
