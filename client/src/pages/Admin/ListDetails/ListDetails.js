import React, { useEffect } from "react";

//Dependencies
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

//Styles and components
import {
  specificStoreList,
  blockUnblockStore,
} from "../../../store/methods/adminMethods";
import Loader from "../../../components/Loader/Loader";

export default function ListDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, store, errors } = useSelector(
    (state) => state.SpecificStoreListReducer
  );

  //Displaying errors
  useEffect(() => {
    if (errors.length > 0) {
      errors.map((err) => toast.error(err.msg));
    }
  }, [errors]);

  useEffect(() => {
    dispatch(specificStoreList(id));
  }, [dispatch, id]);

  //Block and Unblock Seller
  const handleBlockUnblock = (info) => {
    dispatch(blockUnblockStore(info));
    window.location.reload(false);
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
          {store.map((item) => (
            <div className="content_panel" key={item._id}>
              <div className="ml-minus-15 mr-minus-15">
                <div className="col-8 p-15">
                  <div className="create_card">
                    <Link className="btn" to="/admin-store-list">
                      Go Back
                    </Link>
                    <h3 className="card_h3">Store List</h3>
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
                      {item.isBlocked === false ? (
                        <div>
                          <input
                            type="submit"
                            value="Block Seller"
                            className="delete_btn"
                            onClick={() =>
                              handleBlockUnblock({
                                user: item.user,
                                data: true,
                              })
                            }
                          />
                        </div>
                      ) : (
                        <div>
                          <input
                            type="submit"
                            value="UnBlock Seller"
                            className="approve_btn"
                            onClick={() =>
                              handleBlockUnblock({
                                user: item.user,
                                data: false,
                              })
                            }
                          />
                        </div>
                      )}
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
