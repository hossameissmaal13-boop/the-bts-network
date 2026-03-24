const Student = require('../models/studentModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/tokenGenerator');
const sendEmail = require('../utils/emailSender');


// 🎓 تسجيل (Step2) ✅ نفس الطالب
exports.register = async (req, res) => {
  try {
    const { codeMassar, email, password } = req.body;

    const student = await Student.findOne({
      codeMassar: codeMassar.toUpperCase().trim()
    });

    if (!student) {
      return res.json({ success: false, message: "Student not found" });
    }

    if (student.email) {
      return res.json({ success: false, message: "Already registered" });
    }

    const existingEmail = await Student.findOne({
      email: email.trim().replace(/\s+/g, "").toLowerCase()
    });

    if (existingEmail) {
      return res.json({ success: false, message: "Email déjà utilisé, changez-le" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    student.email = email.trim().replace(/\s+/g, "").toLowerCase();
    student.password = hashedPassword;
    student.plainPassword = password;

    await student.save();

    res.json({
      success: true,
      student
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🔐 LOGIN (ما تبدل والو غير format)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("📥 LOGIN DATA:", { email, password }); // 👈 هنا

    const cleanEmail = email.trim().replace(/\s+/g, '').toLowerCase();

    console.log("📧 CLEAN EMAIL:", cleanEmail); // 👈 هنا

    const student = await Student.findOne({ email: cleanEmail });

    console.log("👤 STUDENT FOUND:", student); // 👈 هنا

    if (!student) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!student.password) {
      return res.json({ success: false, message: "Account not completed" });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    console.log("🔑 PASSWORD MATCH:", isMatch); // 👈 زيد حتى هادي

    if (!isMatch) {
      return res.json({ success: false, message: "Wrong password" });
    }

    res.json({
      success: true,
      token: generateToken(student._id),
      student
    });

  } catch (error) {
    console.log("❌ LOGIN ERROR:", error);
    res.status(500).json({ success: false });
  }
};