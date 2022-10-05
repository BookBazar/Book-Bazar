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
  CART_CLEAR_ITEMS,
} from "../constants/productConstants";

const initialState = {
  products: [],
  product: {},
  cartItems: [],
  shippingAddress: {},
  paymentMethod: {},
  loading: false,
  success: false,
  errors: [],
};

export const ProductsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === FETCH_PRODUCTS_REQUEST) {
    return { ...state, loading: true };
  } else if (type === FETCH_PRODUCTS_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      products: payload,
      errors: [],
    };
  } else if (type === FETCH_PRODUCTS_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const ProductReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === FETCH_PRODUCT_REQUEST) {
    return { ...state, loading: true };
  } else if (type === FETCH_PRODUCT_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      product: payload,
      errors: [],
    };
  } else if (type === FETCH_PRODUCT_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === CART_ADD_ITEM) {
    const existItem = state.cartItems.find(
      (x) => x.productId === payload.productId
    );
    if (existItem) {
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.productId === existItem.productId ? payload : x
        ),
      };
    } else {
      return {
        ...state,
        cartItems: [...state.cartItems, payload],
      };
    }
  } else if (type === CART_REMOVE_ITEM) {
    return {
      ...state,
      cartItems: state.cartItems.filter((x) => x.productId !== payload),
    };
  } else if (type === CART_SAVE_SHIPPING_ADDRESS) {
    return { ...state, shippingAddress: payload };
  } else if (type === CART_SAVE_PAYMENT_METHOD) {
    return { ...state, paymentMethod: payload };
  } else if (type === CART_CLEAR_ITEMS) {
    localStorage.removeItem('cartItems')
    return {...state, cartItems: []}
  } else {
    return state;
  }
};

