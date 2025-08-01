import { call, put, takeEvery } from 'redux-saga/effects';
import { postData } from '../../service/Service';
import { changePasswordAction } from './PSettingsSlice';

function* changePassword(action) {
  const data = yield call(postData, 'admin/change-password', action.payload);
  
  yield put(changePasswordAction(data));
}

function* psettingsSaga() {
  yield takeEvery('psettings/changePassword', changePassword);
}

export default psettingsSaga;
