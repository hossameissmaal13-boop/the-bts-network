const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  sendMessage,
  getPrivateMessages,
  createGroupMessage,
  getGroupMessages
} = require('../controllers/messageController');

// رسائل خاصة
router.post('/private', auth, sendMessage);
router.get('/private/:userId', auth, getPrivateMessages);

// مجموعات
router.post('/group', auth, createGroupMessage);
router.get('/group/:groupName', auth, getGroupMessages);

module.exports = router;