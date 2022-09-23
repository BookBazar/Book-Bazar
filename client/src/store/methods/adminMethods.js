import axios from "axios";
import {
  ADMIN_APPROVE_STORE_FAIL,
  ADMIN_APPROVE_STORE_REQUEST,
  ADMIN_APPROVE_STORE_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_SPECIFIC_STORE_FAIL,
  ADMIN_SPECIFIC_STORE_REQUEST,
  ADMIN_SPECIFIC_STORE_SUCCESS,
  ADMIN_STORE_LIST_FAIL,
  ADMIN_STORE_LIST_REQUEST,
  ADMIN_STORE_LIST_SUCCESS,
  ADMIN_STORE_REQUEST_FAIL,
  ADMIN_STORE_REQUEST_REQUEST,
  ADMIN_STORE_REQUEST_SUCCESS,
  ADMIN_SPECIFIC_STORE_LIST_REQUEST,
  ADMIN_SPECIFIC_STORE_LIST_SUCCESS,
  ADMIN_SPECIFIC_STORE_LIST_FAIL,
  ADMIN_DELETE_STORE_REQUEST,
  ADMIN_DELETE_STORE_SUCCESS,
  ADMIN_DELETE_STORE_FAIL,
} from "../constants/adminConstants";

export const adminLogin = (info) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: ADMIN_LOGIN_REQUEST });
      const { data } = await axios.post("/api/admin/login", info, config);
      localStorage.setItem("ADMIN_TOKEN", data.token);
      dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data.token });
    } catch (error) {
      console.log(error);
      dispatch({ type: ADMIN_LOGIN_FAIL, payload: error.response.data.errors });
    }
  };
};

export const storeRequest = () => {
  return async (dispatch, getState) => {
    const {
      AdminLoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: ADMIN_STORE_REQUEST_REQUEST });
      const { data } = await axios.get("/api/admin/store-request", config);
      dispatch({
        type: ADMIN_STORE_REQUEST_SUCCESS,
        payload: data.storeRequests,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADMIN_STORE_REQUEST_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const specificStoreRequest = (id) => {
  return async (dispatch, getState) => {
    const {
      AdminLoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: ADMIN_SPECIFIC_STORE_REQUEST });
      const { data } = await axios.get(
        `/api/admin/specific-store-request/${id}`,
        config
      );
      dispatch({
        type: ADMIN_SPECIFIC_STORE_SUCCESS,
        payload: data.storeRequest,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADMIN_SPECIFIC_STORE_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const approveStore = (user) => {
  return async (dispatch, getState) => {
    const {
      AdminLoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: ADMIN_APPROVE_STORE_REQUEST });
      await axios.put(`/api/admin/approve-request/${user}`, config);
      dispatch({
        type: ADMIN_APPROVE_STORE_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADMIN_APPROVE_STORE_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const deleteStore = (id) => {
  return async (dispatch, getState) => {
    const {
      AdminLoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: ADMIN_DELETE_STORE_REQUEST });
      await axios.delete(`/api/admin/delete-request/${id}`, config);
      dispatch({
        type: ADMIN_DELETE_STORE_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADMIN_DELETE_STORE_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const storeList = () => {
  return async (dispatch, getState) => {
    const {
      AdminLoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: ADMIN_STORE_LIST_REQUEST });
      const { data } = await axios.get("/api/admin/store-list", config);
      dispatch({
        type: ADMIN_STORE_LIST_SUCCESS,
        payload: data.storeList,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADMIN_STORE_LIST_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const specificStoreList = (id) => {
  return async (dispatch, getState) => {
    const {
      AdminLoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: ADMIN_SPECIFIC_STORE_LIST_REQUEST });
      const { data } = await axios.get(
        `/api/admin/specific-store-list/${id}`,
        config
      );
      dispatch({
        type: ADMIN_SPECIFIC_STORE_LIST_SUCCESS,
        payload: data.store,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADMIN_SPECIFIC_STORE_LIST_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};
