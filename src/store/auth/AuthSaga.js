import { call, put, takeEvery } from 'redux-saga/effects';
import { loginData } from '../../service/Service';
import { getLoginSuccess, getLoginError } from './AuthSlice';
// import axios from "axios";

function* fetchLoginData({ payload }) {
  const { values, navigate } = payload;
  const data = yield call(loginData, 'admin/login', values);
  if (data.msg === 'success') {
    yield put(getLoginSuccess(data.response));
    navigate('/home');
  } else {
    yield put(getLoginError(data.response));
  }
}

function* authSaga() {
  yield takeEvery('login/getLoginFetch', fetchLoginData);
}

export default authSaga;
