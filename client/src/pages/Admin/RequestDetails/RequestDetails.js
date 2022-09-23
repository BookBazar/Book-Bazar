import React, { useEffect } from "react";

//Dependencies
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

//Styles and components
import "./RequestDetails.css";
import {
  specificStoreRequest,
  approveStore,
  deleteStore
} from "../../../store/methods/adminMethods";
import Loader from "../../../components/Loader/Loader";

export default function RequestDetails({ history }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, storeDetails } = useSelector(
    (state) => state.SpecificStoreReducer
  );
  const { success, errors } = useSelector((state) => state.ApproveStoreReducer);

  //Displaying errors
  useEffect(() => {
    if (errors.length > 0) {
      errors.map((err) => toast.error(err.msg));
    }
  }, [errors]);

  //Display Success
  useEffect(() => {
    if (success) {
      toast.success("Store Approved Successfully");
    }
  }, [success]);

  useEffect(() => {
    dispatch(specificStoreRequest(id));
  }, [dispatch, id]);

  //Approve Request
  const handleApprove = (user) => {
    dispatch(approveStore(user));
    history.push("/admin-store-request");
  };

   //Delete Request
   const handleDelete = (id) => {
    dispatch(deleteStore(id));
    history.push("/admin-store-request");
  };

  return (
    <div>
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
      {!loading ? (
        <div>
          {storeDetails.map((item) => (
            <div className="post__details" key={item._id}>
              <div  className="detail_container">
                <div className="post__body__image">
                  <img src={`${item.image}`} alt={item.image} />
                </div>
                <div className="detail_content">
                  <span>
                    <strong>Store Name:</strong> {item.storeName}
                  </span>
                  <span>
                    <strong>Owner Name:</strong> {item.ownerName}
                  </span>
                  <span>
                    <strong>Contact Number:</strong> {item.contact}
                  </span>
                  <span>
                    <strong>Email:</strong> {item.email}
                  </span>
                  <span>
                    <strong>Store Type:</strong> {item.storeType}
                  </span>
                  <span>
                    <strong>Address:</strong> {item.address}
                  </span>
                  <span>
                    <strong>Location:</strong> {item.location}
                  </span>
                </div>
                <div className="action_btn_container">
                  <button
                    type="submit"
                    onClick={() => handleApprove(item.user)}
                    className="approve_btn"
                  >
                    Approve
                  </button>
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
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
