const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createPost, deletePost } = require('../controllers/postController');
const upload = require('../middleware/uploadMiddleware');

// إنشاء منشور
router.post('/', auth, upload.single('image'), createPost);

// حذف منشور
router.delete('/:id', auth, deletePost);

module.exports = router;