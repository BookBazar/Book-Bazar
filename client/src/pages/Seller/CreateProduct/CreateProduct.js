import React, { useState, useEffect } from "react";

//Dependencies
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

//Styles and Components
import Sidebar from "../../../components/Sidebar/Sidebar";
import Loader from "../../../components/Loader/Loader";
import { createProduct } from "../../../store/methods/sellerMethods";

export default function CreateProduct({ history }) {
  const [bookName, setBookName] = useState("");
  const [authorName, setauthorName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const { loading, success, errors } = useSelector(
    (state) => state.CreateProductReducer
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
      toast.success("Product Created Successfully");
      history.push("/dashboard");
    }
  }, [success, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        bookName,
        authorName,
        price,
        image,
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
                    <h3 className="card_h3">Add Book Details</h3>

                    <div className="group">
                      <label htmlFor="book">Book Name</label>
                      <input
                        type="text"
                        id="book"
                        className="group__control"
                        placeholder="Enter book name"
                        onChange={(e) => setBookName(e.target.value)}
                        value={bookName}
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="author">Author Name</label>
                      <input
                        type="text"
                        id="author"
                        className="group__control"
                        placeholder="Enter author Number"
                        onChange={(e) => setauthorName(e.target.value)}
                        value={authorName}
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        id="price"
                        className="group__control"
                        placeholder="Enter Price"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                      />
                    </div>

                    <div className="group">
                      <label htmlFor="image" className="image__label">
                        Book Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={fileHandler}
                      />
                    </div>

                    <div className="group">
                      <input
                        type="submit"
                        value="Add Product"
                        className="form_btn"
                      />
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
