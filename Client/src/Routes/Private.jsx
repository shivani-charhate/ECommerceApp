import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/Auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";
const Private = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/user/user-auth`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
};

export default Private;
