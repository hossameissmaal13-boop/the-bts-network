const jwt = require('jsonwebtoken');
const Student = require('../models/studentModel');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    // التحقق من صحة الـ token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Student.findById(decoded.id).select('-password'); // نضيف بيانات المستخدم للـ req
    if (!req.user) return res.status(401).json({ message: 'User not found' });

    next(); // السماح بالوصول للـ route
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;