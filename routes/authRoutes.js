const express = require("express");
const router = express.Router();
const {
  register,
  login,
  changePassword
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.put("/change-password/:id", changePassword);

module.exports = router;