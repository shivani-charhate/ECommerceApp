import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import AdminMenu from "../Components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";

const CreateProduct = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/all`
      );
      if (data.sucess) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("error while fatch all products");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row  m-3 p-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3>Manage Products</h3>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr>
                    <td key={p._id}>{p.name}</td>
                    <td>
                      <button className="btn btn-primary"> Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
