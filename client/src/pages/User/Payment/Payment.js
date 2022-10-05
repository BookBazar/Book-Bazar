import React, { useState } from "react";

//Dependencies
import { useDispatch, useSelector } from "react-redux";

//styles and components
import "./Payment.css";
import { savePaymentMethod } from "../../../store/methods/productMethods";

export default function Payment({ history }) {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cartReducer);

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  //Functions
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder')
  };
  
  return (
    <div className="shipping_container">
      <form onSubmit={submitHandler}>
        <div className="ml-minus-15 mr-minus-15">
          <div className="col-8 p-15">
            <div className="create_card">
              <h3 className="card_h3">Payment Method</h3>
              <h4 className="card_h4">Select Method</h4>
              <div className="payment_input_container">
                <input
                  type="radio"
                  checked
                  id="COD"
                  name="paymentMethod"
                  value="COD"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="COD">Cash on Delivery</label>
              </div>
              <div className="group">
                <button className="btn btn_status" type="submit">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
