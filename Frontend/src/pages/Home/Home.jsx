import React,{useContext} from "react";
import Layout from "../../components/Layout/Layout";

import {AppState} from '../../Routes/Router'
function Home() {
  const {user} = useContext(AppState)
  return (
    <>
      <Layout>
        <h1>Home</h1>
        <h2>Welcome :{user.username}</h2>
      </Layout>
    </>
  );
}

export default Home;
