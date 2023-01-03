import React, { useEffect } from "react";

//Dependencies
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

//Styles and components
import "./RequestDetails.css";
import {
  specificStoreRequest,
  approveStore,
  deleteStore,
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
            <div className="content_panel" key={item._id}>
              <div className="ml-minus-15 mr-minus-15">
                <div className="col-8 p-15">
                  <div className="create_card">
                    <Link className="btn" to="/admin-store-request">
                      Go Back
                    </Link>
                    <h3 className="card_h3">Store Request</h3>
                    <div className="post__body__image">
                      <img src={`${item.image}`} alt={item.image} />
                    </div>
                    <div className="group">
                      <label htmlFor="storeName">Store Name</label>
                      <input
                        type="text"
                        id="storeName"
                        className="group__control"
                        value={item.storeName}
                        readOnly
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="contact">Phone Number</label>
                      <input
                        type="text"
                        id="contact"
                        className="group__control"
                        value={item.contact}
                        readOnly
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        id="email"
                        className="group__control"
                        value={item.email}
                        readOnly
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="ownerName">Owner Name</label>
                      <input
                        type="text"
                        id="ownerName"
                        className="group__control"
                        value={item.ownerName}
                        readOnly
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        className="group__control"
                        value={item.contact}
                        readOnly
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="type">Store Type</label>
                      <input
                        type="text"
                        id="type"
                        className="group__control"
                        value={item.storeType}
                        readOnly
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="location">Location</label>
                      <input
                        type="text"
                        id="location"
                        className="group__control"
                        value={item.location}
                        readOnly
                      />
                    </div>
                    <div className="action_btn_container">
                      <div>
                        <input
                          type="submit"
                          value="Approve"
                          className="approve_btn"
                          onClick={() => handleApprove(item.user)}
                        />
                      </div>
                      <div>
                        <input
                          type="submit"
                          value="Delete"
                          className="delete_btn"
                          onClick={() => handleDelete(item._id)}
                        />
                      </div>
                    </div>
                  </div>
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

