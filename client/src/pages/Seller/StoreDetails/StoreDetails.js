import React, { useState, useEffect } from "react";

//Dependencies
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

//Styles and Components
import Sidebar from "../../../components/Sidebar/Sidebar";
import Loader from "../../../components/Loader/Loader";
import { getStore, updateStore } from "../../../store/methods/sellerMethods";

export default function StoreDetails({ history }) {
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const { specificStore } = useSelector((state) => state.FetchStoreReducer);
  const { user } = useSelector((state) => state.LoginReducer);
  const { loading, success, errors } = useSelector(
    (state) => state.UpdateStoreReducer
  );

  //Fetching Product and populating data
  useEffect(() => {
    if (specificStore.user !== user) {
      dispatch(getStore());
    }
    setStoreName(specificStore.storeName);
    setEmail(specificStore.email);
    setContact(specificStore.contact);
    setAddress(specificStore.address);
  }, [dispatch, user, specificStore]);

  //Display Error
  useEffect(() => {
    if (errors.length > 0) {
      errors.map((error) => toast.error(error.msg));
    }
  }, [errors]);

  //Display Success
  useEffect(() => {
    if (success) {
      toast.success("Store Updated Successfully");
    //   history.push("/dashboard");
    }
  }, [success, history]);

  //Edit Store
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateStore({
        storeName,
        email,
        contact,
        address,
      })
    );
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
          <div className="form_container">
            <form onSubmit={handleSubmit}>
              <div className="row ml-minus-15 mr-minus-15">
                <div className="col-6 p-15">
                  <div className="create_card">
                    <h3 className="card_h3">Edit Store Details</h3>
                    <div className="group">
                      <label htmlFor="storeName">Store Name</label>
                      <input
                        type="text"
                        id="storeName"
                        className="group__control"
                        placeholder="Enter store name"
                        onChange={(e) => setStoreName(e.target.value)}
                        value={storeName}
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="group__control"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="contact">Contact Number</label>
                      <input
                        type="text"
                        id="contact"
                        className="group__control"
                        placeholder="Enter Contact Number"
                        onChange={(e) => setContact(e.target.value)}
                        value={contact}
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        className="group__control"
                        placeholder="Enter Address"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                      />
                    </div>
                    <div className="group">
                      <input type="submit" value="Edit" className="form_btn" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
