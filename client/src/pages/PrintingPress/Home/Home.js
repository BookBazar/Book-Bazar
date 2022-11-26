import React, { useEffect } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//styles and components
import Navbar from "../../../components/Navbar/Navbar";
import Loader from "../../../components/Loader/Loader";
import { getAllPrintingPress } from "../../../store/methods/sellerMethods";
import Rating from "../../../components/Rating/Rating";

export default function Home() {
  const { loading, allPrintingPress } = useSelector((state) => state.AllPrintingPressReducer);
  const dispatch = useDispatch();

  //Stores data
  useEffect(() => {
    dispatch(getAllPrintingPress());
  }, [dispatch]);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <>
        <div className="home_section">
          <div className="auth_content">
            <div className="weblogintop">
              <h1 className="webmaintitle">BOOKBAZAR</h1>
              <h3 style={{ fontSize: "1.5rem" }}>Urdu Bazar in Your Hands</h3>
            </div>
            <div className="ttp">
              <h3>Welcome to BookBazar! Please enter details</h3>
            </div>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="main">
              {allPrintingPress.map((store) => (
                <div className="home_detail" key={store._id}>
                  <Link to={`/printing-request/${store.user}`}>
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
