const express = require("express");
const {
  generateLessons,
  getAllDrafts,
} = require("../controllers/createLessonsController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/generate", verifyToken, generateLessons);
router.get("/", verifyToken, getAllDrafts);

module.exports = router;
