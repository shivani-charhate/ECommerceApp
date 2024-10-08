import React from "react";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Context/Auth";
import UserMenu from "../Components/Layout/UserMenu";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 p-9">
            <div className="card w-75 p-3">
              <h3> UserName: {auth?.user?.name}</h3>
              <h3> UserEmail: {auth?.user?.email}</h3>
              <h3> UserMobile: {auth?.user?.mobile}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
