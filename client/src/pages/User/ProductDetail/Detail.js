import React, { useEffect, useState } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

//Styles and components
import "./Details.css";
import { getProduct } from "../../../store/methods/productMethods";

export default function Detail({ history }) {
  const [qty, setQty] = useState(1);
  const { product, loading } = useSelector((state) => state.ProductReducer);
  const dispatch = useDispatch();
  const { id } = useParams();

  //Fetch Products
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  //Functions
  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div className="product_main">
      <Link className="btn" to="/homepage">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <div className="product_container">
          <div className="product_img">
            <img src={product.image} alt={product.bookName} />
          </div>
          <div className="product_details">
            <h3>{product.bookName}</h3>
            <p className="product_price">Price: PKR {product.price}</p>
            <p className="product_description">Edition: {product.edition}</p>
            {product.isbn && (
              <p className="product_description">ISBN: {product.isbn}</p>
            )}
            <p className="product_description">
              Description: {product.description}
            </p>
          </div>
          <div className="product_CTA">
            <p className="product_status">
              <span>Price:</span>
              <strong>PKR {product.price}</strong>
            </p>
            <p className="product_status">
              <span>Staus:</span>
              <strong>
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </strong>
            </p>
            {product.quantity > 0 && (
              <div className="product_status">
                <span>Quantity:</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  style={{ marginTop: "0.5rem", paddingLeft: "2rem" }}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              onClick={addToCartHandler}
              className={
                product.quantity === 0
                  ? "btn_status btn_disabled"
                  : "btn btn_status"
              }
              type="button"
              disabled={product.quantity === 0}
            >
              {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
