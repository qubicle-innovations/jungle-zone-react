import { createSlice } from "@reduxjs/toolkit";

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    createGalleryStatus: {},
    listGalleryStatus: {},
    updateGalleryStatus: {},
    deleteGalleryStatus: {},
    paramData:{},
  },
  reducers: {
    createGallery: (state, action) => {
      state.createGalleryStatus = {};
      state.paramData=action.payload;
    },
    createGalleryAction: (state, action) => {
      state.createGalleryStatus = action.payload;
    },
    updateGallery: (state, action) => {
      state.updateGalleryStatus = {};
      state.paramData=action.payload;
    },
    updateGalleryAction: (state, action) => {
      state.updateGalleryStatus = action.payload;
    },
    deleteGallery: (state, action) => {
      state.deleteGalleryStatus = {};
      state.paramData=action.payload;
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
      state.updateGalleryStatus = {};
      state.deleteGalleryStatus = {};
    },
  },
});

export const {
  createGallery,
  createGalleryAction,
  updateGallery,
  updateGalleryAction,
  deleteGallery,
  deleteGalleryAction,
  listGallery,
  listGalleryAction,
  resetFunction,
} = gallerySlice.actions;
export default gallerySlice.reducer;
