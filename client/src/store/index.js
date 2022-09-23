import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  SignupReducer,
  LoginReducer,
  UserInfoReducer,
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

const rootReducers = combineReducers({
  SignupReducer,
  LoginReducer,
  UserInfoReducer,

  CreateStoreReducer,
  CreateProductReducer,
  FetchStoreReducer,
  UpdateStoreReducer,
  FetchProductsReducer,
  FetchProductReducer,
  EditProductReducer,
  DeleteProductReducer,

  AdminLoginReducer,
  StoreRequestReducer,
  SpecificStoreReducer,
  ApproveStoreReducer,
  DeleteStoreReducer,
  StoreListReducer,
  SpecificStoreListReducer,
});

const middlewares = [thunkMiddleware];
const Store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export default Store;
