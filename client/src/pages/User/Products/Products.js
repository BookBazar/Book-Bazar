import React, { useEffect, useState } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

//Styles and components
import "./Products.css";
import { getProducts } from "../../../store/methods/productMethods";
import {
  createReview,
  getUserStore,
} from "../../../store/methods/sellerMethods";
import { getSpecificStoreOrders } from "../../../store/methods/orderMethods";

import Loader from "../../../components/Loader/Loader";
import Navbar from "../../../components/Navbar/Navbar";

export default function Products() {
  const [keyword, setKeyword] = useState("");
  const [rating, setRating] = useState(0);

  const { products, loading } = useSelector((state) => state.ProductsReducer);
  const { success, errors } = useSelector((state) => state.CreateReviewReducer);
  const { userStore } = useSelector((state) => state.FetchUserStoreReducer);
  const { specificStoreOrders } = useSelector(
    (state) => state.FetchSpecificStoreOrdersReducer
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  //Check if already reviewed
  // useEffect(() => {
  //   dispatch(isStoreReviewed(userStore._id));
  // }, [dispatch, userStore]);

  //Fetch Products
  useEffect(() => {
    dispatch(getProducts(id, keyword));
  }, [dispatch, id, keyword]);

  //Fetch Store
  useEffect(() => {
    dispatch(getUserStore(id));
  }, [dispatch, id]);

  //Fetch Specific Store Orders
  useEffect(() => {
    dispatch(getSpecificStoreOrders(id));
  }, [dispatch, id]);

  //Submit Review
  const handleReview = (e) => {
    e.preventDefault();
    dispatch(createReview({ id, rating }));
  };

  //Display Error
  useEffect(() => {
    if (errors.length > 0) {
      errors.map((error) => toast.error(error.msg));
    }
  }, [errors]);

  //Display Success
  useEffect(() => {
    if (success) {
      toast.success("Review added Successfully");
      window.location.reload();
    }
    setRating(0);
  }, [success]);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="home_section">
        <div className="auth_content">
          <div className="weblogintop">
            <h1 className="webmaintitle">{userStore.storeName}</h1>
            <h3 style={{ fontSize: "1.5rem" }}>{userStore.contact}</h3>
          </div>
          <div className="ttp">
            <a href={userStore.location}>{userStore.address}</a>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="home_search">
          <div className="col-6 ">
            <div className="">
              <div className="">
                <input
                  type="text"
                  naem="q"
                  className="group__control"
                  placeholder="Search"
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn"
                  style={{ marginLeft: "1rem" }}
                >
                  Search
                </button>
              </div>
            </div>
            <span></span>
          </div>
        </div>

      <div className="product_container">
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            className: "",
            style: {
              fontSize: "14px",
            },
          }}
        />

        <div className="products_content">
          {!loading ? (
            products.map((item) => (
              <div className="ml-minus-15" key={item._id}>
                <div className="col-8 p-15">
                  <Link to={`/product/${item._id}`}>
                    <div className="item_container">
                      <div className="item_image_container">
                        <img
                          src={item.image}
                          alt={item.storeName}
                          className="item_image"
                          style={{
                            width: "200px",
                            height: "300px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="item_content">
                        <h2>{item.bookName}</h2>
                        <h3>
                          <strong>Author</strong> {item.authorName}
                        </h3>
                        <h3>
                          <strong>Condition</strong> {item.condition}
                        </h3>
                        {item.tags.length !== 0 && (
                          <h3>
                            <strong>Tags</strong>{" "}
                            {item.tags.map((tag) => `#${tag} `)}
                          </h3>
                        )}
                        {item.edition && (
                          <h3>
                            <strong>Edition</strong> {item.edition}
                          </h3>
                        )}
                        <h3>
                          <strong>PKR</strong> {item.price}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
        {specificStoreOrders.length !== 0 ? (
          <div
            className="products_reviews"
            style={{ position: "sticky", top: "0px" }}
          >
            <p className="product_status">
              <div className="group">
                <label htmlFor="email" style={{ fontSize: "1.5rem" }}>
                  Rate Us
                </label>
                <select
                  className="group__control"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
            </p>
            <button
              onClick={handleReview}
              className={"btn btn_status"}
              type="button"
            >
              Submit Review
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
