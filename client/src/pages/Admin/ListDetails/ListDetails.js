import React, { useEffect } from "react";

//Dependencies
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

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
            <div className="post__details" key={item._id}>
              <div className="detail_container">
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
                  {item.isBlocked === false ? (
                    <button
                      type="submit"
                      className="delete_btn"
                      onClick={() =>
                        handleBlockUnblock({ user: item.user, data: true })
                      }
                    >
                      Block Seller
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="approve_btn"
                      onClick={() =>
                        handleBlockUnblock({ user: item.user, data: false })
                      }
                    >
                      UnBlock Seller
                    </button>
                  )}
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
