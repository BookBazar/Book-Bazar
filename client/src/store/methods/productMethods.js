import axios from "axios";

import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/productConstants";

export const getProducts = (id) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: FETCH_PRODUCTS_REQUEST });
      const { data } = await axios.get(
        `/api/product/get-products/${id}`,
        config
      );
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
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: FETCH_PRODUCT_REQUEST });
      const { data } = await axios.get(
        `/api/product/get-product/${id}`,
        config
      );
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

export const addToCart = (id, qty) => {
  return async (dispatch, getState) => {
    const {
      data: { product },
    } = await axios.get(`/api/product/get-product/${id}`);
    try {
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          storeOwner: product.user,
          productId: product._id,
          bookName: product.bookName,
          image: product.image,
          price: product.price,
          countInStock: product.quantity,
          qty,
        },
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartReducer.cartItems)
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFromCart = (id) => {
  return (dispatch, getState) => {
    try {
      dispatch({ type: CART_REMOVE_ITEM, payload: id });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartReducer.cartItems)
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const saveShippingAddress = (data) => {
  return (dispatch) => {
    try {
      dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
      localStorage.setItem("shippingAddress", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const savePaymentMethod = (data) => {
  return (dispatch) => {
    try {
      dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
      localStorage.setItem("paymentMethod", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
};
