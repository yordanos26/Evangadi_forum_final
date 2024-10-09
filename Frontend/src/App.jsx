import { useState } from "react";

import "./App.css";
import RouterApp from "./Routes/Router";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <>
      <RouterApp />
      <Footer />
    </>
  );
}

export default App;
