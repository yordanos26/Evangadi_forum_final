const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

// Check if the user is authenticated for all routes
async function authenticationMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }

  const token = authHeader.split(" ")[1]; // to get the token part after "Bearer"
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
