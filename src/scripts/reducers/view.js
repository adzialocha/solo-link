import update from 'immutability-helper';

import ActionTypes from '../actionTypes';

const initialState = {
  currentView: 'editor',
};

export default function view(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.VIEW_CHANGE:
      return update(state, {
        currentView: { $set: action.name },
      });
    default:
      return state;
  }
}
