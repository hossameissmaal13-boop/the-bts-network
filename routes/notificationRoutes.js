const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  sendNotification,
  getNotifications,
  deleteNotification
} = require('../controllers/notificationController');

router.post('/', sendNotification);
router.get('/', auth, getNotifications);
router.delete('/:id', auth, deleteNotification);

module.exports = router;