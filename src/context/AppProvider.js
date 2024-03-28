// AppProvider.js

import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// Define context
const DispatchContext = createContext();
const StateContext = createContext();

// Initial state
const initialState = {
  couponEditData: {},
  promotionEditData: {},
  attractionEditData: {},
  subadminEditData: {},
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'coupon_edit':
      return { ...state, couponEditData: action.payload };
    case 'promotion_edit':
      return { ...state, promotionEditData: action.payload };
    case 'attraction_edit':
      return { ...state, attractionEditData: action.payload };
    case 'subadmin_edit':
      return { ...state, subadminEditData: action.payload };
    default:
      return state;
  }
};

// AppProvider component
const AppProvider = ({ children }) => {
  // Destructuring state from useReducer if you want to avoid the warning
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppProvider, DispatchContext, StateContext };
