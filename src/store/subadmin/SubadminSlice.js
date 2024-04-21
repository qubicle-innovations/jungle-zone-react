import { createSlice } from '@reduxjs/toolkit';

export const subadminSlice = createSlice({
  name: 'subadmin',
  initialState: {
    createSubadminStatus: {},
    listSubadminStatus: {},
    updateSubadminStatus: {},
    deleteSubadminStatus: {},
    paramData: {},
  },
  reducers: {
    createSubadmin: (state, action) => {
      state.createSubadminStatus = {};
      state.paramData = action.payload;
    },
    createSubadminAction: (state, action) => {
      state.createSubadminStatus = action.payload;
    },
    updateSubadmin: (state, action) => {
      state.updateSubadminStatus = {};
      state.paramData = action.payload;
    },
    updateSubadminAction: (state, action) => {
      state.updateSubadminStatus = action.payload;
    },
    deleteSubadmin: (state, action) => {
      state.deleteSubadminStatus = {};
      state.paramData = action.payload;
    },
    deleteSubadminAction: (state, action) => {
      state.deleteSubadminStatus = action.payload;
    },
    listSubadmin: (state) => {
      state.listSubadminStatus = {};
    },
    listSubadminAction: (state, action) => {
      state.listSubadminStatus = action.payload;
    },
    resetFunction: (state) => {
      state.createSubadminStatus = {};
      state.listSubadminStatus = {};
      state.updateSubadminStatus = {};
      state.deleteSubadminStatus = {};
    },
  },
});

export const {
  createSubadmin,
  createSubadminAction,
  updateSubadmin,
  updateSubadminAction,
  deleteSubadmin,
  deleteSubadminAction,
  listSubadmin,
  listSubadminAction,
  resetFunction,
} = subadminSlice.actions;
export default subadminSlice.reducer;
