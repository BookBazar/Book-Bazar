import React, { useEffect } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//styles and components
import "./Home.css";
import Navbar from "../../../components/Navbar/Navbar";
import Loader from "../../../components/Loader/Loader";
import { getStores } from "../../../store/methods/sellerMethods";
import Rating from "../../../components/Rating/Rating";

export default function Home() {
  const { loading, stores } = useSelector((state) => state.FetchStoresReducer);
  const dispatch = useDispatch();

  //Stores data
  useEffect(() => {
    dispatch(getStores());
  }, [dispatch]);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="main">
              {stores.map((store) => (
                <div className="home_detail" key={store._id}>
                  <Link to={`/products/${store.user}`}>
                    <div className="home_img">
                      <img
                        src={store.image}
                        alt={store.storeName}
                      />
                    </div>
                    <h1>{store.storeName}</h1>
                    <p className="information">{store.address}</p>
                    <div className="home_rating">
                      <Rating />
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
