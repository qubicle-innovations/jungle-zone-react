import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchData, postData, deleteData } from '../../service/Service';
import {
  createGalleryAction,
  updateGalleryAction,
  deleteGalleryAction,
  listGalleryAction,
} from './GallerySlice';

function* createGallery(action) {
  const data = yield call(postData, 'admin/upload', action.payload);
  yield put(createGalleryAction(data));
}

function* updateGallery(action) {
  const galleryId = action.payload?.galleryId;
  const data = yield call(postData, `admin/upload/${galleryId}`, action.payload?.data);
  yield put(updateGalleryAction(data));
}

function* deleteGallery(action) {
  const galleryId = action.payload;
  const data = yield call(deleteData, `admin/gallery/${galleryId}`);
  yield put(deleteGalleryAction(data));
}

function* listGallery() {
  const data = yield call(fetchData, 'admin/gallery');
  yield put(listGalleryAction(data));
}

function* gallerySaga() {
  yield takeEvery('gallery/createGallery', createGallery);
  yield takeLatest('gallery/listGallery', listGallery);
  yield takeEvery('gallery/updateGallery', updateGallery);
  yield takeEvery('gallery/deleteGallery', deleteGallery);
}

export default gallerySaga;
