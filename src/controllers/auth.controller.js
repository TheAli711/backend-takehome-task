const { catchAsync } = require("../utils");
const authService = require("../services/auth.service");

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const token = await authService.login(email, password);
  res.json({ token });
});

const profile = catchAsync(async (req, res) => {
  const userId = req.userId;
  const user = await authService.profile(userId);
  res.json(user);
});

module.exports = { login, profile };
