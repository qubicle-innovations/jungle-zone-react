import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchData, postData, deleteData } from '../../service/Service';
import {
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
  listCategoryAction,
  listSubcategoryAction,
} from './CategorySlice';

function* createCategory(action) {
  const data = yield call(postData, 'admin/category', action.payload);
  yield put(createCategoryAction(data));
}

function* updateCategory(action) {
  const categoryId = action.payload?.categoryId;
  const data = yield call(postData, `admin/category/${categoryId}`, action.payload?.data);
  yield put(updateCategoryAction(data));
}

function* deleteCategory(action) {
  const categoryId = action.payload;
  const data = yield call(deleteData, `admin/category/${categoryId}`);
  yield put(deleteCategoryAction(data));
}

function* listCategory() {
  const data = yield call(fetchData, 'admin/category');
  yield put(listCategoryAction(data));
}

function* listSubcategory(action) {
  const categoryId = action.payload?.categoryId;
  const data = yield call(fetchData, `admin/category?category_id=${categoryId}`);
  yield put(listSubcategoryAction(data));
}

function* categorySaga() {
  yield takeEvery('category/createCategory', createCategory);
  yield takeLatest('category/listCategory', listCategory);
  yield takeLatest('category/listSubcategory', listSubcategory);
  yield takeEvery('category/updateCategory', updateCategory);
  yield takeEvery('category/deleteCategory', deleteCategory);
}

export default categorySaga;
