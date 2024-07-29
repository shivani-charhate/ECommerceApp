import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import toast from "react-hot-toast";
import "../Style/AuthStyle.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate("");

  //   form
  const inputHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/user/register`,
        { name, email, password, mobile, address }
      );
      if (res.data.sucess) {
        // alert("New User added");
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Wrong");
    }
  };
  return (
    <Layout>
      <div className="form-container">
        <h1>Register Page</h1>
        <form onSubmit={inputHandler}>
          <div className="mb-3">
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Name"
              required
            ></input>
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Your Email"
              required
            ></input>
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter Your Password"
              required
            ></input>
          </div>
          <div className="mb-3">
            <input
              type="mobile"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              className="form-control"
              id="exampleInputMobile"
              placeholder="Enter Your Mobile"
              required
            ></input>
          </div>
          <div className="mb-3">
            <input
              type="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Your Address"
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

export default Register;
