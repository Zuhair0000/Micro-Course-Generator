const express = require("express");
const {
  generateLessons,
  getAllDrafts,
  getLessonsByDraftId,
} = require("../controllers/createLessonsController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/generate", verifyToken, generateLessons);
router.get("/", verifyToken, getAllDrafts);
router.get("/:draftId", verifyToken, getLessonsByDraftId);

module.exports = router;
