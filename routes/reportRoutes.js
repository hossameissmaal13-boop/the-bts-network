const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createReport,
  getReports,
  updateReportStatus,
  deleteReport
} = require('../controllers/reportController');

// ✅ طالب يبلّغ
router.post('/', auth, createReport);

// ✅ أدمن يشوف البلاغات
router.get('/', getReports);

// ✅ أدمن يغير حالة البلاغ
router.put('/:id', updateReportStatus);

// ✅ أدمن يحذف البلاغ
router.delete('/:id', deleteReport);

module.exports = router;
