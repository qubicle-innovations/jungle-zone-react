import { createSlice } from "@reduxjs/toolkit";

export const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    createCouponStatus: {},
    createCouponStatusError: {},
    couponList: {},
    couponListError: {},
    updateCouponStatus: {},
    updateCouponStatusError: {},
    deleteCouponError: {},
    deleteCouponSuccess: {},
    paramData:{},
  },
  reducers: {
    createCoupon: (state, action) => {
      state.createCouponStatus = {};
      state.createCouponStatusError = {};
      state.paramData=action.payload;
    },
    createCouponSuccess: (state, action) => {
      state.createCouponStatus = action.payload;
      state.createCouponStatusError = {};
    },
    createCouponError: (state, action) => {
      state.createCouponStatusError = action.payload;
      state.createCouponStatus = {};
    },
    updateCoupon: (state, action) => {
      state.updateCouponStatus = {};
      state.updateCouponStatusError = {};
      state.paramData=action.payload;
    },
    updateCouponSuccess: (state, action) => {
      state.updateCouponStatus = action.payload;
      state.updateCouponStatusError = {};
    },
    updateCouponError: (state, action) => {
      state.updateCouponStatus = {};
      state.updateCouponStatusError = action.payload;
    },
    deleteCoupon: (state, action) => {
      state.deleteCouponError = {};
      state.deleteCouponSuccess = {};
      state.paramData=action.payload;
    },
    deleteCouponSuccess: (state, action) => {
      state.deleteCouponError = {};
      state.deleteCouponSuccess = action.payload;
    },
    deleteCouponError: (state, action) => {
      state.deleteCouponError = action.payload;
      state.deleteCouponSuccess = {};
    },
    listCoupon: (state) => {
      state.couponList = {};
    },
    listCouponSuccess: (state, action) => {
      state.couponList = action.payload;
      state.couponError = {};
    },
    listCouponError: (state, action) => {
      state.couponError = action.payload;
      state.couponList = {};
    },
    resetFunction: (state) => {
      state.createCouponStatus = {};
      state.createCouponStatusError = {};
      state.couponList = {};
      state.couponListError = {};
      state.updateCouponStatus = {};
      state.updateCouponStatusError = {};
      state.deleteCouponError = {};
      state.deleteCouponSuccess = {};
      state.couponByVendorList = {};
      state.couponByVendorError = {};
    },
  },
});

export const {
  createCoupon,
  createCouponSuccess,
  createCouponError,
  updateCoupon,
  updateCouponSuccess,
  updateCouponError,
  deleteCoupon,
  deleteCouponSuccess,
  deleteCouponError,
  listCoupon,
  listCouponSuccess,
  listCouponError,
  resetFunction,
} = couponSlice.actions;
export default couponSlice.reducer;
