import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

//Styles and Components
import "./MyOrders.css";
import Navbar from "../../../components/Navbar/Navbar";
import Loader from "../../../components/Loader/Loader";
import {
  getUserOrders,
  getUserPrintingOrders,
} from "../../../store/methods/orderMethods";

export default function MyOrders() {
  const dispatch = useDispatch();
  const { userOrders, loading } = useSelector(
    (state) => state.FetchUserOrdersReducer
  );
  const { userPrintingOrders } = useSelector(
    (state) => state.FetchUserPrintingOrdersReducer
  );

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserPrintingOrders());
  }, [dispatch]);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="profile_panel">
        {!loading ? (
          <>
            <div className="table_container">
              <div className="table">
                <div className="table-header">
                  <div className="header__item">
                    <p className="filter__link">NAME</p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">
                      QUANTITY
                    </p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">PRICE</p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">STATUS</p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">TYPE</p>
                  </div>
                </div>
                <div className="table-content">
                  {userOrders.map((order) => (
                    <div className="table-row" key={order._id}>
                      <div className="table-data">
                        {order.orderItems[0].bookName}
                      </div>
                      <div className="table-data">
                        {order.orderItems[0].qty}
                      </div>
                      <div className="table-data">
                        PKR {order.orderItems[0].price}
                      </div>
                      {order.isPending && (
                        <div className="table-data">Pending</div>
                      )}
                      {order.isApproved && (
                        <div className="table-data">Approved</div>
                      )}
                      {order.isComplete && (
                        <div className="table-data">Compelete</div>
                      )}
                      {order.isCancelled && (
                        <div className="table-data">Cancelled</div>
                      )}
                      <div className="table-data">Book</div>
                    </div>
                  ))}
                </div>
                <div className="table-content">
                  {userPrintingOrders.map((order) => (
                    <div className="table-row" key={order._id}>
                      <div className="table-data">
                        {order.printingItems[0].bookName}
                      </div>
                      <div className="table-data">
                        {order.printingItems[0].numberOfBooks}
                      </div>
                      <div className="table-data">PKR {order.price}</div>
                      {order.isPending && (
                        <div className="table-data">Pending</div>
                      )}
                      {order.isApproved && (
                        <div className="table-data">Approved</div>
                      )}
                      {order.isComplete && (
                        <div className="table-data">Compelete</div>
                      )}
                      {order.isCancelled && (
                        <div className="table-data">Cancelled</div>
                      )}
                      <div className="table-data">Printing Press</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
