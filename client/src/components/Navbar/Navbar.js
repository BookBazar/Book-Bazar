import React, { useEffect } from "react";

//Depedencies
import { Link } from "react-router-dom";
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
      <Link to="/" style={{ color: "black" }}>
        <div className="logo">Urdu Bazar</div>
      </Link>
      <ul className="nav_links">
        <input type="checkbox" id="checkbox_toggle" />
        <label htmlFor="checkbox_toggle" className="hamburger">
          &#9776;
        </label>

        <div className="menu">
          <li>
            <span style={{ marginRight: "0.5rem" }}>
              <BsFillCartFill />
            </span>
            <Link to="/cart">Cart</Link>
          </li>
          {!isSeller && (
            <li>
              <Link to="/seller-form">Become a Seller</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/dashboard">
                <div className="links">{username}</div>
              </Link>
            </li>
          )}
          <li>
            <button className="btn" onClick={logout}>Logout</button>
          </li>
        </div>
      </ul>
    </nav>
  );
}
