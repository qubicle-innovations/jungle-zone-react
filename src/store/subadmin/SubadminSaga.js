import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchData, postData, deleteData } from '../../service/Service';
import {
  createSubadminAction,
  updateSubadminAction,
  deleteSubadminAction,
  listSubadminAction,
} from './SubadminSlice';

function* createSubadmin(action) {
  const data = yield call(postData, 'admin/subadmin', action.payload);
  yield put(createSubadminAction(data));
}

function* updateSubadmin(action) {
  const subadminId = action.payload?.subadminId;
  const data = yield call(postData, `admin/subadmin/${subadminId}`, action.payload?.data);
  yield put(updateSubadminAction(data));
}

function* deleteSubadmin(action) {
  const subadminId = action.payload;
  const data = yield call(deleteData, `admin/subadmin/${subadminId}`);
  yield put(deleteSubadminAction(data));
}

function* listSubadmin() {
  const data = yield call(fetchData, 'admin/subadmin');
  yield put(listSubadminAction(data));
}

function* subadminSaga() {
  yield takeEvery('subadmin/createSubadmin', createSubadmin);
  yield takeLatest('subadmin/listSubadmin', listSubadmin);
  yield takeEvery('subadmin/updateSubadmin', updateSubadmin);
  yield takeEvery('subadmin/deleteSubadmin', deleteSubadmin);
}

export default subadminSaga;
