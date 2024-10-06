const express = require("express");
const router = express.Router();

const { question } = require("../controller/questionController");
// Post question
router.post("/question", question);

module.exports = router;
