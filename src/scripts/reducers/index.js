import { combineReducers } from 'redux';

import osc from './osc';
import settings from './settings';
import view from './view';

const rootReducer = combineReducers({
  osc,
  settings,
  view,
});

export default rootReducer;
