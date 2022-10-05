import React, { useEffect } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Styles and components
import { getProducts } from "../../../store/methods/productMethods";
import Loader from "../../../components/Loader/Loader";

export default function Products() {
  const { products, loading } = useSelector((state) => state.ProductsReducer);
  const dispatch = useDispatch();
  const { id } = useParams();

  //Fetch Products
  useEffect(() => {
    dispatch(getProducts(id));
  }, [dispatch, id]);
  return (
    <div className="container_admin">
      <div className="content_panel">
        {/* <Route render={({ history }) => <Search history={history} redirect='dashboard' search='product-search'/>} /> */}
        {!loading ? (
          products.map((item) => (
            <div className=" ml-minus-15" key={item._id}>
              <div className="col-8 p-15">
                <Link to={`/product/${item._id}`}>
                  <div className="item_container">
                    <div className="item_image_container">
                      <img
                        src={item.image}
                        alt={item.storeName}
                        className="item_image"
                        style={{
                          width: "200px",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="item_content">
                      <h2>{item.bookName}</h2>
                      <h3>
                        <strong>Author</strong> {item.authorName}
                      </h3>
                      <h3>
                        <strong>PKR</strong> {item.price}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
