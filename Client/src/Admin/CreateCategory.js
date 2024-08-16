import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import AdminMenu from "../Components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../Components/form/CategoryForm";
import { useAuth } from "../Context/Auth";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState();
  const [auth, setAuth] = useAuth();
  const handleInput = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create`,
        { name },
        // console.log(data)
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.sucess) {
        // console.warn(data);
        toast.success(`${name} is created`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong while add");
    }
  };
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
  const deleteCategory = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete/${pId}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.sucess) {
        toast.success("Category Deleted Sucessfully");

        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error while delete category");
    }
  };
  return (
    <Layout>
      <div className="row p-3 m-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3>Manage Category</h3>
          <div className="p-3 w-50">
            <CategoryForm
              handleInput={handleInput}
              value={name}
              setValue={setName}
            />
          </div>
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
                      <button className="btn btn-primary ms-2"> Edit </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => {
                          deleteCategory(c._id);
                        }}
                      >
                        {" "}
                        Delete{" "}
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

export default CreateCategory;
