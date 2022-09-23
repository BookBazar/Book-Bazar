import React from "react";

//Styles and components
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader_container">
      <div className="lds-dual-ring"></div>
    </div>
  );
}
