import update from 'immutability-helper';

import ActionTypes from '../actionTypes';

const initialState = {
  currentParameterId: null,
  isSidebarExpanded: false,
};

export default function editor(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.EDITOR_TOGGLE_SIDEBAR:
      return update(state, {
        isSidebarExpanded: { $set: !state.isSidebarExpanded },
      });
    case ActionTypes.EDITOR_PARAMETER_SELECT:
      return update(state, {
        currentParameterId: { $set: action.id },
      });
    case ActionTypes.SCENES_REMOVE:
      return update(state, {
        currentParameterId: { $set: null },
      });
    default:
      return state;
  }
}
