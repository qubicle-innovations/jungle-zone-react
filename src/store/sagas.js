import { all, fork } from 'redux-saga/effects';
import AuthSaga from './auth/AuthSaga';
import CouponSaga from './coupon/CouponSaga';
import PromotionSaga from './promotion/PromotionSaga';
import SubadminSaga from './subadmin/SubadminSaga';
import CategorySaga from './category/CategorySaga';
import AttractionSaga from './attraction/AttractionSaga';
import GallerySaga from './gallery/GallerySaga';
import Psettings from './passwordsettings/PSettingsSaga';
import DashboardSaga from './dashboard/DashboardSaga';
import WorkhourSaga from './workhour/WorkhourSaga';

export default function* rootSaga() {
  yield all([
    //public
    fork(AuthSaga),
    CouponSaga(),
    PromotionSaga(),
    SubadminSaga(),
    CategorySaga(),
    AttractionSaga(),
    GallerySaga(),
    Psettings(),
    DashboardSaga(),
    WorkhourSaga(),
  ]);
}
