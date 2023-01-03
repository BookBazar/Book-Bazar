import React, { useEffect } from "react";

//Depedencies
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//styles and components
import "./Sidebar.css";
import { userInfo } from "../../store/methods/authMethods";
import { BsPlusLg } from "react-icons/bs";
import { BiStore } from "react-icons/bi";
import { AiTwotoneSetting } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { BsListNested } from "react-icons/bs";
import { USER_LOGOUT } from "../../store/constants/authConstants";
import { getStore } from "../../store/methods/sellerMethods";
import Rating from "../Rating/Rating";

export default function Sidebar() {
  const { username, isSeller } = useSelector((state) => state.UserInfoReducer);
  const { specificStore } = useSelector((state) => state.FetchStoreReducer);

  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("USER_TOKEN");
    dispatch({ type: USER_LOGOUT });
  };

  //Get user info
  useEffect(() => {
    dispatch(userInfo());
  }, [dispatch]);

  //Get Store
  useEffect(() => {
    dispatch(getStore());
  }, [dispatch]);

  return (
    <div className="sidebar">
      <nav className="links">
        <ul className="sidebar_ul">
          <Link to="/homepage">
            <li>
              <span className="sidebar_name">{username}</span>
            </li>
          </Link>
          {isSeller ? (
            <>
              <div className="home_rating">
                <Rating
                  value={specificStore.rating}
                  text={`${specificStore.numReviews} reviews`}
                />
              </div>
              {specificStore.storeType === "book" && (
                <>
                  <NavLink to="/dashboard">
                    <li>
                      <BsListNested className="sidebar_icon" />
                      <span className="sidebar_title">Products List</span>
                    </li>
                  </NavLink>
                  <NavLink to="/create-products">
                    <li>
                      <BsPlusLg className="sidebar_icon" />
                      <span className="sidebar_title">Add Products</span>
                    </li>
                  </NavLink>
                </>
              )}
              <NavLink to="/store-details">
                <li>
                  <BiStore className="sidebar_icon" />
                  <span className="sidebar_title">Store Details</span>
                </li>
              </NavLink>
              {specificStore.storeType === "book" ? (
                <NavLink to="/orders-dashboard">
                  <li>
                    <BsFillCartFill className="sidebar_icon" />
                    <span className="sidebar_title">Orders</span>
                  </li>
                </NavLink>
              ) : (
                <NavLink to="/printing-orders">
                  <li>
                    <BsFillCartFill className="sidebar_icon" />
                    <span className="sidebar_title">Orders</span>
                  </li>
                </NavLink>
              )}
            </>
          ) : (
            ""
          )}
          <NavLink to="/setting">
            <li>
              <AiTwotoneSetting className="sidebar_icon" />
              <span className="sidebar_title">Setting</span>
            </li>
          </NavLink>
          <li className="logout_btn">
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
