import React, { useState, useEffect } from "react";

//Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Styles and Components
import Sidebar from "../../../components/Sidebar/Sidebar";
import {
  getPrintingOrders,
  approvePrintingOrder,
  cancelPrintingOrder,
  completePrintingOrder,
} from "../../../store/methods/orderMethods";

export default function Orders() {
  const [orderType, setOrderType] = useState("pending");
  const { printingOrders } = useSelector(
    (state) => state.FetchPrintingOrdersReducer
  );
  const dispatch = useDispatch();

  //Fetch Orders
  useEffect(() => {
    dispatch(getPrintingOrders(orderType));
  }, [dispatch, orderType]);

  //Approve Order
  const handleApprove = (data) => {
    dispatch(approvePrintingOrder(data.id));
    window.location.reload();
  };

  //Cancel Order
  const handleCancel = (data) => {
    console.log(data.id);
    dispatch(cancelPrintingOrder(data.id));
    window.location.reload();
  };

  //Approve Order
  const handleComplete = (data) => {
    dispatch(completePrintingOrder(data.id));
    window.location.reload();
  };

  return (
    <div className="container_orders">
      <div className="sidebar_panel">
        <Sidebar />
      </div>
      <div className="orders_content_container">
        <div className="ml-minus-15 mr-minus-15">
          <div className="col-6 p-15">
            <div className="create_card">
              <h3 className="card_h3">Your Orders</h3>
              <nav>
                <div
                  className="nav nav-tabs justify-content-center"
                  id="nav-tab"
                  role="tablist"
                >
                  <button
                    className="tab_btn"
                    type="submit"
                    onClick={() => setOrderType("pending")}
                  >
                    Pending Orders
                  </button>
                  <button
                    className="tab_btn"
                    type="submit"
                    onClick={() => setOrderType("approved")}
                  >
                    Dispatched Orders
                  </button>
                  <button
                    className="tab_btn"
                    type="submit"
                    onClick={() => setOrderType("complete")}
                  >
                    Delivered Orders
                  </button>
                  <button
                    className="tab_btn"
                    type="submit"
                    onClick={() => setOrderType("cancelled")}
                  >
                    Cancelled Orders
                  </button>
                </div>
              </nav>
              {printingOrders.length === 0 ? (
                <h3 className="card_h3">No Orders</h3>
              ) : (
                printingOrders.map((item) => (
                  <div key={item._id}>
                    <div className="order_item_container">
                      <div className="order_item_content">
                        <h2>{item.printingItems[0].bookName}</h2>
                      </div>
                      <div>
                        <h4>
                          Delivery Date <br></br> {item.printingItems[0].date}
                        </h4>
                      </div>
                      {item.isPending === true && (
                        <div className="order_item_btn">
                          <Link
                            className="btn btn-light orderscardbtn"
                            to={`/printing-order-detail/${item._id}`}
                          >
                            View
                          </Link>
                          <button
                            className="btn btn-light orderscardbtn"
                            onClick={() => handleApprove({ id: item._id })}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-light orderscardbtn"
                            onClick={() => handleCancel({ id: item._id })}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                      {item.isApproved === true && (
                        <div className="order_item_btn">
                          <Link
                            className="btn btn-light orderscardbtn"
                            to={`/printing-order-detail/${item._id}`}
                          >
                            View
                          </Link>
                          <button
                            className="btn btn-light orderscardbtn"
                            onClick={() => handleComplete({ id: item._id })}
                          >
                            Complete
                          </button>
                          <button
                            className="btn btn-light orderscardbtn"
                            onClick={() => handleCancel({ id: item._id })}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                      {(item.isComplete === true ||
                        item.isCancelled === true) && (
                        <div className="order_item_btn">
                          <Link
                            className="btn btn-light orderscardbtn"
                            to={`/printing-order-detail/${item._id}`}
                          >
                            View
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
