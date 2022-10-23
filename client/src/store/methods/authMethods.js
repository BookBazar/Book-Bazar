import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  GET_USER_INFO_FAIL,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_REQUEST,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAIL,
} from "../constants/authConstants";

export const userRegister = (info) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: USER_SIGNUP_REQUEST });
      const { data } = await axios.post("/api/user/register", info, config);
      dispatch({ type: USER_SIGNUP_SUCCESS, payload: data.token });
    } catch (error) {
      console.log(error);
      dispatch({ type: USER_SIGNUP_FAIL, payload: error.response.data.errors });
    }
  };
};

export const userLogin = (info) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const { data } = await axios.post("/api/user/login", info, config);
      localStorage.setItem("USER_TOKEN", data.token);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data.token });
    } catch (error) {
      console.log(error);
      dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.errors });
    }
  };
};

export const userInfo = () => {
  return async (dispatch, getState) => {
    const {
      LoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: GET_USER_INFO_REQUEST });
      const { data } = await axios.get("/api/user/whoami", config);
      dispatch({ type: GET_USER_INFO_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_USER_INFO_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const updateUserProfile = (info) => {
  return async (dispatch, getState) => {
    const {
      LoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: UPDATE_USER_PROFILE_REQUEST });
      await axios.put("/api/user/update-profile", info, config);
      dispatch({ type: UPDATE_USER_PROFILE_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_USER_PROFILE_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const updateUserPassword = (info) => {
  return async (dispatch, getState) => {
    const {
      LoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: UPDATE_USER_PASSWORD_REQUEST });
      await axios.put("/api/user/update-password", info, config);
      dispatch({ type: UPDATE_USER_PASSWORD_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_USER_PASSWORD_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};
