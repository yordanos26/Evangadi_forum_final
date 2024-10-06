const dbConnection = require("../db/config"); // database connection
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid"); // random generator

async function allQuestions(req, res) {
  res.send("get all questions");
}

async function singleQuestion(req, res) {
  res.send("get single question");
}

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

module.exports = { allQuestions, singleQuestion, question };
