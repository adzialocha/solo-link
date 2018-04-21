import ActionTypes from '../actionTypes';

export function loadScenes() {
  return {
    type: ActionTypes.SCENES_LOAD,
  };
};

export function addScene(id) {
  return {
    id,
    type: ActionTypes.SCENES_ADD,
  };
};

export function removeScene(id) {
  return {
    id,
    type: ActionTypes.SCENES_REMOVE,
  };
};

export function resetScenes() {
  return {
    type: ActionTypes.SCENES_RESET,
  };
};

export function selectScene(id) {
  return {
    id,
    type: ActionTypes.SCENES_SELECT,
  };
};
