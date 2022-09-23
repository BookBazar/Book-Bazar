import React from "react";

//Depedencies
import { Link } from "react-router-dom";
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
    <nav className="sidebar">
      <ul className="sidebar_ul">
        <li>
          <span className="sidebar_name">Urdu Bazar</span>
        </li>
        <Link to="/admin-store-list">
          <li>
            <BsListNested className="sidebar_icon" />
            <span className="sidebar_title">Store List</span>
          </li>
        </Link>
        <Link to="/admin-store-request">
          <li>
            <MdOutlinePendingActions className="sidebar_icon" />
            <span className="sidebar_title">Store Request</span>
          </li>
        </Link>
        <li>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
