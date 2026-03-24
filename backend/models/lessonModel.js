const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  branch: { type: String, enum: ['CG','CT','DAI','EII'], required: true },
  year: { type: Number, enum: [1,2], required: true },
  subject: { type: String, required: true },
  chapter: { type: String, required: true },
  content: { type: String }, // نص الدرس
  exercises: [{ type: String }], // تمارين
  exams: [{ type: String }], // امتحانات
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lesson', lessonSchema);