const express = require("express");
const router = express.Router();

const {
  addLessonContent,
  getLessonContentsByLesson,
  updateLessonContent,
  deleteLessonContent
} = require("../controllers/lessonContentController");

router.post("/", addLessonContent);
router.get("/:lessonId", getLessonContentsByLesson);
router.put("/:id", updateLessonContent);
router.delete("/:id", deleteLessonContent);

module.exports = router;