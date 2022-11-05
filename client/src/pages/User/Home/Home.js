import React, { useEffect, useState } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//styles and components
import "./Home.css";
import Navbar from "../../../components/Navbar/Navbar";
import Loader from "../../../components/Loader/Loader";
import { getStores } from "../../../store/methods/sellerMethods";
import Rating from "../../../components/Rating/Rating";
import Search from "../../../components/Search/Search";

export default function Home({ match }) {
  const [keyword, setKeyword] = useState("");

  const { loading, stores } = useSelector((state) => state.FetchStoresReducer);
  const dispatch = useDispatch();

  //Stores data
  useEffect(() => {
    dispatch(getStores(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          {/* Search */}
          <div className="content_panel">
            <div className="form_container">
              <div className="row ml-minus-15 mr-minus-15">
                <div className="col-6 p-15">
                  <div className="create_card">
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
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="main">
              {stores.map((store) => (
                <div className="home_detail" key={store._id}>
                  <Link to={`/products/${store.user}`}>
                    <div className="home_img">
                      <img src={store.image} alt={store.storeName} />
                    </div>
                    <h1>{store.storeName}</h1>
                    <p className="information">{store.address}</p>
                    <div className="home_rating">
                      <Rating
                        value={store.rating}
                        text={`${store.numReviews} reviews`}
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    </>
  );
}
