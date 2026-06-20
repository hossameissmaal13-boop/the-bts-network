const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  content: { type: String, required: true },
  image: { type: String }, // مسار الصورة أو null
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    text: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);