const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");

const login = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("User not found");
  }
  const valid = await bcrypt.compare(password, user.password);
  console.log(password, user.password, valid);
  if (!valid) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const profile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const { password, ...rest } = user._doc;
  return rest;
};

module.exports = { login, profile };
