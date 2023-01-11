import React, { useEffect, useState } from "react";

//Dependencies
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Link, Route } from "react-router-dom";

//styles and components
import Sidebar from "../Sidebar/Sidebar";
import Rating from "../../../components/Rating/Rating";
import Loader from "../../../components/Loader/Loader";
import { storeList } from "../../../store/methods/adminMethods";
import Search from "../../../components/Search/Search";

export default function StoreList({ match }) {
  const [value, setValue] = useState("all");

  const dispatch = useDispatch();
  const { loading, errors, storeListData } = useSelector(
    (state) => state.StoreListReducer
  );
  const keyword = match.params.keyword;

  //Displaying errors
  useEffect(() => {
    if (errors.length > 0) {
      errors.map((err) => toast.error(err.msg));
    }
  }, [errors]);

  useEffect(() => {
    dispatch(storeList({ keyword, value }));
  }, [dispatch, keyword, value]);

  return (
    <div className="container_admin" style={{ marginLeft: "3rem" }}>
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
      <div className="content_panel" style={{ marginTop: "2rem" }}>
        <Route
          render={({ history }) => (
            <Search
              history={history}
              redirect="admin-store-list"
              search="store-list-search"
            />
          )}
        />
        <div className=" ml-minus-15">
          <div className="col-8 p-15">
            <h3 className="card_h3">Filters</h3>
            <input
              type="radio"
              id="topping"
              name="topping"
              value="all"
              onClick={() => setValue("all")}
            />{" "}
            All
            <input
              type="radio"
              id="topping"
              name="topping"
              value="block"
              onClick={() => setValue("block")}
            />{" "}
            Block
            <input
              type="radio"
              id="topping"
              name="topping"
              value="unBlock"
              onClick={() => setValue("unblock")}
            />{" "}
            Unblock
          </div>
        </div>
        {!loading ? (
          storeListData.map((item) => (
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
                    <h2>{item.storeName}</h2>
                    <h3>{item.address}</h3>
                    <Rating
                      value={item.rating}
                      text={`${item.numReviews} reviews`}
                    />
                  </div>
                  <Link className="btn" to={`/list-details/${item._id}`}>
                    View Details
                  </Link>
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
