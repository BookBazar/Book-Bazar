import React from "react";

//Depedencies
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function RouteLinks(props) {
  const { user } = useSelector((state) => state.LoginReducer);

  return user ? (
    <Redirect to="/homepage" />
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
}
