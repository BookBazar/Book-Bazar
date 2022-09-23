import React, { useState, useEffect } from "react";

//Dependecies
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

//Styles and Components
import { adminLogin } from "../../../store/methods/adminMethods";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, errors, admin, success } = useSelector(
    (state) => state.AdminLoginReducer
  );

  //Displaying errors
  useEffect(() => {
    if (errors.length > 0) {
      errors.map((err) => toast.error(err.msg));
    }
  }, [errors, admin]);

  //Display Success
  useEffect(() => {
    if (success) {
      toast.success("Login Successfully");
    }
  }, [success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin({ email, password }));

    setEmail("");
    setPassword("");
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
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
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
          </div>
          WebLoginbtn
          <div className="btnalign">
            {!loading && (
              <button className="WebLoginbtn" type="submit">
                Login
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
