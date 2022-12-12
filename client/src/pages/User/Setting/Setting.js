import React, { useState, useEffect } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

//styles and components
import Sidebar from "../../../components/Sidebar/Sidebar";
import {
  updateUserProfile,
  updateUserPassword,
} from "../../../store/methods/authMethods";

export default function Setting() {
  //States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { username, email: userEmail } = useSelector(
    (state) => state.UserInfoReducer
  );
  const { success, errors } = useSelector(
    (state) => state.UpdateUserProfileReducer
  );

  //Display Error
  useEffect(() => {
    if (errors.length > 0) {
      errors.map((error) => toast.error(error.msg));
    }
  }, [errors]);

  //Display Success
  useEffect(() => {
    if (success) {
      toast.success("Profile updated succesfully");
    }
  }, [success]);

  //UseEffect
  useEffect(() => {
    setName(username);
    setEmail(userEmail);
  }, [username, userEmail]);

  //Functions
  const updateProfileHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ name, email }));
  };

  const updatePasswordHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserPassword({ currentPassword, password }));
    setCurrentPassword("");
    setPassword("");
  };
  return (
    <div className="container_admin">
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
      <div className="sidebar_panel">
        <Sidebar />
      </div>
      <div className="content_panel">
        <form onSubmit={updateProfileHandler}>
          <div className="ml-minus-15 mr-minus-15">
            <div className="col-8 p-15">
              <div className="create_card">
                <h3 className="card_h3">Update Profile</h3>
                <div className="group">
                  <label htmlFor="name">Update Name</label>
                  <input
                    type="text"
                    id="name"
                    className="group__control"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="email">Update Email</label>
                  <input
                    type="email"
                    id="email"
                    className="group__control"
                    placeholder="Enter email"
                    readOnly
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="group">
                  <button className="btn btn_status" type="submit">
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <form onSubmit={updatePasswordHandler}>
          <div className="ml-minus-15 mr-minus-15">
            <div className="col-8 p-15">
              <div className="create_card">
                <h3 className="card_h3">Update Password</h3>
                <div className="group">
                  <label htmlFor="currentPassword">Current password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    className="group__control"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="password">Update password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="group__control"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="group">
                  <button className="btn btn_status" type="submit">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
