import React, { useState, useEffect } from "react";

//Dependencies
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

//Styles and components
import "./Form.css";
import Navbar from "../../../components/Navbar/Navbar";
import Loader from "../../../components/Loader/Loader";
import { createStore } from "../../../store/methods/sellerMethods";

export default function Form({ history }) {
  //States
  const [storeName, setStoreName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [storeType, setStoreType] = useState("book");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [isCustomer, setIsCustomer] = useState("");

  const dispatch = useDispatch();
  const { loading, success, errors } = useSelector(
    (state) => state.CreateStoreReducer
  );

  //Image Upload Functionality
  const fileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload/image", formData, config);
      setImage(data);
    } catch (error) {
      console.error(error);
    }
  };

  //Display Error
  useEffect(() => {
    if (errors.length > 0) {
      errors.map((error) => toast.error(error.msg));
    }
  }, [errors]);

  //Display Success
  useEffect(() => {
    if (success) {
      toast.success("Store request sent successfully");
      history.push("/homepage");
    }
  }, [success, history]);

  //Functions
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createStore({
        storeName,
        ownerName,
        contact,
        email,
        storeType,
        address,
        location,
        image,
        isCustomer,
      })
    );
  };

  return (
    <div className="create mt-10">
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
      <div>
        <Navbar />
      </div>
      {!loading ? (
        <div className="form_container">
          <form onSubmit={handleSubmit}>
            <div className="row ml-minus-15 mr-minus-15">
              <div className="col-6 p-15">
                <div className="create_card">
                  <h3 className="card_h3">Create a Store</h3>
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
                    <label htmlFor="name">Owner Name</label>
                    <input
                      type="text"
                      id="name"
                      className="group__control"
                      placeholder="Enter owner name"
                      onChange={(e) => setOwnerName(e.target.value)}
                      value={ownerName}
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
                    <label htmlFor="email">Store Type</label>
                    <select
                      className="group__control"
                      value={storeType}
                      onChange={(e) => setStoreType(e.target.value)}
                    >
                      <option value="book">Book</option>
                      <option value="printing">Printing Press</option>
                    </select>
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
                    <label htmlFor="location">Location (Optional)</label>
                    <input
                      type="text"
                      id="location"
                      className="group__control"
                      placeholder="Enter Google Map Link"
                      onChange={(e) => setLocation(e.target.value)}
                      value={location}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="image" className="image__label">
                      Store Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      onChange={fileHandler}
                    />
                  </div>
                  <div className="group">
                    <label>Do you have an existing store with us?</label>
                    <div>
                      <input
                        type="radio"
                        id="topping"
                        name="topping"
                        value="Yes"
                        onClick={() => setIsCustomer("Yes")}
                      />{" "}
                      Yes
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="topping"
                        name="topping"
                        value="No"
                        onClick={() => setIsCustomer("No")}
                      />{" "}
                      No
                    </div>
                  </div>
                  <div className="group">
                    <input type="submit" value="Apply" className="form_btn" />
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
  );
}
