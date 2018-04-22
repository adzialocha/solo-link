import { combineReducers } from 'redux';

import editor from './editor';
import osc from './osc';
import player from './player';
import scenes from './scenes';
import settings from './settings';
import setup from './setup';
import view from './view';

const rootReducer = combineReducers({
  editor,
  osc,
  player,
  scenes,
  settings,
  setup,
  view,
});

export default rootReducer;
