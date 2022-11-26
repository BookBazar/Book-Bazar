import axios from "axios";
import {
  APPROVE_ORDER_FAIL,
  APPROVE_ORDER_REQUEST,
  APPROVE_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  COMPLETE_ORDER_FAIL,
  COMPLETE_ORDER_REQUEST,
  COMPLETE_ORDER_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDER_FAIL,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_SPECIFIC_STORE_ORDERS_FAIL,
  FETCH_SPECIFIC_STORE_ORDERS_REQUEST,
  FETCH_SPECIFIC_STORE_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_FAIL,
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  PRINTING_ORDER_CREATE_FAIL,
  PRINTING_ORDER_CREATE_REQUEST,
  PRINTING_ORDER_CREATE_SUCCESS,
  PRINTING_PRESS_ORDER_FAIL,
  PRINTING_PRESS_ORDER_REQUEST,
  PRINTING_PRESS_ORDER_SUCCESS,
} from "../constants/orderConstants";
import { CART_CLEAR_ITEMS } from "../constants/productConstants";

export const createOrder = (order) => {
  return async (dispatch, getState) => {
    const {
      LoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: ORDER_CREATE_REQUEST });
    try {
      const { data } = await axios.post("/api/order/add-order", order, config);
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.createdOrders });
      dispatch({ type: CART_CLEAR_ITEMS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const printingCreateOrder = (order) => {
  return async (dispatch, getState) => {
    const {
      LoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: PRINTING_ORDER_CREATE_REQUEST });
    try {
      console.log("Enter")
      const { data } = await axios.post("/api/order/add-printing-order", order, config);
      dispatch({ type: PRINTING_ORDER_CREATE_SUCCESS, payload: data.createdOrder });
    } catch (error) {
      console.log(error);
      dispatch({
        type: PRINTING_ORDER_CREATE_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};


export const getOrders = (orderType) => {
  return async (dispatch, getState) => {
    const {
      LoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: FETCH_ORDERS_REQUEST });
    try {
      const { data } = await axios.get(
        `/api/order/get-orders/${orderType}`,
        config
      );
      dispatch({ type: FETCH_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_ORDERS_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const getOrder = (id) => {
  return async (dispatch, getState) => {
    const {
      LoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: FETCH_ORDER_REQUEST });
    try {
      const { data } = await axios.get(`/api/order/get-order/${id}`, config);
      dispatch({ type: FETCH_ORDER_SUCCESS, payload: data.order });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_ORDER_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const approveOrder = (id) => {
  return async (dispatch, getState) => {
    const {
      LoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: APPROVE_ORDER_REQUEST });
    try {
      await axios.put(`/api/order/approve-order/${id}`, config);
      dispatch({ type: APPROVE_ORDER_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: APPROVE_ORDER_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const cancelOrder = (id) => {
  return async (dispatch, getState) => {
    const {
      LoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: CANCEL_ORDER_REQUEST });
    try {
      await axios.put(`/api/order/cancel-order/${id}`, config);
      dispatch({ type: CANCEL_ORDER_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CANCEL_ORDER_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const completeOrder = (id) => {
  return async (dispatch, getState) => {
    const {
      LoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: COMPLETE_ORDER_REQUEST });
    try {
      await axios.put(`/api/order/complete-order/${id}`, config);
      dispatch({ type: COMPLETE_ORDER_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: COMPLETE_ORDER_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const getUserOrders = () => {
  return async (dispatch, getState) => {
    const {
      LoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: FETCH_USER_ORDERS_REQUEST });
    try {
      const { data } = await axios.get("/api/order/get-user-orders", config);
      dispatch({ type: FETCH_USER_ORDERS_SUCCESS, payload: data.myOrders });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_USER_ORDERS_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const getSpecificStoreOrders = (id) => {
  return async (dispatch, getState) => {
    const {
      LoginReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: FETCH_SPECIFIC_STORE_ORDERS_REQUEST });
    try {
      const { data } = await axios.get(
        `/api/order/get-specific-store-orders/${id}`,
        config
      );
      dispatch({
        type: FETCH_SPECIFIC_STORE_ORDERS_SUCCESS,
        payload: data.myOrders,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_SPECIFIC_STORE_ORDERS_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const printingPressOrder = (info) => {
  return async (dispatch, getState) => {
    dispatch({ type: PRINTING_PRESS_ORDER_REQUEST });
    try {
      dispatch({ type: PRINTING_PRESS_ORDER_SUCCESS, payload: info });
      localStorage.setItem(
        "printingPress",
        JSON.stringify(getState().PrintingPressReducer.printingItems)
      );
    } catch (error) {
      dispatch({
        type: PRINTING_PRESS_ORDER_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};
