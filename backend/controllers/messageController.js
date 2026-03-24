const Message = require('../models/messageModel');

// إرسال رسالة خاصة
exports.sendMessage = async (req, res) => {
  try {
    const { to, content } = req.body; // 'to' = id الطالب المرسل إليه
    const message = new Message({
      from: req.user.id,
      to,
      content
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// جلب الرسائل الخاصة بين طالبين
exports.getPrivateMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { from: req.user.id, to: req.params.userId },
        { from: req.params.userId, to: req.user.id }
      ]
    }).sort({ createdAt: 1 }); // ترتيب حسب الوقت
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// إنشاء مجموعة رسائل (لشعبة أو سنة)
exports.createGroupMessage = async (req, res) => {
  try {
    const { groupName, members } = req.body; // members = array من id الطلبة
    const groupMessage = new Message({
      from: req.user.id,
      groupName,
      members,
      isGroup: true
    });
    await groupMessage.save();
    res.status(201).json(groupMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// جلب كل الرسائل لمجموعة معينة
exports.getGroupMessages = async (req, res) => {
  try {
    const messages = await Message.find({ groupName: req.params.groupName });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};