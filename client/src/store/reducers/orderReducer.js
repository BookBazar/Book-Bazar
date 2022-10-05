import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
} from "../constants/orderConstants";

const initialState = {
  loading: false,
  success: false,
  order: [],
  orders: [],
  errors: [],
};

export const CreateOrderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ORDER_CREATE_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ORDER_CREATE_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      order: payload,
      errors: [],
    };
  } else if (ORDER_CREATE_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else if (type === ORDER_CREATE_RESET) {
    return {
      ...state,
      loading: false,
      success: false,
      order: [],
      errors: [],
    };
  } else {
    return state;
  }
};
