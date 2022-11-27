import {
  APPROVE_ORDER_FAIL,
  APPROVE_ORDER_REQUEST,
  APPROVE_ORDER_SUCCESS,
  APPROVE_PRINTING_ORDER_FAIL,
  APPROVE_PRINTING_ORDER_REQUEST,
  APPROVE_PRINTING_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_PRINTING_ORDER_FAIL,
  CANCEL_PRINTING_ORDER_REQUEST,
  CANCEL_PRINTING_ORDER_SUCCESS,
  COMPLETE_ORDER_FAIL,
  COMPLETE_ORDER_REQUEST,
  COMPLETE_ORDER_SUCCESS,
  COMPLETE_PRINTING_ORDER_FAIL,
  COMPLETE_PRINTING_ORDER_REQUEST,
  COMPLETE_PRINTING_ORDER_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDER_FAIL,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_PRINTING_ORDERS_FAIL,
  FETCH_PRINTING_ORDERS_REQUEST,
  FETCH_PRINTING_ORDERS_SUCCESS,
  FETCH_PRINTING_ORDER_FAIL,
  FETCH_PRINTING_ORDER_REQUEST,
  FETCH_PRINTING_ORDER_SUCCESS,
  FETCH_SPECIFIC_STORE_ORDERS_FAIL,
  FETCH_SPECIFIC_STORE_ORDERS_REQUEST,
  FETCH_SPECIFIC_STORE_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_FAIL,
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  PRINTING_ORDER_CREATE_FAIL,
  PRINTING_ORDER_CREATE_REQUEST,
  PRINTING_ORDER_CREATE_RESET,
  PRINTING_ORDER_CREATE_SUCCESS,
  PRINTING_PRESS_ORDER_FAIL,
  PRINTING_PRESS_ORDER_REQUEST,
  PRINTING_PRESS_ORDER_SUCCESS,
} from "../constants/orderConstants";

const initialState = {
  loading: false,
  success: false,
  order: [],
  orders: [],
  specificStoreOrders: [],
  userOrders: [],
  printingItems: {},
  printingOrder: [],
  printingOrders: [],
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

export const PrintingCreateOrderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === PRINTING_ORDER_CREATE_REQUEST) {
    return { ...state, loading: true };
  } else if (type === PRINTING_ORDER_CREATE_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      order: payload,
      errors: [],
    };
  } else if (PRINTING_ORDER_CREATE_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else if (type === PRINTING_ORDER_CREATE_RESET) {
    return {
      ...state,
      loading: false,
      success: false,
      printingOrder: [],
      errors: [],
    };
  } else {
    return state;
  }
};

export const FetchOrdersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === FETCH_ORDERS_REQUEST) {
    return { ...state, loading: true };
  } else if (type === FETCH_ORDERS_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      orders: payload,
      errors: [],
    };
  } else if (FETCH_ORDERS_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const FetchPrintingOrdersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === FETCH_PRINTING_ORDERS_REQUEST) {
    return { ...state, loading: true };
  } else if (type === FETCH_PRINTING_ORDERS_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      printingOrders: payload,
      errors: [],
    };
  } else if (FETCH_PRINTING_ORDERS_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const FetchOrderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === FETCH_ORDER_REQUEST) {
    return { ...state, loading: true };
  } else if (type === FETCH_ORDER_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      order: payload,
      errors: [],
    };
  } else if (FETCH_ORDER_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const FetchPrintingOrderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === FETCH_PRINTING_ORDER_REQUEST) {
    return { ...state, loading: true };
  } else if (type === FETCH_PRINTING_ORDER_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      printingOrder: payload,
      errors: [],
    };
  } else if (FETCH_PRINTING_ORDER_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const ApproveOrderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === APPROVE_ORDER_REQUEST) {
    return { ...state, loading: true };
  } else if (type === APPROVE_ORDER_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      errors: [],
    };
  } else if (APPROVE_ORDER_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const ApprovePrintingOrderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === APPROVE_PRINTING_ORDER_REQUEST) {
    return { ...state, loading: true };
  } else if (type === APPROVE_PRINTING_ORDER_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      errors: [],
    };
  } else if (APPROVE_PRINTING_ORDER_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const CancelOrderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === CANCEL_ORDER_REQUEST) {
    return { ...state, loading: true };
  } else if (type === CANCEL_ORDER_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      errors: [],
    };
  } else if (CANCEL_ORDER_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const CancelPrintingOrderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === CANCEL_PRINTING_ORDER_REQUEST) {
    return { ...state, loading: true };
  } else if (type === CANCEL_PRINTING_ORDER_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      errors: [],
    };
  } else if (CANCEL_PRINTING_ORDER_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const CompleteOrderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === COMPLETE_ORDER_REQUEST) {
    return { ...state, loading: true };
  } else if (type === COMPLETE_ORDER_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      errors: [],
    };
  } else if (COMPLETE_ORDER_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const CompletePrintingOrderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === COMPLETE_PRINTING_ORDER_REQUEST) {
    return { ...state, loading: true };
  } else if (type === COMPLETE_PRINTING_ORDER_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      errors: [],
    };
  } else if (COMPLETE_PRINTING_ORDER_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const FetchUserOrdersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === FETCH_USER_ORDERS_REQUEST) {
    return { ...state, loading: true };
  } else if (type === FETCH_USER_ORDERS_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      userOrders: payload,
      errors: [],
    };
  } else if (FETCH_USER_ORDERS_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const FetchSpecificStoreOrdersReducer = (
  state = initialState,
  action
) => {
  const { type, payload } = action;
  if (type === FETCH_SPECIFIC_STORE_ORDERS_REQUEST) {
    return { ...state, loading: true };
  } else if (type === FETCH_SPECIFIC_STORE_ORDERS_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      specificStoreOrders: payload,
      errors: [],
    };
  } else if (FETCH_SPECIFIC_STORE_ORDERS_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const PrintingPressReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === PRINTING_PRESS_ORDER_REQUEST) {
    return { ...state, loading: true };
  } else if (type === PRINTING_PRESS_ORDER_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      printingItems: payload,
      errors: [],
    };
  } else if (PRINTING_PRESS_ORDER_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};
