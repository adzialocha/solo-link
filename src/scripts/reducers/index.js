import { combineReducers } from 'redux';

import osc from './osc';
import scenes from './scenes';
import settings from './settings';
import setup from './setup';
import view from './view';

const rootReducer = combineReducers({
  osc,
  scenes,
  settings,
  setup,
  view,
});

export default rootReducer;
