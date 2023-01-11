import React, { useEffect } from "react";

//Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

//Styles and Components
import Loader from "../../../components/Loader/Loader";
import Sidebar from "../../../components/Sidebar/Sidebar";
import {
  getProducts,
  deleteProduct,
} from "../../../store/methods/sellerMethods";
import Search from "../../../components/Search/Search";

export default function ViewProducts({ match }) {
  const dispatch = useDispatch();
  const { loading, errors, products } = useSelector(
    (state) => state.FetchProductsReducer
  );
  const keyword = match.params.keyword;

  //Displaying errors
  useEffect(() => {
    if (errors.length > 0) {
      errors.map((err) => toast.error(err.msg));
    }
  }, [errors]);

  //Fetch Products
  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);

  //Delete Request
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload(false);
  };

  return (
    <div className="container_admin" style={{'marginLeft': '4rem'}}>
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
      <div className="sidebar_panel">
        <Sidebar />
      </div>
      <div className="content_panel" style={{"marginTop": "2rem"}}>
        <Route
          render={({ history }) => (
            <Search
              history={history}
              redirect="dashboard"
              search="product-search"
            />
          )}
        />
        {!loading ? (
          products.map((item) => (
            <div className=" ml-minus-15" key={item._id}>
              <div className="col-8 p-15">
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
                      <strong>Category</strong> {item.category}
                    </h3>
                    <h3>
                      <strong>Edition</strong> {item.edition}
                    </h3>
                    {item.isbn && (
                      <h3>
                        <strong>ISBN Number</strong> {item.isbn}
                      </h3>
                    )}
                    <h3>
                      <strong>Condition</strong> {item.condition}
                    </h3>
                    {item.tags.length !== 0 && (
                      <h3>
                        <strong>Tags</strong>{" "}
                        {item.tags.map((tag) => `#${tag} `)}
                      </h3>
                    )}
                    <h3>
                      <strong>Quantity</strong> {item.quantity}
                    </h3>
                    <h3>
                      <strong>PKR</strong> {item.price}
                    </h3>
                    <h3>{item.description}</h3>
                  </div>
                  <div className="action_btn_container">
                    <Link className="btn" to={`/edit-product/${item._id}`}>
                      Edit Product
                    </Link>
                    <button
                      type="submit"
                      onClick={() => handleDelete(item._id)}
                      className="delete_btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
