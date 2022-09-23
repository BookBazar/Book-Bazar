import axios from "axios";

import {
  CREATE_STORE_FAIL,
  CREATE_STORE_SUCCESS,
  CREATE_STORE_REQUEST,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  FETCH_STORE_REQUEST,
  FETCH_STORE_SUCCESS,
  FETCH_STORE_FAIL,
  UPDATE_STORE_REQUEST,
  UPDATE_STORE_SUCCESS,
  UPDATE_STORE_FAIL,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../constants/sellerConstants";

export const createStore = (info) => {
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
      dispatch({ type: CREATE_STORE_REQUEST });
      const { data } = await axios.post(
        "/api/seller/create-store",
        info,
        config
      );
      dispatch({ type: CREATE_STORE_SUCCESS, payload: data.newStore });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CREATE_STORE_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const createProduct = (info) => {
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
      dispatch({ type: CREATE_PRODUCT_REQUEST });
      const { data } = await axios.post(
        "/api/seller/create-product",
        info,
        config
      );
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.newProduct });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CREATE_PRODUCT_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const getStore = () => {
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
      dispatch({ type: FETCH_STORE_REQUEST });
      const { data } = await axios.get("/api/seller/get-store", config);
      dispatch({ type: FETCH_STORE_SUCCESS, payload: data.store });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_STORE_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const updateStore = (info) => {
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
      dispatch({ type: UPDATE_STORE_REQUEST });
      await axios.put("/api/seller/update-store", info, config);
      dispatch({ type: UPDATE_STORE_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_STORE_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const getProducts = () => {
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
      dispatch({ type: FETCH_PRODUCTS_REQUEST });
      const { data } = await axios.get("/api/seller/get-products", config);
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data.products });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_PRODUCTS_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const getProduct = (id) => {
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
      dispatch({ type: FETCH_PRODUCT_REQUEST });
      const { data } = await axios.get(`/api/seller/get-product/${id}`, config);
      dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data.product });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_PRODUCT_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const editStore = (info) => {
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
      dispatch({ type: EDIT_PRODUCT_REQUEST });
      await axios.put(`/api/seller/edit-product/${info.id}`, info, config);
      dispatch({ type: EDIT_PRODUCT_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: EDIT_PRODUCT_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const deleteProduct = (id) => {
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
      dispatch({ type: DELETE_PRODUCT_REQUEST });
      await axios.delete(`/api/seller/delete-product/${id}`, config);
      dispatch({ type: DELETE_PRODUCT_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};
