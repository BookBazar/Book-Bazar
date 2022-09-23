import jwt_decode from "jwt-decode";

import {
  ADMIN_LOGOUT,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_STORE_REQUEST_FAIL,
  ADMIN_STORE_REQUEST_REQUEST,
  ADMIN_STORE_REQUEST_SUCCESS,
  ADMIN_SPECIFIC_STORE_FAIL,
  ADMIN_SPECIFIC_STORE_REQUEST,
  ADMIN_SPECIFIC_STORE_SUCCESS,
  ADMIN_APPROVE_STORE_REQUEST,
  ADMIN_APPROVE_STORE_SUCCESS,
  ADMIN_APPROVE_STORE_FAIL,
  ADMIN_STORE_LIST_REQUEST,
  ADMIN_STORE_LIST_SUCCESS,
  ADMIN_STORE_LIST_FAIL,
  ADMIN_SPECIFIC_STORE_LIST_REQUEST,
  ADMIN_SPECIFIC_STORE_LIST_SUCCESS,
  ADMIN_SPECIFIC_STORE_LIST_FAIL,
  ADMIN_DELETE_STORE_REQUEST,
  ADMIN_DELETE_STORE_SUCCESS,
  ADMIN_DELETE_STORE_FAIL,
} from "../constants/adminConstants";

const initialState = {
  loading: false,
  token: "",
  success: false,
  admin: "",
  storeRequestData: [],
  storeDetails: [],
  storeListData: [],
  store: [],
  errors: [],
};

const verifyToken = (token) => {
  const decodedToken = jwt_decode(token);
  const expiresIn = new Date(decodedToken.exp * 1000);
  if (new Date() > expiresIn) {
    localStorage.removeItem("ADMIN_TOKEN");
    return null;
  } else {
    return decodedToken;
  }
};

const token = localStorage.getItem("ADMIN_TOKEN");
if (token) {
  const decoded = verifyToken(token);
  if (decoded) {
    initialState.token = token;
    const { id } = decoded;
    initialState.admin = id;
  }
}
export const AdminLoginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ADMIN_LOGIN_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ADMIN_LOGIN_SUCCESS) {
    const decoded = verifyToken(payload);
    const { id } = decoded;
    return {
      ...state,
      loading: false,
      success: true,
      token: payload,
      admin: id,
      errors: [],
    };
  } else if (type === ADMIN_LOGIN_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else if (type === ADMIN_LOGOUT) {
    localStorage.removeItem("ADMIN_TOKEN");
    return { ...state, token: "", admin: "" };
  } else {
    return state;
  }
};

export const StoreRequestReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ADMIN_STORE_REQUEST_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ADMIN_STORE_REQUEST_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      storeRequestData: payload,
      errors: [],
    };
  } else if (type === ADMIN_STORE_REQUEST_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const SpecificStoreReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ADMIN_SPECIFIC_STORE_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ADMIN_SPECIFIC_STORE_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      storeDetails: payload,
      errors: [],
    };
  } else if (type === ADMIN_SPECIFIC_STORE_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const ApproveStoreReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ADMIN_APPROVE_STORE_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ADMIN_APPROVE_STORE_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      errors: [],
    };
  } else if (type === ADMIN_APPROVE_STORE_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const DeleteStoreReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ADMIN_DELETE_STORE_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ADMIN_DELETE_STORE_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      errors: [],
    };
  } else if (type === ADMIN_DELETE_STORE_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const StoreListReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ADMIN_STORE_LIST_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ADMIN_STORE_LIST_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      storeListData: payload,
      errors: [],
    };
  } else if (type === ADMIN_STORE_LIST_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const SpecificStoreListReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ADMIN_SPECIFIC_STORE_LIST_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ADMIN_SPECIFIC_STORE_LIST_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      store: payload,
      errors: [],
    };
  } else if (type === ADMIN_SPECIFIC_STORE_LIST_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};
