import { combineReducers } from 'redux';

import osc from './osc';
import editor from './editor';
import scenes from './scenes';
import settings from './settings';
import setup from './setup';
import view from './view';

const rootReducer = combineReducers({
  osc,
  editor,
  scenes,
  settings,
  setup,
  view,
});

export default rootReducer;
