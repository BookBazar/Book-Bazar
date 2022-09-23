import React from "react";

//Depedencies
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoutes(props){
  const { user } = useSelector((state) => state.LoginReducer);

  return user ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
};

