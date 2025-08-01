import { createSlice } from '@reduxjs/toolkit';

export const psettingsSlice = createSlice({
  name: 'psettings',
  initialState: {
    isLoading: false,
    paramData: {},
    changePasswordStatus : {},
  },
  reducers: {
    changePassword: (state, action) => {
      state.isLoading = true;
      state.changePasswordStatus = {};
      state.paramData = action.payload;
    },
    changePasswordAction: (state, action) => {
      state.isLoading = false;
      state.changePasswordStatus = action.payload;
    },
    resetData: (state) => {
      state.changePasswordStatus = {};
    },
  },
});

export const { changePassword, changePasswordAction, resetData } =
  psettingsSlice.actions;

export default psettingsSlice.reducer;
