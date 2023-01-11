import React from "react";

//Dependencies
import { Link } from "react-router-dom";

//Styles and components
import "./Footer.css";
import { BsFacebook } from "react-icons/bs";
import { BsSnapchat } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import APP_STORE from "../../assets/app store.png";
import PLAY_STORE from "../../assets/play store.png";

export default function Footer() {
  return (
    <div className="footer-clean">
      <footer>
        <div className="container-footer">
          <div className="footer-main">
            <div className="footer-content">
              <div className="row justify-content-center">
                <div className="footer-content-container">
                  <div className="col-sm-4 col-md-3 item">
                    <h1
                      className="webmaintitle"
                      style={{ margin: "0", padding: "0", border: "none" }}
                    >
                      BookBazar
                    </h1>
                    <h3 style={{ fontSize: "1.5rem" }}>
                      Urdu Bazar in Your Hands
                    </h3>
                    <ul>
                      <h3 style={{ fontSize: "1rem" }}>Contact Us</h3>
                      <li>
                        <Link to="#" style={{ fontWeight: "700" }}>
                          Contact Number: +923486791745
                        </Link>
                      </li>
                      <li>
                        <Link to="#" style={{ fontWeight: "700" }}>
                          Email Address: bookbazar@gmail.com
                        </Link>
                      </li>
                      <li>
                        <Link to="#" style={{ fontWeight: "700" }}>
                          Address: Lahore, Pakistan
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-downloads">
              <div className="col-lg-3 item social">
                <Link to="#" style={{'all': 'unset'}}>
                  <img src={APP_STORE} alt="App Store" className="store_logo" />
                </Link>
                <Link to="#" style={{'all': 'unset'}}>
                  <img
                    src={PLAY_STORE}
                    alt="PLay Store"
                    className="store_logo"
                  />
                </Link>
              </div>
              <p
                className="copyright"
                style={{ fontWeight: "700", fontSize: "1.3rem" }}
              >
                Download our app
              </p>
            </div>
          </div>
          <div className="footer-socials">
            <div className="col-lg-3 item social">
              <Link to="#">
                <BsFacebook className="icon" />
              </Link>
              <Link to="#">
                <AiFillTwitterCircle className="icon" />
              </Link>
              <Link to="#">
                <BsSnapchat className="icon" />
              </Link>
              <Link to="#">
                <AiFillInstagram className="icon" />
              </Link>
            </div>
            <p
              className="copyright"
              style={{ fontWeight: "700", fontSize: "1rem" }}
            >
              ©BookBazar2023. Powered by Final Year Project
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
