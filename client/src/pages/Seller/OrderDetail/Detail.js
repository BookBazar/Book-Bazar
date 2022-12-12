import React, { useEffect } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Styles and components
import Loader from "../../../components/Loader/Loader";
import { getOrder } from "../../../store/methods/orderMethods";

export default function Detail() {
  const { order, userDetail, loading } = useSelector((state) => state.FetchOrderReducer);
  const dispatch = useDispatch();
  const { id } = useParams();
  
  //Fetch Order
  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  return (
    <div className="product_main">
      <Link className="btn" to="/orders-dashboard">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : (
        order.map((item) => (
          <div className="product_container" key={item._id}>
            <div className="product_img">
              <img
                src={item.orderItems[0].image}
                alt={item.orderItems[0].bookName}
              />
            </div>
            <div className="product_details">
              <h3>{item.orderItems[0].bookName}</h3>
              <p className="product_price">
                Price: PKR {item.orderItems[0].price}
              </p>
              <h3>User Contact Info</h3>
              <p className="product_description">
                Email: {userDetail.email}
              </p>
            </div>
            <div className="product_CTA">
              <p className="product_status">
                <strong>Shipping Address</strong>
              </p>
              <p className="product_status">
                <span>Address:</span>
                <strong>{item.shippingAddress.address}</strong>
              </p>
              <p className="product_status">
                <span>Postal Code:</span>
                <strong>{item.shippingAddress.postalCode}</strong>
              </p>
              <p className="product_status">
                <span>City:</span>
                <strong>{item.shippingAddress.city}</strong>
              </p>
              <p className="product_status">
                <span>Country:</span>
                <strong>{item.shippingAddress.country}</strong>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
