import React from "react";

//Depedencies
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

//styles and components
import "./Sidebar.css";
import { BsListNested } from "react-icons/bs";
import { MdOutlinePendingActions } from "react-icons/md";
import { ADMIN_LOGOUT } from "../../../store/constants/adminConstants";

export default function Sidebar() {
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("ADMIN_TOKEN");
    dispatch({ type: ADMIN_LOGOUT });
  };

  return (
    <div className="sidebar">
      <nav className="links">
        <ul className="sidebar_ul">
          <li>
            <span className="sidebar_name">Urdu Bazar</span>
          </li>
          <NavLink to="/admin-store-list">
            <li>
              <BsListNested className="sidebar_icon" />
              <span className="sidebar_title">Store List</span>
            </li>
          </NavLink>
          <NavLink to="/admin-store-request">
            <li>
              <MdOutlinePendingActions className="sidebar_icon" />
              <span className="sidebar_title">Store Request</span>
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
