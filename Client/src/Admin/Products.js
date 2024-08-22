import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import AdminMenu from "../Components/Layout/AdminMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = React.useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/all`
      );
      if (data?.sucess) {
        setProducts(data.products);
        toast.success("All products Lists");
      }
    } catch (error) {
      console.log("error while add product");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row p-3 m-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div
            className="d-flex"
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {products.map((p) => (
              <Link
                key={p._id}
                to={`/dashbord/admin/products/${p.slug}`}
                className="product-link"
              >
                <div class="card m-2" style={{ width: "18rem" }}>
                  <img
                    responsetype="blob"
                    src={`${process.env.REACT_APP_API}/api/v1/product/photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{p.name}</h5>
                    <p class="card-text text-center">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
