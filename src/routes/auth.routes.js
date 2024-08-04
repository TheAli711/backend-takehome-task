const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);
router.get("/profile", verifyToken, authController.profile);

module.exports = router;
