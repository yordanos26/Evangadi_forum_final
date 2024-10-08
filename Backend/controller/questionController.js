const dbConnection = require("../db/config"); // database connection
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid"); // random generator

// Post question part
async function question(req, res) {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please provide all required fields",
    });
  }
  try {
    const userid = req.user.userid; // Getting the user id from authMiddleware
    // console.log(userid);
    const questionid = uuidv4();
    // console.log(questionid);
    const tag = new Date().toISOString().slice(0, 19).replace("T", " "); // to get the created date
    const [question] = await dbConnection.query(
      "select * from questions where title = ? and userid= ?",
      [title, userid, description]
    );
    // console.log(question);

    if (question.length > 0 && userid != 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "You already created a question" });
    }
    await dbConnection.query(
      "INSERT INTO questions (title,description,questionid,userid,tag) VALUES (?,?,?,?,?)",
      [title, description, questionid, userid, tag]
    );
    const [rows] = await dbConnection.query(
      "SELECT * FROM questions where title = ? or userid= ? ORDER BY tag DESC",
      [userid, title]
    );
    console.log(rows);
    return res.status(StatusCodes.CREATED).json({
      message: "Question created successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Unexpected error occured." });
  }
}
// get all question
async function getAllQuestions(req, res) {
  try {
    const username = req.user.username; // Get the username from the auth middleware

    const [results] = await dbConnection.query(
      "SELECT u.username, q.title FROM questions q, users u where q.userid=u.userid"
    ); // Use await and destructure the result
    res.json({ username, results }); // Send the result as a JSON response
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors properly
  }
}

// Get question details
async function getQuestionDetail(req, res) {
  const { questionid } = req.params;

  try {
    // Fetch question details
    const [questionResult] = await dbConnection.query(
      "SELECT questionid, title FROM questions WHERE questionid = ?",
      [questionid]
    );

    // If no question found, return a 404 error
    if (questionResult.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Fetch answers along with the user who posted the answer
    const [answersResult] = await dbConnection.query(
      `SELECT a.answerid, a.answer, u.username FROM answers a
          LEFT JOIN users u ON a.userid = u.userid
          WHERE a.questionid = ?`,
      [questionid]
    );

    // Combine question details and answers into one response
    const response = {
      question: questionResult[0], // The question detail
      answers: answersResult, // List of answers with usernames
    };

    res.json(response); // Send the response as a JSON object
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
}

module.exports = { getAllQuestions, getQuestionDetail, question };
