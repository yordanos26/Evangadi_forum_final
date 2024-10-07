import React from "react";
import { Route, Routes } from "react-router-dom";
import Question from "../pages/Question/Question";
import Answer from "../pages/Answer/Answer";
import Home from "../pages/Home/Home";
import NotFound from "../components/NotFound/NotFound";
import Auth from "../pages/Auth/Auth";
function RouterApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/questions" element={<Question />} />
        <Route path="/question/:questionid" element={<Answer />} />
        <Route path="/login" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default RouterApp;
