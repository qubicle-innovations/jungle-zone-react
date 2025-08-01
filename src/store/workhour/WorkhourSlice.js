import { createSlice } from "@reduxjs/toolkit";

export const workhourSlice = createSlice({
  name: "workhour",
  initialState: {
    createWorkHourStatus: {},
    listWorkHourStatus: {},
    updateWorkHourStatus: {},
    paramData:{},
  },
  reducers: {
    createWorkHour: (state, action) => {
      state.createWorkHourStatus = {};
      state.paramData=action.payload;
    },
    createWorkHourAction: (state, action) => {
      state.createWorkHourStatus = action.payload;
    },
    updateWorkHour: (state, action) => {
      state.updateWorkHourStatus = {};
      state.paramData=action.payload;
    },
    updateWorkHourAction: (state, action) => {
      state.updateWorkHourStatus = action.payload;
    },
    listWorkHour: (state) => {
    console.log('slice');
      state.listWorkHourStatus = {};
    },
    listWorkHourAction: (state, action) => {
      state.listWorkHourStatus = action.payload;
    },
    resetFunction: (state) => {
      state.createWorkHourStatus = {};
      state.listWorkHourStatus = {};
      state.updateWorkHourStatus = {};
    },
  },
});

export const {
  createWorkHour,
  createWorkHourAction,
  updateWorkHour,
  updateWorkHourAction,
  listWorkHour,
  listWorkHourAction,
  resetFunction,
} = workhourSlice.actions;
export default workhourSlice.reducer;
