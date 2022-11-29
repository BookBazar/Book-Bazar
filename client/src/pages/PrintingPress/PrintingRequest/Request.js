import React, { useState } from "react";

//Dependencies
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

//Styles and components
import Navbar from "../../../components/Navbar/Navbar";
import Loader from "../../../components/Loader/Loader";
import { printingPressOrder } from "../../../store/methods/orderMethods";

export default function Request({history}) {
  //States
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [size, setSize] = useState("20*30");
  const [color, setColor] = useState("single");
  const [weight, setWeight] = useState(65);
  const [title, setTitle] = useState("simple");
  const [binding, setBinding] = useState("gum");
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [numberOfBooks, setNumberOfBooks] = useState(0);
  const [date, setDate] = useState("");
  const [file, setFile] = useState("");
  const [contact, setContact] = useState("");

  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.PrintingPressReducer);
  const { id } = useParams();

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
      setFile(data);
    } catch (error) {
      console.error(error);
    }
  };

  //Functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact.length !== 11) {
      toast.error("Invalid Contact Number");
      return;
    }

    dispatch(
      printingPressOrder({
        bookName,
        authorName,
        size,
        color,
        weight,
        title,
        binding,
        numberOfBooks,
        numberOfPages,
        date,
        file,
        contact,
        storeOwner: id,
      })
    );

    if(success) {
        history.push('/printing-shipping')
    }
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
                  <h3 className="card_h3">Book Details</h3>
                  <div className="group">
                    <label htmlFor="bookName">Book Name*</label>
                    <input
                      type="text"
                      id="bookName"
                      className="group__control"
                      placeholder="Enter book name"
                      onChange={(e) => setBookName(e.target.value)}
                      value={bookName}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="authorName">Author Name*</label>
                    <input
                      type="text"
                      id="authorName"
                      className="group__control"
                      placeholder="Enter author name"
                      onChange={(e) => setAuthorName(e.target.value)}
                      value={authorName}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="contact">Contact Number*</label>
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
                    <label htmlFor="pages">Number of Pages*</label>
                    <input
                      type="number"
                      id="pages"
                      className="group__control"
                      placeholder="Number of Pages"
                      min={0}
                      onChange={(e) => setNumberOfPages(e.target.value)}
                      value={numberOfPages}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="size">Page Size</label>
                    <select
                      className="group__control"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <option value="20*30">20*30 cm</option>
                      <option value="23*36">23*36 cm</option>
                    </select>
                  </div>
                  <div className="group">
                    <label htmlFor="size">Page Weight</label>
                    <select
                      className="group__control"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    >
                      <option value={65}>65g</option>
                      <option value={70}>70g</option>
                    </select>
                  </div>
                  <div className="group">
                    <label htmlFor="size">Page Colors</label>
                    <select
                      className="group__control"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    >
                      <option value="single">Single Color</option>
                      <option value="four">Four Color</option>
                    </select>
                  </div>
                  <div className="group">
                    <label htmlFor="size">Title</label>
                    <select
                      className="group__control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    >
                      <option value="simple">Simple</option>
                      <option value="flap">Flap</option>
                    </select>
                  </div>
                  <div className="group">
                    <label htmlFor="size">Page Binding</label>
                    <select
                      className="group__control"
                      value={binding}
                      onChange={(e) => setBinding(e.target.value)}
                    >
                      <option value="gum">Gum</option>
                      <option value="machine">Machine</option>
                    </select>
                  </div>
                  <div className="group">
                    <label htmlFor="books">Number of Books to print*</label>
                    <input
                      type="number"
                      id="books"
                      className="group__control"
                      placeholder="Number of books to print"
                      min={0}
                      onChange={(e) => setNumberOfBooks(e.target.value)}
                      value={numberOfBooks}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="date">Delivery Date*</label>
                    <input
                      type="date"
                      id="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="group__control"
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="image" className="image__label">
                      Attach File
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      onChange={fileHandler}
                    />
                  </div>
                  <div className="group">
                    <input type="submit" value="Next" className="form_btn" />
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
