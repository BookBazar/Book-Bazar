import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
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
      const { data } = await axios.post("api/order/add-order", order, config);
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.createdOrder });
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
