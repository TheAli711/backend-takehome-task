const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  console.log(header);
  const token = header?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
