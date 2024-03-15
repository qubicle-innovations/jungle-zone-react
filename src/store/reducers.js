import { combineReducers } from "redux";

import login from './auth/AuthSlice';
import customizer from './customizer/CustomizerSlice';

const rootReducer = combineReducers({
  // public
  customizer,
  login,
});

export default rootReducer;