import jwt_decode from "jwt-decode";

import {
  GET_USER_INFO_FAIL,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  UPDATE_USER_PASSWORD_FAIL,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/authConstants";

const initialState = {
  loading: false,
  token: "",
  success: false,
  user: "",
  email: "",
  errors: [],
  username: "",
  isSeller: false,
};

const verifyToken = (token) => {
  const decodedToken = jwt_decode(token);
  const expiresIn = new Date(decodedToken.exp * 1000);
  if (new Date() > expiresIn) {
    localStorage.removeItem("USER_TOKEN");
    return null;
  } else {
    return decodedToken;
  }
};

const token = localStorage.getItem("USER_TOKEN");
if (token) {
  const decoded = verifyToken(token);
  if (decoded) {
    initialState.token = token;
    const { id } = decoded;
    initialState.user = id;
  }
}

export const SignupReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === USER_SIGNUP_REQUEST) {
    return { ...state, loading: true };
  } else if (type === USER_SIGNUP_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      errors: [],
    };
  } else if (type === USER_SIGNUP_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else if (type === USER_LOGOUT) {
    localStorage.removeItem("USER_TOKEN");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("shippingAddress");
    return { ...state, token: "", user: "", username: "" };
  } else {
    return state;
  }
};

export const LoginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === USER_LOGIN_REQUEST) {
    return { ...state, loading: true };
  } else if (type === USER_LOGIN_SUCCESS) {
    const decoded = verifyToken(payload);
    const { id } = decoded;
    return {
      ...state,
      loading: false,
      success: true,
      token: payload,
      user: id,
      errors: [],
    };
  } else if (type === USER_LOGIN_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else if (type === USER_LOGOUT) {
    localStorage.removeItem("USER_TOKEN");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("shippingAddress");
    return { ...state, token: "", user: "", username: "" };
  } else {
    return state;
  }
};

export const UserInfoReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === GET_USER_INFO_REQUEST) {
    return { ...state, loading: true };
  } else if (type === GET_USER_INFO_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      isSeller: payload.isSeller,
      username: payload.username,
      email: payload.email,
    };
  } else if (type === GET_USER_INFO_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const UpdateUserProfileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === UPDATE_USER_PROFILE_REQUEST) {
    return { ...state, loading: true };
  } else if (type === UPDATE_USER_PROFILE_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
    };
  } else if (type === UPDATE_USER_PROFILE_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const UpdateUserPasswordReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === UPDATE_USER_PASSWORD_REQUEST) {
    return { ...state, loading: true };
  } else if (type === UPDATE_USER_PASSWORD_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
    };
  } else if (type === UPDATE_USER_PASSWORD_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};
