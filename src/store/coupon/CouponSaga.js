import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchData, postData, deleteData } from '../../service/Service';
import {
  createCouponAction,
  updateCouponAction,
  deleteCouponAction,
  listCouponAction,
} from './CouponSlice';

function* createCoupon(action) {
  const data = yield call(postData, 'admin/coupon', action.payload);
  yield put(createCouponAction(data));
}

function* updateCoupon(action) {
  const couponId = action.payload?.couponId;
  const data = yield call(postData, `admin/coupon/${couponId}`, action.payload?.data);
  yield put(updateCouponAction(data));
}

function* deleteCoupon(action) {
  const couponId = action.payload;
  const data = yield call(deleteData, `admin/coupon/${couponId}`);
  yield put(deleteCouponAction(data));
}

function* listCoupon() {
  const data = yield call(fetchData, 'admin/coupon');
  yield put(listCouponAction(data));
}

function* couponSaga() {
  yield takeEvery('coupon/createCoupon', createCoupon);
  yield takeLatest('coupon/listCoupon', listCoupon);
  yield takeEvery('coupon/updateCoupon', updateCoupon);
  yield takeEvery('coupon/deleteCoupon', deleteCoupon);
}

export default couponSaga;
