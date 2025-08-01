import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchData } from '../../service/Service';
import { dashboardCountAction } from './DashboardSlice';

function* dashboardCounts() {
  const data = yield call(fetchData, 'admin/dashboard-count');
  yield put(dashboardCountAction(data));
}


function* dashboardSaga() {
  yield takeEvery('dashboard/dashboardCounts', dashboardCounts);
}

export default dashboardSaga;
