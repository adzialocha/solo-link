import update from 'immutability-helper';

import ActionTypes from '../actionTypes';

const initialState = {
  isSidebarExpanded: false,
};

export default function editor(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.EDITOR_TOGGLE_SIDEBAR:
      return update(state, {
        isSidebarExpanded: { $set: !state.isSidebarExpanded },
      });
    default:
      return state;
  }
}
