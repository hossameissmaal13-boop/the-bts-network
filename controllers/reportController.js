const Report = require('../models/reportModel');

// ✅ إنشاء بلاغ
exports.createReport = async (req, res) => {
  try {
    const { type, targetId, reason } = req.body;

    if (!type || !reason) {
      return res.status(400).json({
        success: false,
        message: "Type et raison obligatoires"
      });
    }

    const report = await Report.create({
      reportedBy: req.user._id,
      type,
      targetId: targetId || null,
      reason
    });

    return res.status(201).json({
      success: true,
      report
    });
  } catch (error) {
    console.error("CREATE REPORT ERROR:", error);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// ✅ جلب كل البلاغات (أدمن)
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('reportedBy', 'nom prenom email')
      .sort({ createdAt: -1 });

    return res.json({ success: true, reports });
  } catch (error) {
    console.error("GET REPORTS ERROR:", error);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// ✅ تغيير حالة البلاغ (أدمن)
exports.updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const report = await Report.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ success: false, message: "Rapport introuvable" });
    }

    return res.json({ success: true, report });
  } catch (error) {
    console.error("UPDATE REPORT ERROR:", error);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// ✅ حذف بلاغ (أدمن)
exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    await Report.findByIdAndDelete(id);
    return res.json({ success: true, message: "Rapport supprimé" });
  } catch (error) {
    console.error("DELETE REPORT ERROR:", error);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
