import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchData, postData } from '../../service/Service';
import {
  createWorkHourAction,
  updateWorkHourAction,
  listWorkHourAction,
} from './WorkhourSlice';

function* createWorkHour(action) {
  const data = yield call(postData, 'admin/working-hours', action.payload);
  yield put(createWorkHourAction(data));
}

function* updateWorkHour(action) {
  const WorkHourId = action.payload?.WorkHourId;
  const data = yield call(postData, `admin/working-hours/${WorkHourId}`, action.payload?.data);
  yield put(updateWorkHourAction(data));
}


function* listWorkHour() {
  const data = yield call(fetchData, 'admin/working-hours');
  console.log(data);
  
  yield put(listWorkHourAction(data));
}

function* WorkHourSaga() {
  yield takeEvery('workhour/createWorkHour', createWorkHour);
  yield takeLatest('workhour/listWorkHour', listWorkHour);
  yield takeEvery('workhour/updateWorkHour', updateWorkHour);
}

export default WorkHourSaga;
