import React, { useState } from "react";

export default function Search({ history, redirect, search }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/${search}/${keyword}`);
    } else {
      history.push(`/${redirect}`);
    }
  };

  return (
    <div className="content_panel">
      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <div className="row ml-minus-15 mr-minus-15">
            <div className="col-6 p-15">
                <div className="group">
                  <input
                    type="text"
                    naem="q"
                    className="group__control"
                    placeholder="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn"
                    style={{ marginLeft: "1rem" }}
                  >
                    Search
                  </button>
                </div>
              </div>
              <span></span>
            </div>
        </form>
      </div>
    </div>
  );
}
