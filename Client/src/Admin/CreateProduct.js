import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import AdminMenu from "../Components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import ProductForm from "../Components/form/ProductForm";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState();
  const [shipping, setShipping] = useState();
  const [photo, setPhoto] = useState();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // Get All Categoirs
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/getAll`
      );
      if (data?.sucess) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getall category");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  const handleInput = async (e) => {
    e.preventDefault();
    try {
      //  to handle form-data format
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/add`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log("Error while add Product");
    }
  };

  // const getAllProducts = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API}/api/v1/product/all`
  //     );
  //     if (data.sucess) {
  //       setProducts(data.products);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("error while fatch all products");
  //   }
  // };
  // useEffect(() => {
  //   getAllProducts();
  // }, []);
  // const deleteProduct = async (pId) => {
  //   try {
  //     const { data } = await axios.delete(
  //       `${process.env.REACT_APP_API}/api/v1/product/remove/${pId}`,
  //       {
  //         headers: {
  //           Authorization: auth?.token,
  //         },
  //       }
  //     );
  //     if (data.sucess) {
  //       toast.success("Product Deleted");
  //       getAllProducts();
  //     }
  //   } catch (error) {
  //     console.log("Error while delete product");
  //   }
  // };

  return (
    <Layout>
      <div className="row  m-3 p-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3>Create Products</h3>
          <div className="m-1 w-75">
            <Select
              bordered={false}
              placeholder="Select a Category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}{" "}
            </Select>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="images/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  ></img>
                </div>
              )}
            </div>
            <div className="mb-3 ">
              <input
                type="text"
                placeholder="write a product name"
                value={name}
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder=" write a description"
                value={description}
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder=" price"
                value={price}
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder=" quantity"
                value={quantity}
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Select Shiping"
                size="large"
                showSearch
                className="form-select-mb-3"
                onChange={(value) => setShipping(value)}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleInput}>
                CREATE PRODUCT
              </button>
            </div>
          </div>

          {/* <ProductForm
            handleInput={handleInput}
            value={name}
            setValue={setName}
          /> */}
          {/* <div className="w-75">
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
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
