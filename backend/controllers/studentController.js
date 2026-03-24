const Student = require('../models/studentModel');
const sendEmail = require('../utils/emailSender');

// =====================================
// ✅ VERIFY STUDENT (Mobile)
// =====================================
exports.verifyStudent = async (req, res) => {
  try {
    const {
      nomFr,
      prenomFr,
      codeMassar,
      filiere,
      anneeScolaire,
      dateNaissance,
    } = req.body;

    // 🔥 دالة تنظيف موحدة
    const clean = (s) =>
      s?.toString().trim().replace(/\s+/g, "").toUpperCase();

    console.log("📥 VERIFY DATA:", req.body);

    // 🔍 نجيب جميع الطلاب
    const students = await Student.find();

    let found = null;

    students.forEach((s) => {
      if (
        clean(s.nom) === clean(nomFr) &&
        clean(s.prenom) === clean(prenomFr) &&
        clean(s.codeMassar) === clean(codeMassar) &&
        clean(s.filiere) === clean(filiere) &&
        clean(s.anneeScolaire) === clean(anneeScolaire) &&
        s.dateNaissance === dateNaissance
      ) {
        found = s;
      }
    });

    if (found) {
      console.log("✅ MATCH FOUND:", found);
      return res.json({ success: true, student: found });
    } else {
      console.log("❌ VERIFY FAILED");
      return res.json({
        success: false,
        message: "❌ Informations incorrectes",
      });
    }
  } catch (error) {
    console.error("VERIFY ERROR:", error);
    res.status(500).json({ success: false });
  }
};


// =====================================
// ✅ ADD STUDENT (Admin Dashboard)
// =====================================
exports.addStudent = async (req, res) => {
  try {
    let { nom, prenom, codeMassar, filiere, anneeScolaire, dateNaissance } = req.body;

    console.log("📥 ADD STUDENT BODY:", req.body);

    if (!nom || !prenom || !codeMassar || !filiere || !anneeScolaire || !dateNaissance) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont obligatoires"
      });
    }

    nom = nom.trim();
    prenom = prenom.trim();
    codeMassar = codeMassar.trim().toUpperCase();
    filiere = filiere.trim().toUpperCase();
    anneeScolaire = anneeScolaire.trim();
    dateNaissance = dateNaissance.trim();

    const existingStudent = await Student.findOne({ codeMassar });

    if (existingStudent) {
      return res.json({
        success: false,
        message: "Student already exists"
      });
    }

    const newStudent = new Student({
      nom,
      prenom,
      codeMassar,
      filiere,
      anneeScolaire,
      dateNaissance
    });

    await newStudent.save();

    console.log("✅ STUDENT SAVED:", newStudent);

    return res.json({
      success: true,
      student: newStudent
    });

  } catch (error) {
    console.error("❌ ADD STUDENT ERROR FULL:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error"
    });
  }
};

// =====================================
// ✅ GET ALL STUDENTS
// =====================================
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    console.log("📦 Students fetched:", students.length);

    res.json({
      success: true,
      students
    });

  } catch (error) {
    console.error("GET STUDENTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// =====================================
// ✅ DELETE STUDENT
// =====================================
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("🗑️ Delete student ID:", id);

    const deleted = await Student.findByIdAndDelete(id);

    if (!deleted) {
      return res.json({
        success: false,
        message: "Student not found"
      });
    }

    console.log("✅ Student deleted");

    res.json({
      success: true,
      message: "Student deleted"
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { nom, prenom, codeMassar, filiere, dateNaissance, anneeScolaire, email } = req.body;

    const clean = (s) =>
      s?.toString().trim().replace(/\s+/g, "").toUpperCase();

    const students = await Student.find();

    let found = null;

    students.forEach((s) => {
      if (
        clean(s.nom) === clean(nom) &&
        clean(s.prenom) === clean(prenom) &&
        clean(s.codeMassar) === clean(codeMassar) &&
        clean(s.filiere) === clean(filiere) &&
        clean(s.anneeScolaire) === clean(anneeScolaire) &&
        s.dateNaissance === dateNaissance
      ) {
        found = s;
      }
    });

    if (!found) {
      return res.json({
        success: false,
        message: "Informations incorrectes"
      });
    }

    await sendEmail(
      email.trim().replace(/\s+/g, "").toLowerCase(),
      "Your Account Info",
      `Nom: ${found.nom}
Prenom: ${found.prenom}
Filiere: ${found.filiere}
Annee: ${found.anneeScolaire}
Email: ${found.email || "Non enregistré"}
Password: ${found.plainPassword || "Non disponible"}`
    );

    return res.json({
      success: true,
      message: "Email sent successfully"
    });

  } catch (error) {
    console.log("❌ FORGOT PASSWORD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
// =====================================
// ✅ UPDATE EMAIL + PASSWORD
// =====================================
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const bcrypt = require("bcryptjs");

    let updateData = {};

    if (email) {
      updateData.email = email.trim().replace(/\s+/g, "").toLowerCase();
    }

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
      updateData.plainPassword = password;
    }

    const updated = await Student.findByIdAndUpdate(id, updateData, { new: true });

    res.json({
      success: true,
      student: updated
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};