import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchData, postData } from '../../service/Service';
import {
  createPromotionSuccess,
  createPromotionError,
  updatePromotionSuccess,
  updatePromotionError,
  deletePromotionSuccess,
  deletePromotionError,
  listPromotionSuccess,
  listPromotionError,
} from './PromotionSlice';

function* createPromotion(action) {
  const data = yield call(postData, 'admin/promotion', action.payload);
  if (data.msg === 'success') {
    yield put(createPromotionSuccess(data.response));
  } else {
    yield put(createPromotionError(data.response));
  }
}

function* updatePromotion(action) {
  const data = yield call(postData, action.payload);
  if (data.msg === 'success') {
    yield put(updatePromotionSuccess(data.response));
  } else {
    yield put(updatePromotionError(data.response));
  }
}

function* deletePromotion(action) {
  const data = yield call(postData, action.payload);
  if (data.msg === 'success') {
    yield put(deletePromotionSuccess(data.response));
  } else {
    yield put(deletePromotionError(data.response));
  }
}

function* listPromotion(action) {
  const data = yield call(fetchData, action.payload);
  if (data.msg === 'success') {
    yield put(listPromotionSuccess(data.response));
  } else {
    yield put(listPromotionError(data.response));
  }
}

function* promotionSaga() {
  yield takeEvery('promotion/createPromotion', createPromotion);
  yield takeLatest('promotion/listPromotion', listPromotion);
  yield takeEvery('promotion/updatePromotion', updatePromotion);
  yield takeEvery('promotion/deletePromotion', deletePromotion);
}

export default promotionSaga;
