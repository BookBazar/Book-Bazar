import React, { useState } from "react";

//Dependencies
import { useDispatch, useSelector } from "react-redux";
//styles and components
import "./Shipping.css";
import { saveShippingAddress } from "../../../store/methods/productMethods";

export default function Shipping({ history }) {
  const { shippingAddress } = useSelector((state) => state.cartReducer);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();

  //Functions
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <div className="shipping_container">
      <form onSubmit={submitHandler}>
        <div className="ml-minus-15 mr-minus-15">
          <div className="col-8 p-15">
            <div className="create_card">
              <h3 className="card_h3">Shipping</h3>
              <div className="group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  required
                  className="group__control"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  required
                  className="group__control"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  required
                  className="group__control"
                  placeholder="Enter postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  required
                  className="group__control"
                  placeholder="Enter country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
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
