import { combineReducers } from 'redux';

import login from './auth/AuthSlice';
import customizer from './customizer/CustomizerSlice';
import coupon from './coupon/CouponSlice';
import promotion from './promotion/PromotionSlice';
import subadmin from './subadmin/SubadminSlice';

const rootReducer = combineReducers({
  // public
  customizer,
  login,
  coupon,
  promotion,
  subadmin,
});

export default rootReducer;
