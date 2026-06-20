const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createReport,
  getReports,
  updateReportStatus
} = require('../controllers/reportController');

router.post('/', auth, createReport);
router.get('/', getReports);
router.put('/:id', updateReportStatus);

module.exports = router;