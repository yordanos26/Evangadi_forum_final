import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosBaseURL from "../../Utility/ApiConfig";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import classes from "./Answer.module.css"; // Import the CSS module
import { RiAccountCircleFill } from "react-icons/ri";
import { TbMessageQuestion } from "react-icons/tb";
const Answer = () => {
  const { questionid } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState("");
  const [duplicatepost, setDuplicatepost] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axiosBaseURL.get(
          `/questions/getQuestions/${questionid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setQuestion(response.data.question);
        setAnswers(response.data.answers || []);
      } catch (error) {
        console.error("Failed to fetch question:", error);
      }
    };

    fetchQuestion();
  }, [questionid]);

  const handleAnswerSubmit = async () => {
    try {
      await axiosBaseURL.post(
        `/answers`,
        { questionid, answer },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSubmitting("Answer submitted");
      setAnswer("");
      
    } catch (error) {
      console.error("Failed to submit answer:", error);
      setSubmitting("");
      setDuplicatepost(error.response.data.message);
      setDuplicatepost("")
    }
  };

  return (
    <Layout>
      <div className={classes.container}>
        {/* Question Section */}
        <div className={classes.questionSection}>
          <h4 className={classes.questionTitle}>Question Asked</h4>
          {question.title ? (
            <>
            <TbMessageQuestion size={40} />
              <h6 className={classes.questionDetails}>{question.title}</h6>
              <p className={classes.questionDescription}>{question.description}</p>
            </>
          ) : (
            <h6 className={classes.questionDetails}>Loading question...</h6>
          )}
        </div>

        {/* Community Answer Section */}
        <div className={classes.answersSection}>
          <h5>Answer From The Community</h5>

          {answers && answers.length > 0 ? (
            answers.map((answer, index) => (
              <div key={index} className={classes.answerItem}>
              <div className={classes.answerInfo}>
                    <RiAccountCircleFill
                      size={40}
                      className={classes.answerAvatar}
                    />
                  
                  <p className={classes.answerDetails}>{answer.username}</p>
                  </div>
                <div>
                  <p className={classes.answerText}>{answer.answer}</p>
                </div>
              </div>
            ))
          ) : (
            <p className={classes.noAnswers}>
              No answers yet. Be the first to answer!
            </p>
          )}
        </div>

        {/* Answer Form */}
        <div className={classes.answerForm}>
          <h5>Answer The Top Question</h5>
          <Link to="/" className={classes.HomelinkButton}>
            Go to Question page
          </Link>

          <textarea
            placeholder="Your answer ..."
            rows={4}
            className={classes.answerTextarea}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleAnswerSubmit}
          className={classes.submitButton}
        >
          Post Answer
        </button>
        {submitting && <p className={classes.submittingMessage}>{submitting}</p>}
        {duplicatepost && <p className={classes.errorMessage}>{duplicatepost}</p>}
      </div>
    </Layout>
  );
};

export default Answer;
