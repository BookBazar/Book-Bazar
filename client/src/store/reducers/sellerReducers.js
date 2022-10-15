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
  FETCH_STORES_REQUEST,
  FETCH_STORES_SUCCESS,
  FETCH_STORES_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
} from "../constants/sellerConstants";

const initialState = {
  loading: false,
  success: false,
  errors: [],
  store: [],
  stores: [],
  specificStore: {},
  specificProduct: {},
  product: [],
  products: [],
};

export const CreateStoreReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === CREATE_STORE_REQUEST) {
    return { ...state, loading: true };
  } else if (type === CREATE_STORE_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      store: payload,
      errors: [],
    };
  } else if (type === CREATE_STORE_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const CreateProductReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === CREATE_PRODUCT_REQUEST) {
    return { ...state, loading: true };
  } else if (type === CREATE_PRODUCT_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      product: payload,
      errors: [],
    };
  } else if (type === CREATE_PRODUCT_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const FetchStoreReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === FETCH_STORE_REQUEST) {
    return { ...state, loading: true };
  } else if (type === FETCH_STORE_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      specificStore: payload,
      errors: [],
    };
  } else if (type === FETCH_STORE_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const UpdateStoreReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === UPDATE_STORE_REQUEST) {
    return { ...state, loading: true };
  } else if (type === UPDATE_STORE_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      errors: [],
    };
  } else if (type === UPDATE_STORE_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const FetchProductsReducer = (state = initialState, action) => {
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

export const FetchProductReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === FETCH_PRODUCT_REQUEST) {
    return { ...state, loading: true };
  } else if (type === FETCH_PRODUCT_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      specificProduct: payload,
      errors: [],
    };
  } else if (type === FETCH_PRODUCT_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const EditProductReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === EDIT_PRODUCT_REQUEST) {
    return { ...state, loading: true };
  } else if (type === EDIT_PRODUCT_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      errors: [],
    };
  } else if (type === EDIT_PRODUCT_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const DeleteProductReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === DELETE_PRODUCT_REQUEST) {
    return { ...state, loading: true };
  } else if (type === DELETE_PRODUCT_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      errors: [],
    };
  } else if (type === DELETE_PRODUCT_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const FetchStoresReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === FETCH_STORES_REQUEST) {
    return { ...state, loading: true };
  } else if (type === FETCH_STORES_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      stores: payload,
      errors: [],
    };
  } else if (type === FETCH_STORES_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};

export const CreateReviewReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === CREATE_REVIEW_REQUEST) {
    return { ...state, loading: true };
  } else if (type === CREATE_REVIEW_SUCCESS) {
    return {
      ...state,
      loading: false,
      success: true,
      errors: [],
    };
  } else if (type === CREATE_REVIEW_FAIL) {
    return { ...state, loading: false, success: false, errors: payload };
  } else {
    return state;
  }
};