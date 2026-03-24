const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// إنشاء حساب جديد
router.post('/register', register);

// تسجيل الدخول
router.post('/login', login);

module.exports = router;