import { createSlice } from "@reduxjs/toolkit";

export const attractionSlice = createSlice({
  name: "attraction",
  initialState: {
    createAttractionStatus: {},
    listAttractionStatus: {},
    updateAttractionStatus: {},
    deleteAttractionStatus: {},
    paramData:{},
  },
  reducers: {
    createAttraction: (state, action) => {
      state.createAttractionStatus = {};
      state.paramData=action.payload;
    },
    createAttractionAction: (state, action) => {
      state.createAttractionStatus = action.payload;
    },
    updateAttraction: (state, action) => {
      state.updateAttractionStatus = {};
      state.paramData=action.payload;
    },
    updateAttractionAction: (state, action) => {
      state.updateAttractionStatus = action.payload;
    },
    deleteAttraction: (state, action) => {
      state.deleteAttractionStatus = {};
      state.paramData=action.payload;
    },
    deleteAttractionAction: (state, action) => {
      state.deleteAttractionStatus = action.payload;
    },
    listAttraction: (state) => {
      state.listAttractionStatus = {};
    },
    listAttractionAction: (state, action) => {
      state.listAttractionStatus = action.payload;
    },
    resetFunction: (state) => {
      state.createAttractionStatus = {};
      state.listAttractionStatus = {};
      state.updateAttractionStatus = {};
      state.deleteAttractionStatus = {};
    },
  },
});

export const {
  createAttraction,
  createAttractionAction,
  updateAttraction,
  updateAttractionAction,
  deleteAttraction,
  deleteAttractionAction,
  listAttraction,
  listAttractionAction,
  resetFunction,
} = attractionSlice.actions;
export default attractionSlice.reducer;
