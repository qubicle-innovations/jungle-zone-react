import { createSlice } from '@reduxjs/toolkit';

export const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    getDashboardCounts: {},
    dashboardCountAction: {},
  },
  reducers: {
    dashboardCounts: (state) => {
      state.getDashboardCounts = {};
    },
    dashboardCountAction: (state, action) => {
      state.dashboardCountAction = action.payload;
    },
    resetFunction: (state) => {
      state.getDashboardCounts = {};
      state.dashboardCountAction = {};
    },
  },
});

export const { dashboardCounts, dashboardCountAction, resetFunction } = DashboardSlice.actions;
export default DashboardSlice.reducer;
