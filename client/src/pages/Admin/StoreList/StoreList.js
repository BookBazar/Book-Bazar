import React, { useEffect } from "react";

//Dependencies
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Link, Route } from "react-router-dom";

//styles and components
import Sidebar from "../Sidebar/Sidebar";
import Loader from "../../../components/Loader/Loader";
import { storeList } from "../../../store/methods/adminMethods";
import Search from "../../../components/Search/Search";

export default function StoreList({ match }) {
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
    dispatch(storeList(keyword));
  }, [dispatch, keyword]);

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
        <Route
          render={({ history }) => (
            <Search
              history={history}
              redirect="admin-store-list"
              search="store-list-search"
            />
          )}
        />

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
