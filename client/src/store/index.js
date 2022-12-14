import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  SignupReducer,
  LoginReducer,
  UserInfoReducer,
  UpdateUserProfileReducer,
  UpdateUserPasswordReducer,
  UserDetailsReducer
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
  AllPrintingPressReducer,
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
  PrintingPressReducer,
  PrintingCreateOrderReducer,
  FetchPrintingOrdersReducer,
  ApprovePrintingOrderReducer,
  CancelPrintingOrderReducer,
  CompletePrintingOrderReducer,
  FetchPrintingOrderReducer,
  FetchUserPrintingOrdersReducer,
} from "./reducers/orderReducer";

const rootReducers = combineReducers({
  SignupReducer,
  LoginReducer,
  UserInfoReducer,
  UpdateUserProfileReducer,
  UpdateUserPasswordReducer,
  UserDetailsReducer,

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
  AllPrintingPressReducer,

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
  PrintingPressReducer,
  PrintingCreateOrderReducer,
  FetchPrintingOrdersReducer,
  ApprovePrintingOrderReducer,
  CancelPrintingOrderReducer,
  CompletePrintingOrderReducer,
  FetchPrintingOrderReducer,
  FetchUserPrintingOrdersReducer,
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

const printingItemsFromStorage = localStorage.getItem("printingPress")
  ? JSON.parse(localStorage.getItem("printingPress"))
  : [];

const initialState = {
  cartReducer: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
    printingItems: printingItemsFromStorage,
  },
};

const middlewares = [thunkMiddleware];
const Store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default Store;
