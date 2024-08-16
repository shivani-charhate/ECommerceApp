import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import AdminMenu from "../Components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../Context/Auth";
import ProductForm from "../Components/form/ProductForm";

const CreateProduct = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState();
  const [auth, setAuth] = useAuth();

  const handleInput = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/add`,
        { name },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.sucess) {
        toast.success("Product Added");
        getAllProducts();
      }
    } catch (error) {
      console.log("Error while add Product");
    }
  };
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
  const deleteProduct = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/remove/${pId}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.sucess) {
        toast.success("Product Deleted");
        getAllProducts();
      }
    } catch (error) {
      console.log("Error while delete product");
    }
  };

  return (
    <Layout>
      <div className="row  m-3 p-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3>Manage Products</h3>
          <ProductForm
            handleInput={handleInput}
            value={name}
            setValue={setName}
          />
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
                      <button className="btn btn-primary ms-2"> Edit</button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => deleteProduct(p._id)}
                      >
                        Delete
                      </button>
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
