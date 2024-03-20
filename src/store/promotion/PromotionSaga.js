import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchData, postData } from '../../service/Service';
import {
  createPromotionAction,
  updatePromotionAction,
  deletePromotionAction,
  listPromotionAction,
} from './PromotionSlice';

function* createPromotion(action) {
  const data = yield call(postData, 'admin/promotion', action.payload);
  yield put(createPromotionAction(data));
}

function* updatePromotion(action) {
  const data = yield call(postData, action.payload);
  yield put(updatePromotionAction(data));
}

function* deletePromotion(action) {
  const data = yield call(postData, action.payload);
  yield put(deletePromotionAction(data));
}

function* listPromotion(action) {
  const data = yield call(fetchData, action.payload);
  yield put(listPromotionAction(data));
}

function* promotionSaga() {
  yield takeEvery('promotion/createPromotion', createPromotion);
  yield takeLatest('promotion/listPromotion', listPromotion);
  yield takeEvery('promotion/updatePromotion', updatePromotion);
  yield takeEvery('promotion/deletePromotion', deletePromotion);
}

export default promotionSaga;
