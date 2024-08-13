import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import AdminMenu from "../Components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/getAll`
      );
      if (data.sucess) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getall category");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout>
      <div className="row p-3 m-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3>Manage Category</h3>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {category.map((c) => (
                  <tr>
                    <td key={c._id}>{c.name}</td>
                    <td>
                      {" "}
                      <button className="btn btn-primary"> Edit </button>
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

export default CreateCategory;
