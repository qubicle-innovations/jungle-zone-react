import { call, put, takeEvery } from 'redux-saga/effects';
import { postData } from '../../service/Service';
import {
    changePasswordSuccess,
    changePasswordError,
} from './PSettingsSlice';

function* changePassword(action) {
    const data = yield call(postData, 'admin/change-password', action.payload);
    if (data.msg === "success") {
      yield put(changePasswordSuccess(data.response));
    } else {
      yield put(changePasswordError(data.response));
    }
  }

function* psettingsSaga() {
  yield takeEvery('psettings/changePassword', changePassword);
}

export default psettingsSaga;
