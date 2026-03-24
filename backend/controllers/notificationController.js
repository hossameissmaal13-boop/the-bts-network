const Notification = require('../models/notificationModel');

// إرسال إشعار
exports.sendNotification = async (req, res) => {
  try {
    const { title, message, to } = req.body; // 'to' = array من id الطلبة أو 'all'
    const notification = new Notification({
      title,
      message,
      to
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// جلب الإشعارات الخاصة بالطالب
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      to: { $in: [req.user.id, 'all'] }
    }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// مسح إشعار
exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};