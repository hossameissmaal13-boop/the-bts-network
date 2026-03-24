const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createLesson, getLessons } = require('../controllers/lessonController');

// إضافة درس جديد (خاص بالأدمن)
router.post('/', auth, createLesson);

// الحصول على الدروس حسب الشعبة والسنة
router.get('/:branch/:year', auth, getLessons);

module.exports = router;