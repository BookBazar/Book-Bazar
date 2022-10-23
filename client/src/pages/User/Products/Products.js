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

import Loader from "../../../components/Loader/Loader";
import Navbar from "../../../components/Navbar/Navbar";

export default function Products() {
  const [rating, setRating] = useState(0);
  const { products, loading } = useSelector((state) => state.ProductsReducer);
  const { success, errors } = useSelector((state) => state.CreateReviewReducer);
  const { userStore } = useSelector((state) => state.FetchUserStoreReducer);
  const dispatch = useDispatch();
  const { id } = useParams();

  //Fetch Products
  useEffect(() => {
    dispatch(getProducts(id));
  }, [dispatch, id]);

  //Fetch Store
  useEffect(() => {
    dispatch(getUserStore(id));
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
    }
    setRating(0);
  }, [success]);

  return (
    <>
      <div>
        <Navbar />
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
          {userStore.map((store) => (
            <div className="ml-minus-15" key={store._id}>
              <div className="col-8 p-15">
                <div className="store_container">
                  <div className="item_image_container">
                    <img
                      src={store.image}
                      alt={store.storeName}
                      className="item_image"
                      style={{
                        width: "200px",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="item_content">
                    <h2>{store.storeName}</h2>
                    <h3>
                      <strong>Contact Number</strong> {store.contact}
                    </h3>
                    <h3>
                      <strong>Email</strong> {store.email}
                    </h3>
                    <h3>
                      <strong>Address</strong> {store.address}
                    </h3>
                    <h3>
                      <strong>Location</strong> {store.location}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* <Route render={({ history }) => <Search history={history} redirect='dashboard' search='product-search'/>} />  */}
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
        <div className="products_reviews">
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
      </div>
    </>
  );
}
