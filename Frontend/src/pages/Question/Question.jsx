import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axiosBaseURL from "../../Utility/ApiConfig"; // Import your configured axios instance
import classes from "./Question.module.css";
import { FaCircleArrowRight } from "react-icons/fa6";

function Question() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Get the token from localStorage

    try {
      const response = await axiosBaseURL.post(
        "/questions/question", // Assuming this is your API endpoint
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include Authorization header
          },
        }
      );

      console.log(title);

      if (response.status === 201) {
        alert("Question posted successfully!");
        console.log("successful");
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.log(error.response); // Log the error response for better debugging
      alert("Error posting question.");
    }
  };

  return (
    <>
      <Layout>
        <h1 className={classes.heading}>Question</h1>
        <div className={classes.all}>
          <div className={classes.steps}>
            <h3>Steps to write good question</h3>
            <ul style={{ listStyle: "none" }}>
              <li>
                <FaCircleArrowRight size={30} color="#e5670a" />
                <p>Summarize your problem in a one-line title</p>
              </li>
              <li>
                <FaCircleArrowRight size={30} color="#e5670a" />
                <p>Describe your problem in more detail</p>
              </li>
              <li>
                <FaCircleArrowRight size={30} color="#e5670a" />
                <p>Describe what you tried and what you expected to happen</p>
              </li>
              <li>
                <FaCircleArrowRight size={30} color="#e5670a" />
                <p>Review your question and post it to the site</p>
              </li>
            </ul>
          </div>
          <div className={classes.question}>
            <h3>Ask a public question</h3>
            <form className={classes.box} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                className={classes.input1}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                type="text"
                placeholder="Question Description..."
                className={classes.input2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className={classes.btnholder}>
                <button type="submit" className={classes.btn}>
                  Post Your Question
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Question;
