import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchData, postData, deleteData } from '../../service/Service';
import {
  createAttractionAction,
  updateAttractionAction,
  deleteAttractionAction,
  listAttractionAction,
} from './AttractionSlice';

function* createAttraction(action) {
  const data = yield call(postData, 'admin/attraction', action.payload);
  yield put(createAttractionAction(data));
}

function* updateAttraction(action) {
  const attractionId = action.payload?.attractionId;
  const data = yield call(postData, `admin/attraction/${attractionId}`, action.payload?.data);
  yield put(updateAttractionAction(data));
}

function* deleteAttraction(action) {
  const attractionId = action.payload;
  const data = yield call(deleteData, `admin/attraction/${attractionId}`);
  yield put(deleteAttractionAction(data));
}

function* listAttraction() {
  const data = yield call(fetchData, 'admin/attraction');
  yield put(listAttractionAction(data));
}

function* attractionSaga() {
  yield takeEvery('attraction/createAttraction', createAttraction);
  yield takeLatest('attraction/listAttraction', listAttraction);
  yield takeEvery('attraction/updateAttraction', updateAttraction);
  yield takeEvery('attraction/deleteAttraction', deleteAttraction);
}

export default attractionSaga;
