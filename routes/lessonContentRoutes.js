const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  addLessonContent,
  getLessonContentsByLesson,
  updateLessonContent,
  deleteLessonContent
} = require("../controllers/lessonContentController");

router.post("/", upload.single("file"), addLessonContent);
router.get("/:lessonId", getLessonContentsByLesson);
router.put("/:id", upload.single("file"), updateLessonContent);
router.delete("/:id", deleteLessonContent);

module.exports = router;