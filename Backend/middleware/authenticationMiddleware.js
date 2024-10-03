const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authenticationMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }

  const token = authHeader.split(" ")[1]; // Get the token part after "Bearer"
  console.log(authHeader);
  console.log(token);
  try {
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRETKEY);

    req.user = { username, userid };
    // Move to the next middleware or route
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid'" });
  }
}

module.exports = authenticationMiddleware;
