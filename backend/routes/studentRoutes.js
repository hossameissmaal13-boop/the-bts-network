const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// ✅ VERIFY (mobile)
router.post('/verify', studentController.verifyStudent);

// ✅ ADD (admin)
router.post('/', studentController.addStudent);

// ✅ GET ALL (admin table)
router.get('/', studentController.getStudents);

// ✅ DELETE (admin table)
router.delete('/:id', studentController.deleteStudent);

// ✅ FORGOT PASSWORD
router.post('/forgot-password', studentController.forgotPassword);

// ✅ UPDATE
router.put('/:id', studentController.updateStudent);

module.exports = router;