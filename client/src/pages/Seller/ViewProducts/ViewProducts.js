import React, { useEffect } from "react";

//Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

//Styles and Components
import Loader from "../../../components/Loader/Loader";
import Sidebar from "../../../components/Sidebar/Sidebar";
import {
  getProducts,
  deleteProduct,
} from "../../../store/methods/sellerMethods";

export default function ViewProducts({ history }) {
  const dispatch = useDispatch();
  const { loading, errors, products } = useSelector(
    (state) => state.FetchProductsReducer
  );

  //Displaying errors
  useEffect(() => {
    if (errors.length > 0) {
      errors.map((err) => toast.error(err.msg));
    }
  }, [errors]);

  //Fetch Products
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  //Delete Request
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload(false);
  };

  return (
    <div className="container_admin">
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
      <div className="content_panel">
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
                    />
                  </div>
                  <div className="item_content">
                    <h2>{item.bookName}</h2>
                    <h3>{item.authorName}</h3>
                    <h3>PKR {item.price}</h3>
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
