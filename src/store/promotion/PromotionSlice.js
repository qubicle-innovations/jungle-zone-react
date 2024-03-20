import { createSlice } from "@reduxjs/toolkit";

export const promotionSlice = createSlice({
  name: "promotion",
  initialState: {
    createPromotionStatus: {},
    createPromotionStatusError: {},
    promotionList: {},
    promotionListError: {},
    updatePromotionStatus: {},
    updatePromotionStatusError: {},
    deletePromotionError: {},
    deletePromotionSuccess: {},
    paramData:{},
  },
  reducers: {
    createPromotion: (state, action) => {
      state.createPromotionStatus = {};
      state.createPromotionStatusError = {};
      state.paramData=action.payload;
    },
    createPromotionSuccess: (state, action) => {
      state.createPromotionStatus = action.payload;
      state.createPromotionStatusError = {};
    },
    createPromotionError: (state, action) => {
      state.createPromotionStatusError = action.payload;
      state.createPromotionStatus = {};
    },
    updatePromotion: (state, action) => {
      state.updatePromotionStatus = {};
      state.updatePromotionStatusError = {};
      state.paramData=action.payload;
    },
    updatePromotionSuccess: (state, action) => {
      state.updatePromotionStatus = action.payload;
      state.updatePromotionStatusError = {};
    },
    updatePromotionError: (state, action) => {
      state.updatePromotionStatus = {};
      state.updatePromotionStatusError = action.payload;
    },
    deletePromotion: (state, action) => {
      state.deletePromotionError = {};
      state.deletePromotionSuccess = {};
      state.paramData=action.payload;
    },
    deletePromotionSuccess: (state, action) => {
      state.deletePromotionError = {};
      state.deletePromotionSuccess = action.payload;
    },
    deletePromotionError: (state, action) => {
      state.deletePromotionError = action.payload;
      state.deletePromotionSuccess = {};
    },
    listPromotion: (state) => {
      state.promotionList = {};
    },
    listPromotionSuccess: (state, action) => {
      state.promotionList = action.payload;
      state.promotionError = {};
    },
    listPromotionError: (state, action) => {
      state.promotionError = action.payload;
      state.promotionList = {};
    },
    resetFunction: (state) => {
      state.createPromotionStatus = {};
      state.createPromotionStatusError = {};
      state.promotionList = {};
      state.promotionListError = {};
      state.updatePromotionStatus = {};
      state.updatePromotionStatusError = {};
      state.deletePromotionError = {};
      state.deletePromotionSuccess = {};
      state.promotionByVendorList = {};
      state.promotionByVendorError = {};
    },
  },
});

export const {
  createPromotion,
  createPromotionSuccess,
  createPromotionError,
  updatePromotion,
  updatePromotionSuccess,
  updatePromotionError,
  deletePromotion,
  deletePromotionSuccess,
  deletePromotionError,
  listPromotion,
  listPromotionSuccess,
  listPromotionError,
  resetFunction,
} = promotionSlice.actions;
export default promotionSlice.reducer;
