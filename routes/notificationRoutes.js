const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  sendNotification,
  getNotifications,
  deleteNotification
} = require('../controllers/notificationController');

// ✅ إرسال إشعار (أدمن فقط)
router.post('/', sendNotification);

// ✅ جلب إشعارات الطالب
router.get('/', auth, getNotifications);

// ✅ حذف إشعار
router.delete('/:id', auth, deleteNotification);

module.exports = router;
