import React from "react";
import Layout from "../Components/Layout/Layout";
import AdminMenu from "../Components/Layout/AdminMenu";

const CreateProduct = () => {
  return (
    <Layout>
      <div className="row  m-3 p-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3>Products</h3>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
