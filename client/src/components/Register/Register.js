import React, { useState, useEffect } from "react";

//Dependencies
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

//Styles and components
import { userRegister } from "../../store/methods/authMethods";

export default function Register({ history }) {
  //States
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, errors, user, success } = useSelector(
    (state) => state.SignupReducer
  );

  //Displaying errors
  useEffect(() => {
    if (errors.length > 0) {
      errors.map((err) => toast.error(err.msg));
    }
  }, [errors, user]);

  //Display Success
  useEffect(() => {
    if (success) {
      toast.success("Account Created Successfully");
      history.push("/login");
    }
  }, [success, history]);

  //Functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Invalid Password");
      return;
    }

    setEmail(email);
    setPassword(password);
    setConfirmPassword(confirmPassword);
    setUsername(username);

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      dispatch(userRegister({ username, email, password }));
    } else {
      toast.error("Invalid Email");
    }
  };

  return (
    <div className="webloginsection">
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
      <div className="auth_content">
        <div className="weblogintop">
          <h1 className="webmaintitle">BOOKBAZAR</h1>
          <h3 style={{ fontSize: "1.5rem" }}>Urdu Bazar in Your Hands</h3>
        </div>
        <div className="ttp">
          <h3>Welcome to BookBazar! Please enter details</h3>
        </div>
        <form className="auth_form" onSubmit={handleSubmit}>
          <div className="centerlayout">
            <div>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
                className="LoginInput"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                className="LoginInput"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                className="LoginInput"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="LoginInput"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
          </div>

          <div className="btnalign">
            {!loading && (
              <button className="WebLoginbtn" type="submit">
                Signup
              </button>
            )}
            {loading && (
              <button className="WebLoginbtn" type="submit">
                Loading....
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
