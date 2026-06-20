const express = require("express");
const router = express.Router();

const {
  addLesson,
  getLessons,
  getLessonsByFiliereAndAnnee,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");

router.post("/", addLesson);
router.get("/", getLessons);
router.get("/:filiere/:annee", getLessonsByFiliereAndAnnee);
router.put("/:id", updateLesson);
router.delete("/:id", deleteLesson);

module.exports = router;