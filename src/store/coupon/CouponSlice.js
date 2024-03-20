import { createSlice } from "@reduxjs/toolkit";

export const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    createCouponStatus: {},
    listCouponStatus: {},
    updateCouponStatus: {},
    deleteCouponStatus: {},
    paramData:{},
  },
  reducers: {
    createCoupon: (state, action) => {
      state.createCouponStatus = {};
      state.paramData=action.payload;
    },
    createCouponAction: (state, action) => {
      state.createCouponStatus = action.payload;
    },
    updateCoupon: (state, action) => {
      state.updateCouponStatus = {};
      state.paramData=action.payload;
    },
    updateCouponAction: (state, action) => {
      state.updateCouponStatus = action.payload;
    },
    deleteCoupon: (state, action) => {
      state.deleteCouponStatus = {};
      state.paramData=action.payload;
    },
    deleteCouponAction: (state, action) => {
      state.deleteCouponStatus = action.payload;
    },
    listCoupon: (state) => {
      state.listCouponStatus = {};
    },
    listCouponAction: (state, action) => {
      state.listCouponStatus = action.payload;
    },
    resetFunction: (state) => {
      state.createCouponStatus = {};
      state.listCouponStatus = {};
      state.updateCouponStatus = {};
      state.deleteCouponStatus = {};
    },
  },
});

export const {
  createCoupon,
  createCouponAction,
  updateCoupon,
  updateCouponAction,
  deleteCoupon,
  deleteCouponAction,
  listCoupon,
  listCouponAction,
  resetFunction,
} = couponSlice.actions;
export default couponSlice.reducer;
