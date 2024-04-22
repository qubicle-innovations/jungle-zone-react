import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    createCategoryStatus: {},
    listCategoryStatus: {},
    updateCategoryStatus: {},
    deleteCategoryStatus: {},
    paramData: {},
  },
  reducers: {
    createCategory: (state, action) => {
      state.createCategoryStatus = {};
      state.paramData = action.payload;
    },
    createCategoryAction: (state, action) => {
      state.createCategoryStatus = action.payload;
    },
    updateCategory: (state, action) => {
      state.updateCategoryStatus = {};
      state.paramData = action.payload;
    },
    updateCategoryAction: (state, action) => {
      state.updateCategoryStatus = action.payload;
    },
    deleteCategory: (state, action) => {
      state.deleteCategoryStatus = {};
      state.paramData = action.payload;
    },
    deleteCategoryAction: (state, action) => {
      state.deleteCategoryStatus = action.payload;
    },
    listCategory: (state) => {
      state.listCategoryStatus = {};
    },
    listCategoryAction: (state, action) => {
      state.listCategoryStatus = action.payload;
    },
    resetFunction: (state) => {
      state.createCategoryStatus = {};
      state.listCategoryStatus = {};
      state.updateCategoryStatus = {};
      state.deleteCategoryStatus = {};
    },
  },
});

export const {
  createCategory,
  createCategoryAction,
  updateCategory,
  updateCategoryAction,
  deleteCategory,
  deleteCategoryAction,
  listCategory,
  listCategoryAction,
  resetFunction,
} = categorySlice.actions;
export default categorySlice.reducer;
