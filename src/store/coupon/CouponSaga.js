import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchData, postData } from '../../service/Service';
import {
  createCouponSuccess,
  createCouponError,
  updateCouponSuccess,
  updateCouponError,
  deleteCouponSuccess,
  deleteCouponError,
  listCouponSuccess,
  listCouponError,
} from './CouponSlice';

function* createCoupon(action) {
  const data = yield call(postData, 'admin/coupon', action.payload);
  if (data.msg === 'success') {
    yield put(createCouponSuccess(data.response));
  } else {
    yield put(createCouponError(data.response));
  }
}

function* updateCoupon(action) {
  const data = yield call(postData, action.payload);
  if (data.msg === 'success') {
    yield put(updateCouponSuccess(data.response));
  } else {
    yield put(updateCouponError(data.response));
  }
}

function* deleteCoupon(action) {
  const data = yield call(postData, action.payload);
  if (data.msg === 'success') {
    yield put(deleteCouponSuccess(data.response));
  } else {
    yield put(deleteCouponError(data.response));
  }
}

function* listCoupon(action) {
  const data = yield call(fetchData, action.payload);
  if (data.msg === 'success') {
    yield put(listCouponSuccess(data.response));
  } else {
    yield put(listCouponError(data.response));
  }
}

function* couponSaga() {
  yield takeEvery('coupon/createCoupon', createCoupon);
  yield takeLatest('coupon/listCoupon', listCoupon);
  yield takeEvery('coupon/updateCoupon', updateCoupon);
  yield takeEvery('coupon/deleteCoupon', deleteCoupon);
}

export default couponSaga;
