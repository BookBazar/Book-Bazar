import React from "react";

//Depedencies
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function RouteLinks(props) {
  const { admin } = useSelector((state) => state.AdminLoginReducer);
  
  return admin ? (
    <Redirect to="/admin-store-request" />
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
}
