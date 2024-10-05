import { useState } from "react";

import "./App.css";
import Signup from "./components/SignUp/SignUp";
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
function App() {
  return (
    <>
    <Header/>
      <Signup />
      <Footer/>
    </>
  );
}

export default App;
