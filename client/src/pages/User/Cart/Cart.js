import React, { useEffect } from "react";

//Depedencies
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//styles and components
import {
  addToCart,
  removeFromCart,
} from "../../../store/methods/productMethods";
import { ImBin } from "react-icons/im";
import "./Cart.css";

export default function Cart({ match, location, history }) {
  const prodId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.LoginReducer);
  const dispatch = useDispatch();

  //Add to Cart
  useEffect(() => {
    if (prodId) {
      dispatch(addToCart(prodId, qty));
    }
  }, [dispatch, prodId, qty]);

  //Remove from cart
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (user) {
      history.push("/shipping");
    } else {
      history.push("/login");
    }
  };

  return (
    <div className="cart_container">
      <div className="cart_content">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          "Cart is Empty"
        ) : (
          <>
            {cartItems.map((item) => (
              <div className="cart_content_container" key={item.productId}>
                <div className="cart_content_image">
                  <img src={item.image} alt={cartItems.name} />
                </div>
                <div className="cart_content_name">
                  <Link to={`/details/${item.productId}`}>{item.bookName}</Link>
                </div>
                <div className="cart_content_price">
                  <p>PKR {item.price}</p>
                </div>
                <div className="cart_content_select">
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart(item.productId, Number(e.target.value))
                      )
                    }
                    style={{ marginTop: "0.5rem", paddingLeft: "2rem" }}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="cart_content_button">
                  <button
                    onClick={() => removeFromCartHandler(item.productId)}
                    className="btn"
                  >
                    <ImBin />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="cart_calculation">
        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2>

        <p>
          <span>
            Total: <strong>PKR</strong>{" "}
          </span>
          {cartItems
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}
        </p>
        <button
          onClick={checkoutHandler}
          className={
            cartItems.length === 0
              ? "btn_status btn_disabled"
              : "btn btn_status"
          }
          type="button"
          disabled={cartItems.length === 0}
        >
          {cartItems.length > 0 ? "Proceed To Checkout" : "Cart is Empty"}
        </button>
      </div>
    </div>
  );
}
