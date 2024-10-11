import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../../Routes/Router";
import axiosBaseURL from "../../Utility/ApiConfig";
import { RiAccountCircleFill } from "react-icons/ri";
import Auth from "../Auth/Auth";
import ProfileImage from "./ProfileImage";
import { TbBackground } from "react-icons/tb";
function Home() {
  const { user } = useContext(AppState);

  // console.log(user);
  // State to store questions
  const [questions, setQuestions] = useState([]); // To store questions
  const [loading, setLoading] = useState(true); // To manage loading state
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const navigate = useNavigate();
  // Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosBaseURL.get("/questions/getQuestions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("Fetched questions:", response.data);
        setQuestions(response.data.questions);
        // Set the questions from response
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchQuestions();
  }, []);

  // Handle click event to navigate to detail page
  const handleQuestionClick = (questionid) => {
    navigate(`/getQuestions/${questionid}`);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter questions based on search term
  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(searchTerm)
  );

  // Navigate to the "Ask Question" page
  const handleAskQuestionClick = () => {
    navigate("/questions/ask"); // Navigate to the "Ask Question" page
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          zIndex: "1",
        }}
      >
        {/* Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.headerContainer}>
            <button
              className={styles.askButton}
              onClick={handleAskQuestionClick}
            >
              Ask Question
            </button>

            <h3>Welcome, {user.username}</h3>
          </div>
          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search for questions..."
              value={searchTerm}
              onChange={handleSearchChange} // Trigger search on input change
            />
          </div>
          <h3 className={styles.questionHeader}>Questions</h3>
          <hr style={{ marginBottom: "20px" }} />

          {/* Loading Indicator */}
          {loading ? (
            <div className={styles.loadingSpinner}>
              <div className={styles.spinner}></div>
            </div>
          ) : // Check for no matches found
          filteredQuestions.length === 0 ? (
            <div className={styles.noMatchMessage}>
              No matching questions found.
            </div>
          ) : (
            // Question List
            <ul className={styles.questionList}>
              {filteredQuestions.map((q, index) => (
                <Link
                  to={`/getQuestions/${q.questionid}`}
                  key={index}
                  className={styles.questionLink}
                >
                  <li className={styles.questionItem}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginRight: "2em",
                      }}
                    >
                      <div
                        style={{
                          borderRadius: "50%",
                          width: "4em",
                          height: "4em",
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        {q.profileimg ? (
                          <img
                            // ref=
                            src={`http://localhost:5500${q.profileimg}`}
                            style={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <RiAccountCircleFill
                            style={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>
                      <p style={{ fontWeight: "bold" }}>{q.username}</p>
                    </div>
                    <div className={styles.questionText}>
                      <strong>{q.title}</strong>
                      <p>{q.tag}</p>
                    </div>
                    <button
                      onClick={() => handleQuestionClick(q.questionid)}
                      className={styles.questionButton}
                    >
                      ➡
                    </button>
                    <hr />
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </main>
        <div className={styles.profileImageContainer}>
          {/* <ProfileImage /> */}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
