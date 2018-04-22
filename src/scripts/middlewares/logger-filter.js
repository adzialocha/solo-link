import ActionTypes from '../actionTypes';

const FILTER_ACTIONS = [
  ActionTypes.PLAYER_STATE_CHANGE,
];

export default store => next => action => {
  if (!('type' in action)) {
    return next(action);
  }

  if (!FILTER_ACTIONS.includes(action.type)) {
    return next(action);
  }
};
