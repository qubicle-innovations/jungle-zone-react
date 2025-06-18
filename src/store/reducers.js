import { combineReducers } from 'redux';

import login from './auth/AuthSlice';
import customizer from './customizer/CustomizerSlice';
import coupon from './coupon/CouponSlice';
import promotion from './promotion/PromotionSlice';
import subadmin from './subadmin/SubadminSlice';
import category from './category/CategorySlice';
import attraction from './attraction/AttractionSlice';
import gallery from './gallery/GallerySlice';
import psettings from './passwordsettings/PSettingsSlice'

const rootReducer = combineReducers({
  // public
  customizer,
  login,
  coupon,
  promotion,
  subadmin,
  category,
  attraction,
  gallery,
  psettings,
});

export default rootReducer;
