import React, { useEffect } from "react";

//Dependencies
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import fileDownload from "js-file-download";
import axios from "axios";

//styles and components
import { printingCreateOrder } from "../../../store/methods/orderMethods";
import { PRINTING_ORDER_CREATE_RESET } from "../../../store/constants/orderConstants";
import Loader from "../../../components/Loader/Loader";
import Navbar from "../../../components/Navbar/Navbar";

export default function Summary({ history }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);
  const { loading, success } = useSelector(
    (state) => state.PrintingCreateOrderReducer
  );
  const extension = cart.printingItems.file.split(".")[1];

  //Variables
  const no_of_pages = cart.printingItems.numberOfPages;
  const no_of_books = cart.printingItems.numberOfBooks;
  let size = 0;
  let weight = 0;
  let color = 0;
  let title = 0;
  let binding = 0;

  //Conditionally rendering prices
  if (cart.printingItems.size === "20*30") size = 0.1;
  if (cart.printingItems.size === "23*36") size = 0.2;
  if (cart.printingItems.weight === 65) weight = 0.2;
  if (cart.printingItems.weight === 70) weight = 0.3;
  if (cart.printingItems.color === "single") color = 0.25;
  if (cart.printingItems.color === "four") color = 0.5;
  if (cart.printingItems.title === "simple") title = 10;
  if (cart.printingItems.title === "flap") title = 12;
  if (cart.printingItems.binding === "gum") binding = 10;
  if (cart.printingItems.binding === "machine") binding = 15;

  //Edge Cases
  if (!cart.shippingAddress) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }

  //Calculate Prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    (no_of_books * no_of_pages * (size + weight + color) +
      no_of_books * (title + binding)) *
      2
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 1000 ? 0 : 50);
  cart.taxPrice = addDecimals(Number((0.05 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  //Cleaning up
  useEffect(() => {
    if (success) {
      history.push("/printing-homepage");
      dispatch({ type: PRINTING_ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [success, history, dispatch]);

  //Place Order
  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      printingCreateOrder({
        price: cart.totalPrice,
        printingItems: [cart.printingItems],
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
      })
    );
  };

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
    <>
      <div>
        <Navbar />
      </div>
      {!loading ? (
        <div className="summary_container">
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
          <div className="summary_content">
            <div className="summary_content_address">
              <h2 className="summary_title_h2">Shipping</h2>
              <p className="summary_subtitle">
                <strong style={{ fontWeight: "normal" }}>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div className="summary_content_payment">
              <h2 className="summary_title_h2">Payment Method</h2>
              <p className="summary_subtitle">
                <strong style={{ fontWeight: "normal" }}>Method: </strong>
                {cart.paymentMethod}
              </p>
            </div>
            <div className="summary_content_items">
              <h2 className="summary_title_h2">Order Item</h2>
              {!cart.printingItems === 0 ? (
                toast.error("Your Cart is Empty")
              ) : (
                <>
                  <div className="summary_calculation_styles">
                    <strong>Book Name</strong>
                    <span>{cart.printingItems.bookName}</span>
                  </div>
                  <div className="summary_calculation_styles">
                    <strong>Author Name</strong>
                    <span>{cart.printingItems.authorName}</span>
                  </div>
                  <div className="summary_calculation_styles">
                    <strong>Size</strong>
                    <span>{cart.printingItems.size}</span>
                  </div>
                  <div className="summary_calculation_styles">
                    <strong>Color</strong>
                    <span>{cart.printingItems.color}</span>
                  </div>
                  <div className="summary_calculation_styles">
                    <strong>Weight</strong>
                    <span>{cart.printingItems.weight}</span>
                  </div>
                  <div className="summary_calculation_styles">
                    <strong>Title</strong>
                    <span>{cart.printingItems.title}</span>
                  </div>
                  <div className="summary_calculation_styles">
                    <strong>Binding</strong>
                    <span>{cart.printingItems.binding}</span>
                  </div>
                  <div className="summary_calculation_styles">
                    <strong>Number of Pages</strong>
                    <span>{cart.printingItems.numberOfPages}</span>
                  </div>
                  <div className="summary_calculation_styles">
                    <strong>Number of Books</strong>
                    <span>{cart.printingItems.numberOfBooks}</span>
                  </div>
                  <div className="summary_calculation_styles">
                    <strong>Delivery Date</strong>
                    <span>{cart.printingItems.date}</span>
                  </div>
                  <div className="summary_calculation_styles">
                    <strong>Contact Info</strong>
                    <span>{cart.printingItems.contact}</span>
                  </div>
                  <div className="summary_calculation_styles">
                    <strong>Attach File</strong>
                    <span>
                      <button
                        onClick={() => {
                          handleDownload(
                            cart.printingItems.file,
                            `download.${extension}`
                          );
                        }}
                      >
                        Download
                      </button>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="summary_calculation">
            <h2 className="summary_title_h2">Order Summary</h2>
            <div className="summary_calculation_styles">
              <span>Items</span>
              <span>PKR {cart.itemsPrice}</span>
            </div>
            <div className="summary_calculation_styles">
              <span>Shipping</span>
              <span>PKR {cart.shippingPrice}</span>
            </div>
            <div className="summary_calculation_styles">
              <span>Tax</span>
              <span>PKR {cart.taxPrice}</span>
            </div>
            <div className="summary_calculation_styles">
              <span>Total</span>
              <span>PKR {cart.totalPrice}</span>
            </div>
            <div className="summary_calculation_btn">
              <button
                className="btn btn_status"
                onClick={placeOrderHandler}
                type="submit"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
