import React, { useEffect } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { Link, Route } from "react-router-dom";

//styles and components
import "./Home.css";
import Navbar from "../../../components/Navbar/Navbar";
import Loader from "../../../components/Loader/Loader";
import { getStores } from "../../../store/methods/sellerMethods";
import Rating from "../../../components/Rating/Rating";
import Search from "../../../components/Search/Search";

export default function Home({ match }) {
  const { loading, stores } = useSelector((state) => state.FetchStoresReducer);
  const dispatch = useDispatch();

  const keyword = match.params.keyword;

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
          <Route
            render={({ history }) => (
              <Search
                history={history}
                redirect="homepage"
                search="store-search"
              />
            )}
          />
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
