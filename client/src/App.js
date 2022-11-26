import React from "react";

//Depedencies
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

//components and styles
import Store from "./store";
import RouteLink from "./private/RouteLinks";
import PrivateRoute from "./private/PrivateRoutes";
import AdminRoutes from "./private/Admin/AdminRoute";
import AdminPrivate from "./private/Admin/AdminPrivate";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./pages/User/Home/Home";
import SellerRequest from "./pages/Seller/RequestForm/Form";

import AdminLogin from "./pages/Admin/Login/Login";
import AdminHome from './pages/Admin/Home/Home'
import RequestDetails from "./pages/Admin/RequestDetails/RequestDetails";
import StoreList from "./pages/Admin/StoreList/StoreList";
import ListDetails from "./pages/Admin/ListDetails/ListDetails";

import ViewProducts from "./pages/Seller/ViewProducts/ViewProducts";
import CreateProduct from "./pages/Seller/CreateProduct/CreateProduct";
import StoreDetails from "./pages/Seller/StoreDetails/StoreDetails";
import EditProduct from "./pages/Seller/EditProduct/EditProduct";
import Orders from "./pages/Seller/Orders/Orders";
import OrderDetail from "./pages/Seller/OrderDetail/Detail";

import Products from "./pages/User/Products/Products";
import Detail from "./pages/User/ProductDetail/Detail";
import Cart from "./pages/User/Cart/Cart";
import Shipping from "./pages/User/Shipping/Shipping";
import Payment from "./pages/User/Payment/Payment";
import Summary from "./pages/User/Place Order/Summary";
import Setting from "./pages/User/Setting/Setting";
import MyOrders from "./pages/User/MyOrders/MyOrders";


import PrintingHome from "./pages/PrintingPress/Home/Home";
import PrintingRequest from "./pages/PrintingPress/PrintingRequest/Request";
import PrintingShipping from "./pages/PrintingPress/Shipping/Shipping";
import PrintingPayment from "./pages/PrintingPress/Payment/Payment";
import PrintingSummary from "./pages/PrintingPress/Place Order/Summary";

export default function App() {
  return (  
    <Provider store={Store}>
      <BrowserRouter>
        <Switch>
          <AdminRoutes path="/admin-login" exact component={AdminLogin} />
          <AdminPrivate path='/admin-store-request' exact component={AdminHome} />
          <AdminPrivate path='/store-request-search/:keyword' component={AdminHome} />
          <AdminPrivate path='/request-details/:id' exact component={RequestDetails} />
          <AdminPrivate path='/admin-store-list' exact component={StoreList} />
          <AdminPrivate path='/store-list-search/:keyword' component={StoreList} />
          <AdminPrivate path='/list-details/:id' exact component={ListDetails} />

          <Route path='/products/:id' exact component={Products}/>
          <Route path='/product/:id' exact component={Detail} />
          <Route path='/cart/:id?' exact component={Cart} /> 
          <PrivateRoute path="/shipping" exact component={Shipping} />
          <PrivateRoute path="/payment" exact component={Payment} />
          <PrivateRoute path="/placeorder" exact component={Summary} />

          <RouteLink path="/login" exact component={Login} />
          <RouteLink path="/signup" exact component={Register} />
          <PrivateRoute path="/homepage" exact component={Home} />
          <PrivateRoute path="/seller-form" exact component={SellerRequest} />
          <PrivateRoute path='/dashboard' exact component={ViewProducts} />
          <PrivateRoute path='/product-search/:keyword' component={ViewProducts} />
          <PrivateRoute path='/create-products' exact component={CreateProduct} />
          <PrivateRoute path='/store-details' exact component={StoreDetails} />
          <PrivateRoute path='/edit-product/:id' exact component={EditProduct} />
          <PrivateRoute path='/orders-dashboard' exact component={Orders} />
          <PrivateRoute path='/order-detail/:id' exact component={OrderDetail} />
          <PrivateRoute path='/setting' exact component={Setting} />
          <PrivateRoute path='/my-orders' exact component={MyOrders} />

          <PrivateRoute path='/printing-homepage' exact component={PrintingHome} />
          <PrivateRoute path='/printing-request/:id' exact component={PrintingRequest} />
          <PrivateRoute path='/printing-shipping' exact component={PrintingShipping} />
          <PrivateRoute path='/printing-payment' exact component={PrintingPayment} />
          <PrivateRoute path='/printing-placeorder' exact component={PrintingSummary} />

        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
