import { createSlice } from "@reduxjs/toolkit";

export const promotionSlice = createSlice({
  name: "promotion",
  initialState: {
    createPromotionStatus: {},
    listPromotionStatus: {},
    updatePromotionStatus: {},
    deletePromotionStatus: {},
    paramData:{},
  },
  reducers: {
    createPromotion: (state, action) => {
      state.createPromotionStatus = {};
      state.paramData=action.payload;
    },
    createPromotionAction: (state, action) => {
      state.createPromotionStatus = action.payload;
    },
    updatePromotion: (state, action) => {
      state.updatePromotionStatus = {};
      state.paramData=action.payload;
    },
    updatePromotionAction: (state, action) => {
      state.updatePromotionStatus = action.payload;
    },
    deletePromotion: (state, action) => {
      state.deletePromotionStatus = {};
      state.paramData=action.payload;
    },
    deletePromotionAction: (state, action) => {
      state.deletePromotionStatus = action.payload;
    },
    listPromotion: (state) => {
      state.listPromotionStatus = {};
    },
    listPromotionAction: (state, action) => {
      state.listPromotionStatus = action.payload;
    },
    resetFunction: (state) => {
      state.createPromotionStatus = {};
      state.listPromotionStatus = {};
      state.updatePromotionStatus = {};
      state.deletePromotionStatus = {};
    },
  },
});

export const {
  createPromotion,
  createPromotionAction,
  updatePromotion,
  updatePromotionAction,
  deletePromotion,
  deletePromotionAction,
  listPromotion,
  listPromotionAction,
  resetFunction,
} = promotionSlice.actions;
export default promotionSlice.reducer;
