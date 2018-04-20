import ActionTypes from '../actionTypes';

export function changeViewTo(name) {
  return {
    type: ActionTypes.VIEW_CHANGE,
    name,
  };
};
