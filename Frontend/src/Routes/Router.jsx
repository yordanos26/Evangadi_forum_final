import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Question from "../pages/Question/Question";
import Answer from "../pages/Answer/Answer";
import Home from "../pages/Home/Home";
import NotFound from "../components/NotFound/NotFound";
import Auth from "../pages/Auth/Auth";
import { createContext } from "react";
import axiosBaseURL from "../Utility/ApiConfig";

// import axios from "axios";
import { useNavigate } from "react-router-dom";
import HowItWorks from "../components/How it works/Howitworks";

export const AppState = createContext();
function RouterApp() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  async function checkUser() {
    try {
      const { data } = await axiosBaseURL.get("/users/check", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  //  const isLoggedIn = user && user.id;
  return (
    <AppState.Provider value={{ user, setUser }}>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/questions/ask" element={<Question />} />
        

        <Route
          path="/questions/getQuestions/:questionid"
          element={<Question />}
        />

        <Route path="/getQuestions/:questionid"  element={<Answer />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppState.Provider>
  );
}
export default RouterApp;
