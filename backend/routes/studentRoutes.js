const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const auth = require("../middleware/authMiddleware");

router.post("/verify", studentController.verifyStudent);
router.post("/forgot-password", studentController.forgotPassword);
router.get("/me", auth, studentController.getMe);

router.post("/", studentController.addStudent);
router.get("/", studentController.getStudents);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;