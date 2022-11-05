import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  SignupReducer,
  LoginReducer,
  UserInfoReducer,
  UpdateUserProfileReducer,
  UpdateUserPasswordReducer,
} from "./reducers/authReducers";

import {
  CreateStoreReducer,
  CreateProductReducer,
  FetchStoreReducer,
  UpdateStoreReducer,
  FetchProductsReducer,
  FetchProductReducer,
  EditProductReducer,
  DeleteProductReducer,
  FetchStoresReducer,
  CreateReviewReducer,
  FetchUserStoreReducer,
  StoreReviewReducer,
} from "./reducers/sellerReducers";

import {
  AdminLoginReducer,
  StoreRequestReducer,
  SpecificStoreReducer,
  ApproveStoreReducer,
  StoreListReducer,
  SpecificStoreListReducer,
  DeleteStoreReducer,
} from "./reducers/adminReducers";

import {
  ProductsReducer,
  ProductReducer,
  cartReducer,
} from "./reducers/productReducer";

import {
  CreateOrderReducer,
  FetchOrdersReducer,
  FetchOrderReducer,
  ApproveOrderReducer,
  CancelOrderReducer,
  CompleteOrderReducer,
  FetchUserOrdersReducer,
  FetchSpecificStoreOrdersReducer,
} from "./reducers/orderReducer";

const rootReducers = combineReducers({
  SignupReducer,
  LoginReducer,
  UserInfoReducer,
  UpdateUserProfileReducer,
  UpdateUserPasswordReducer,

  CreateStoreReducer,
  CreateProductReducer,
  FetchStoreReducer,
  FetchUserStoreReducer,
  UpdateStoreReducer,
  FetchProductsReducer,
  FetchProductReducer,
  EditProductReducer,
  DeleteProductReducer,
  FetchStoresReducer,
  CreateReviewReducer,
  StoreReviewReducer,

  AdminLoginReducer,
  StoreRequestReducer,
  SpecificStoreReducer,
  ApproveStoreReducer,
  DeleteStoreReducer,
  StoreListReducer,
  SpecificStoreListReducer,

  ProductsReducer,
  ProductReducer,
  cartReducer,

  CreateOrderReducer,
  FetchOrdersReducer,
  FetchOrderReducer,
  ApproveOrderReducer,
  CancelOrderReducer,
  CompleteOrderReducer,
  FetchUserOrdersReducer,
  FetchSpecificStoreOrdersReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
  cartReducer: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
};

const middlewares = [thunkMiddleware];
const Store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export default Store;
