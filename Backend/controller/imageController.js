const dbconnection = require("../db/config");
const upload = require("../profileImages/imageUploader"); // Multer config for file upload

const profileImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profileImage = `/images/${req.file.filename}`;
    const { userid } = req.user; // Assumes req.user is available after authentication

    const query = `UPDATE users SET profileimg = ? WHERE userid = ?`;

    try {
      await dbconnection.query(query, [profileImage, userid]);
      return res
        .status(200)
        .json({ message: "Image uploaded successfully", profileImage });
    } catch (error) {
      return res.status(500).json({ message: "Database error", error });
    }
  });
};

module.exports = { profileImage };
