import ActionTypes from '../actionTypes';

export function toggleSidebar() {
  return {
    type: ActionTypes.EDITOR_TOGGLE_SIDEBAR,
  };
};

export function selectParameter(id) {
  return {
    id,
    type: ActionTypes.EDITOR_PARAMETER_SELECT,
  };
};
