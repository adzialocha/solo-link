import ActionTypes from '../actionTypes';

import { PLAYER_ACTION } from '../middlewares/player';
import { send } from './osc';

export function startPlayer(id, triggerName, moduleName, options) {
  return dispatch => {
    dispatch({
      [PLAYER_ACTION]: {
        id,
        triggerName,
        moduleName,
        options,
        type: 'start',
      },
    });
  };
};

export function stopPlayer(id) {
  return dispatch => {
    dispatch({
      [PLAYER_ACTION]: {
        id,
        type: 'stop',
      },
    });
  };
};

export function changeParameterState(id, isActive, options) {
  return (dispatch, getState) => {
    const state = getState();
    const { min, max } = state.setup.parameters.find(p => p.id === id);
    const value = isActive ? max : min;

    dispatch(send('/param', id, value));

    dispatch({
      id,
      isActive,
      type: ActionTypes.PLAYER_STATE_CHANGE,
    });
  };
};
