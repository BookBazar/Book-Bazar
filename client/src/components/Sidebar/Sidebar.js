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

export default function Sidebar() {
  const { username, isSeller } = useSelector((state) => state.UserInfoReducer);

  const dispatch = useDispatch();

  //Get user info
  useEffect(() => {
    dispatch(userInfo());
  }, [dispatch]);

  return (
    <div className="sidebar">
      <nav className="links">
        <ul className="sidebar_ul">
          <Link to="/dashboard">
            <li>
              <span className="sidebar_name">{username}</span>
            </li>
          </Link>
          {isSeller ? (
            <>
              <NavLink to="/create-products">
                <li>
                  <BsPlusLg className="sidebar_icon" />
                  <span className="sidebar_title">Add Products</span>
                </li>
              </NavLink>
              <NavLink to="/store-details">
                <li>
                  <BiStore className="sidebar_icon" />
                  <span className="sidebar_title">Store Details</span>
                </li>
              </NavLink>
              <NavLink to="/orders-dashboard">
                <li>
                  <BsFillCartFill className="sidebar_icon" />
                  <span className="sidebar_title">Orders</span>
                </li>
              </NavLink>
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
        </ul>
      </nav>
    </div>
  );
}
