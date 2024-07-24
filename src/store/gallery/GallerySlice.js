import { createSlice } from '@reduxjs/toolkit';

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    createGalleryStatus: {},
    listGalleryStatus: {},
    deleteGalleryStatus: {},
    paramData: {},
  },
  reducers: {
    createGallery: (state, action) => {
      state.createGalleryStatus = {};
      state.paramData = action.payload;
    },
    createGalleryAction: (state, action) => {
      state.createGalleryStatus = action.payload;
    },
    deleteGallery: (state, action) => {
      state.deleteGalleryStatus = {};
      state.paramData = action.payload;
    },
    deleteGalleryAction: (state, action) => {
      state.deleteGalleryStatus = action.payload;
    },
    listGallery: (state) => {
      state.listGalleryStatus = {};
    },
    listGalleryAction: (state, action) => {
      state.listGalleryStatus = action.payload;
    },
    resetFunction: (state) => {
      state.createGalleryStatus = {};
      state.listGalleryStatus = {};
      state.deleteGalleryStatus = {};
    },
  },
});

export const {
  createGallery,
  createGalleryAction,
  deleteGallery,
  deleteGalleryAction,
  listGallery,
  listGalleryAction,
  resetFunction,
} = gallerySlice.actions;
export default gallerySlice.reducer;
