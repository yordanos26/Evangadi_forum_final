import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

const Answer = () => {
  const { questionid } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState("");
  const [duplicatepost, setDuplicatepost] = useState("");

  // Fetch question and answers from API
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/questions/getQuestions/${questionid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setQuestion(response.data.question);
        setAnswers(response.data.answers || []);
        console.log("Fetched question:", response.data);
      } catch (error) {
        console.error("Failed to fetch question:", error);
      }
    };

    fetchQuestion();
  }, [questionid]);

  // Handle answer submission
  const handleAnswerSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:5500/api/answers`,
        { questionid, answer },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSubmitting("Answer submitted");
      console.log("Answer submitted:", answer);
      setAnswer(""); // Reset the input field after submitting
    } catch (error) {
      console.error("Failed to submit answer:", error);
      setSubmitting("");
      setDuplicatepost(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
        {/* Question Section */}
        <div style={{ marginBottom: "30px" }}>
          <h4>Question</h4>
          {question.title ? (
            <>
              <h6 style={{ color: "gray" }}>{question.title}</h6>
              <p style={{ color: "gray" }}>{question.description}</p>
            </>
          ) : (
            <h6 style={{ color: "gray" }}>Loading question...</h6>
          )}
        </div>

        {/* Community Answer Section */}
        <div style={{ marginBottom: "40px" }}>
          <h5>Answers From The Community</h5>

          {answers && answers.length > 0 ? (
            answers.map((answer, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <img
                  alt={answer.username}
                  src={answer.avatarUrl}
                  style={{
                    width: "56px",
                    height: "56px",
                    marginRight: "15px",
                    borderRadius: "50%",
                  }}
                />
                <div>
                  <p style={{ fontWeight: "bold" }}>{answer.username}</p>
                  <p style={{ color: "gray" }}>{answer.answer}</p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "gray" }}>
              No answers yet. Be the first to answer!
            </p>
          )}
        </div>

        {/* Answer Form */}
        <div style={{ marginBottom: "20px" }}>
          <h5>Answer The Top Question</h5>
          <Link to="/questions/ask">
            <button
              style={{
                color: "gray",
                marginBottom: "10px",
                border: "2px solid black",
                backgroundColor: "#fff",
              }}
            >
              Go to Question page
            </button>
          </Link>

          <textarea
            placeholder="Your Answer..."
            rows={4}
            style={{ width: "100%", padding: "10px" }}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleAnswerSubmit}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#3f51b5",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Post Your Answer
        </button>
        {submitting && <p>{submitting}</p>}
        {duplicatepost && <p>{duplicatepost}</p>}
      </div>
    </Layout>
  );
};

export default Answer;
