import React from "react";
import UserMenu from "../Components/Layout/UserMenu";
import Layout from "../Components/Layout/Layout";

const Profile = () => {
  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 p-9">
            <div className="card w-75 p-3">
              <h3> Your Profile</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
