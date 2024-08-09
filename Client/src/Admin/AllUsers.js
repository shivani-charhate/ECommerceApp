import React from "react";
import Layout from "../Components/Layout/Layout";
import AdminMenu from "../Components/Layout/AdminMenu";

const AllUsers = () => {
  return (
    <Layout>
      <div className="row p-3 m-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3>All Users</h3>
        </div>
      </div>
    </Layout>
  );
};

export default AllUsers;
