import { combineReducers } from 'redux';

import osc from './osc';
import settings from './settings';
import setup from './setup';
import view from './view';

const rootReducer = combineReducers({
  osc,
  settings,
  setup,
  view,
});

export default rootReducer;
