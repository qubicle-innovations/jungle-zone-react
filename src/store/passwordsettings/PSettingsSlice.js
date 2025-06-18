import { createSlice } from '@reduxjs/toolkit';

export const psettingsSlice = createSlice({
  name: 'psettings',
  initialState: {
    isLoading: false,
    paramData: {},
    changePasswordSuccess : {},
    changePasswordError: {}
  },
  reducers: {
    changePassword: (state, action) => {
      state.isLoading = true;
      state.changePasswordSuccess = {};
      state.paramData = action.payload;
    },
    changePasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.changePasswordSuccess = action.payload;
      state.changePasswordError = {};
    },
    changePasswordError: (state, action) => {
      state.isLoading = false;
      state.changePasswordSuccess = {};
      state.changePasswordError = action.payload;
    },
    resetData: (state) => {
      state.changePasswordSuccess = {};
      state.changePasswordError = {};
    },
  },
});

export const { changePassword, changePasswordSuccess, changePasswordError, resetData } =
  psettingsSlice.actions;

export default psettingsSlice.reducer;
