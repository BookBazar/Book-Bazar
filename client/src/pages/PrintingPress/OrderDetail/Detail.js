import React, { useEffect } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import fileDownload from "js-file-download";
import axios from "axios";

//Styles and components
import Loader from "../../../components/Loader/Loader";
import { getPrintingOrder } from "../../../store/methods/orderMethods";

export default function Detail() {
  const { printingOrder, loading } = useSelector(
    (state) => state.FetchPrintingOrderReducer
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  let extension;
  let file;

  printingOrder.forEach((e) => {
    e.printingItems.forEach((x) => {
      file = x.file;
      extension = x.file.split(".")[1];
    });
  });

  //Fetch Order
  useEffect(() => {
    dispatch(getPrintingOrder(id));
  }, [dispatch, id]);

  //Download File
  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <div className="product_main">
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
      <Link className="btn" to="/printing-orders">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : (
        printingOrder.map((item) => (
          <div className="summary_container" key={item._id}>
            <div className="summary_content">
              <div className="summary_content_address">
                <h2 className="summary_title_h2">Shipping</h2>
                <p className="summary_subtitle">
                  <strong style={{ fontWeight: "normal" }}>Address: </strong>
                  {item.shippingAddress.address}, {item.shippingAddress.city},{" "}
                  {item.shippingAddress.postalCode},{" "}
                  {item.shippingAddress.country}
                </p>
              </div>
              <div className="summary_content_payment">
                <h2 className="summary_title_h2">Payment Method</h2>
                <p className="summary_subtitle">
                  <strong style={{ fontWeight: "normal" }}>Method: </strong>
                  {item.paymentMethod}
                </p>
              </div>
              <div className="summary_content_items">
                <h2 className="summary_title_h2">Order Item</h2>
                {!item.printingItems.length === 0 ? (
                  toast.error("Your Cart is Empty")
                ) : (
                  <>
                    {item.printingItems.map((detail) => (
                      <div key={detail._id}>
                        <div className="summary_calculation_styles">
                          <strong>Book Name</strong>
                          <span>{detail.bookName}</span>
                        </div>
                        <div className="summary_calculation_styles">
                          <strong>Author Name</strong>
                          <span>{detail.authorName}</span>
                        </div>
                        <div className="summary_calculation_styles">
                          <strong>Size</strong>
                          <span>{detail.size}</span>
                        </div>
                        <div className="summary_calculation_styles">
                          <strong>Color</strong>
                          <span>{detail.color}</span>
                        </div>
                        <div className="summary_calculation_styles">
                          <strong>Weight</strong>
                          <span>{detail.weight}</span>
                        </div>
                        <div className="summary_calculation_styles">
                          <strong>Title</strong>
                          <span>{detail.title}</span>
                        </div>
                        <div className="summary_calculation_styles">
                          <strong>Binding</strong>
                          <span>{detail.binding}</span>
                        </div>
                        <div className="summary_calculation_styles">
                          <strong>Number of Pages</strong>
                          <span>{detail.numberOfPages}</span>
                        </div>
                        <div className="summary_calculation_styles">
                          <strong>Number of Books</strong>
                          <span>{detail.numberOfBooks}</span>
                        </div>
                        <div className="summary_calculation_styles">
                          <strong>Delivery Date</strong>
                          <span>{detail.date}</span>
                        </div>
                        <div className="summary_calculation_styles">
                          <strong>Contact Info</strong>
                          <span>{detail.contact}</span>
                        </div>
                        <div className="summary_calculation_styles">
                          <strong>Attach File</strong>
                          <span>
                            <button
                              onClick={() => {
                                handleDownload(file, `download.${extension}`);
                              }}
                            >
                              Download
                            </button>
                          </span>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="summary_calculation">
              <h2 className="summary_title_h2">Order Summary</h2>
              <div className="summary_calculation_styles">
                <span>Items</span>
                <span>PKR {item.price}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
