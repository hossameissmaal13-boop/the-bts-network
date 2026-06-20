const Post = require('../models/postModel');

// إنشاء منشور
exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      user: req.user.id,
      content: req.body.content,
      image: req.file ? req.file.filename : null
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// حذف منشور
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.user.toString() !== req.user.id) return res.status(403).json({ error: "Not allowed" });
    await post.delete();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};