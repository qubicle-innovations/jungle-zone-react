import { combineReducers } from "redux";

import login from './auth/AuthSlice';
import customizer from './customizer/CustomizerSlice';
import coupon from './coupon/CouponSlice';

const rootReducer = combineReducers({
  // public
  customizer,
  login,
  coupon
});

export default rootReducer;