import React, { useEffect } from "react";

//Depedencies
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Styles and components
import "./Navbar.css";
import { BsFillCartFill } from "react-icons/bs";
import { userInfo } from "../../store/methods/authMethods";
import { USER_LOGOUT } from "../../store/constants/authConstants";

export default function Navbar() {
  const { user } = useSelector((state) => state.LoginReducer);
  const { isSeller, username } = useSelector((state) => state.UserInfoReducer);
  const dispatch = useDispatch();

  //Get user info
  useEffect(() => {
    dispatch(userInfo());
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem("USER_TOKEN");
    dispatch({ type: USER_LOGOUT });
  };

  return (
    <nav className="navbar">
      <Link to="/homepage" style={{ color: "black" }}>
        <div className="logo">Urdu Bazar</div>
      </Link>
      <ul className="nav_links">
        <input type="checkbox" id="checkbox_toggle" />
        <label htmlFor="checkbox_toggle" className="hamburger">
          &#9776;
        </label>

        <div className="menu">
          <li>
            <NavLink to="/printing-homepage">
              <div className="links">Printing Press</div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-orders">
              <div className="links">My Orders</div>
            </NavLink>
          </li>
          <li>
            <span style={{ marginRight: "0.5rem" }}>
              <BsFillCartFill />
            </span>
            <NavLink to="/cart">Cart</NavLink>
          </li>
          {!isSeller && (
            <li>
              <NavLink to="/seller-form">Become a Seller</NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink to="/setting">
                <div className="links">{username}</div>
              </NavLink>
            </li>
          )}
          <li>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
}
