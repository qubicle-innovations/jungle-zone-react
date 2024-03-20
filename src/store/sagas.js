import { all, fork } from 'redux-saga/effects';
import AuthSaga from './auth/AuthSaga';
import CouponSaga from './coupon/CouponSaga';
import PromotionSaga from './promotion/PromotionSaga';

export default function* rootSaga() {
  yield all([
    //public
    fork(AuthSaga),
    CouponSaga(),
    PromotionSaga(),
  ]);
}
