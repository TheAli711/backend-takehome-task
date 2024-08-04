const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const documentController = require("../controllers/document.controller.js");

router.get("/", documentController.getDocsUnAuth);
router.get("/authenticated", verifyToken, documentController.getDocsAuth);

module.exports = router;
