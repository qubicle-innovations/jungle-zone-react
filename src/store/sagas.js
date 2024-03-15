import { all, fork } from "redux-saga/effects";
import AuthSaga from "./auth/AuthSaga";

export default function* rootSaga() {
  yield all([
    //public
    fork(AuthSaga),
  ]);
}
