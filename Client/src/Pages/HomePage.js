import React from "react";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Context/Auth";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <h5>HomePage</h5>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};
export default HomePage;
