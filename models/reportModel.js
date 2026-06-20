const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  type: { type: String, enum: ['post','message','other'], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId }, // id المنشور أو الرسالة
  reason: { type: String, required: true },
  status: { type: String, enum: ['pending','reviewed','resolved'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);