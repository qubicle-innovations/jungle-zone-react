import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

export const authSlice = createSlice({
  name: 'login',
  initialState: {
    logData: {},
    error: {},
    isLoading: false,
    paramData: {},
  },
  reducers: {
    getLoginFetch: (state, action) => {
      state.isLoading = true;
      state.logData = {};
      state.error = {};
      state.paramData = action.payload;
    },
    getLoginSuccess: (state, action) => {
      state.isLoading = false;
      state.logData = action.payload;
    },
    getLoginError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    userLogout: (state) => {
      state.isLoading = false;
      state.logData = {};
      state.error = {};
      storage.removeItem('persist:root');
    },
    resetData: (state) => {
      state.logData = {};
      state.error = {};
    },
  },
});

export const { getLoginFetch, getLoginSuccess, getLoginError, userLogout, resetData } =
  authSlice.actions;
export default authSlice.reducer;
