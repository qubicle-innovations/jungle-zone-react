import { call, put, takeEvery } from 'redux-saga/effects';
import CryptoJS from 'crypto-js';
import loginData from '../../service/AuthService';
import { getLoginSuccess, getLoginError } from './AuthSlice';

function* fetchLoginData({ payload }) {
  const { values, navigate } = payload;
  const data = yield call(loginData, 'admin/login', values);
  if (data.msg === 'success' && data.result.success === true) {
    const secretPass = 'j123@nglez678$one';
    const token = CryptoJS.AES.encrypt(
      JSON.stringify(data.result.response.user.token),
      secretPass,
    ).toString();
    localStorage.setItem('token', token);
    yield put(getLoginSuccess(data.result.response.user));
    navigate('/home');
  } else {
    yield put(getLoginError(data));
  }
}

function* authSaga() {
  yield takeEvery('login/getLoginFetch', fetchLoginData);
}

export default authSaga;
