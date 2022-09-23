import React, { useEffect } from "react";

//Dependencies
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

//styles and components
import Sidebar from "../Sidebar/Sidebar";
import Loader from "../../../components/Loader/Loader";
import { storeList } from "../../../store/methods/adminMethods";
import { Link } from "react-router-dom";

export default function StoreList() {
  const dispatch = useDispatch();
  const { loading, errors, storeListData } = useSelector(
    (state) => state.StoreListReducer
  );

  //Displaying errors
  useEffect(() => {
    if (errors.length > 0) {
      errors.map((err) => toast.error(err.msg));
    }
  }, [errors]);

  useEffect(() => {
    dispatch(storeList());
  }, [dispatch]);

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
