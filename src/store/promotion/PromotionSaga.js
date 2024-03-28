import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchData, postData, deleteData } from '../../service/Service';
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
  const promotionId = action.payload?.promotionId;
  const data = yield call(postData, `admin/promotion/${promotionId}`, action.payload?.data);
  yield put(updatePromotionAction(data));
}

function* deletePromotion(action) {
  const promotionId = action.payload;
  const data = yield call(deleteData, `admin/promotion/${promotionId}`);
  yield put(deletePromotionAction(data));
}

function* listPromotion() {
  const data = yield call(fetchData, 'admin/promotion');
  yield put(listPromotionAction(data));
}

function* promotionSaga() {
  yield takeEvery('promotion/createPromotion', createPromotion);
  yield takeLatest('promotion/listPromotion', listPromotion);
  yield takeEvery('promotion/updatePromotion', updatePromotion);
  yield takeEvery('promotion/deletePromotion', deletePromotion);
}

export default promotionSaga;
