const express = require("express");
const { generateLessons } = require("../controllers/createLessonsController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/generate", verifyToken, generateLessons);

module.exports = router;
