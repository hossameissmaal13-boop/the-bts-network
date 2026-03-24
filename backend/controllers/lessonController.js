const Lesson = require('../models/lessonModel');

// إضافة درس جديد
exports.createLesson = async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// الحصول على دروس حسب الشعبة والسنة
exports.getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ 
      branch: req.params.branch, 
      year: req.params.year 
    });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};