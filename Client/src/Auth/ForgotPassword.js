import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();
  const [newPassword, setNewPassword] = useState();
  const navigate = useNavigate();
  const handleInput = (e) => {
    e.preventDefault();
    try {
      const res = axios.post(
        `${process.env.REACT_APP_API}/api/v1/user/forgot-password`,
        { email, otp, newPassword }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="form-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleInput}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            ></input>
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputNewPassword"
              placeholder="Enter Your New Password"
              required
            ></input>
          </div>
          <div className="mb-3">
            <input
              type="otp"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="form-control"
              id="exampleInputotp"
              placeholder="Enter Your Otp"
              required
            ></input>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
