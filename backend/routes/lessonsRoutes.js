const express = require("express");
const {
  generateLessons,
  getAllDrafts,
  getLessonsByDraftId,
  editLesson,
  deleteLesson,
} = require("../controllers/createLessonsController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/generate", verifyToken, generateLessons);
router.get("/", verifyToken, getAllDrafts);
router.get("/:draftId", verifyToken, getLessonsByDraftId);
router.put("/edit/:id", verifyToken, editLesson);
router.delete("/delete/:id", verifyToken, deleteLesson);

module.exports = router;
