const Student = require("../models/studentModel");
const bcrypt = require("bcryptjs");

// ===============================
// VERIFY STUDENT
// ===============================
exports.verifyStudent = async (req, res) => {
  try {
    const { nomFr, prenomFr, codeMassar, filiere, anneeScolaire, dateNaissance } = req.body;

    const student = await Student.findOne({
      codeMassar: (codeMassar || "").trim().toUpperCase(),
      nom: new RegExp(`^${(nomFr || "").trim()}$`, "i"),
      prenom: new RegExp(`^${(prenomFr || "").trim()}$`, "i"),
      filiere: (filiere || "").trim().toUpperCase(),
      anneeScolaire: (anneeScolaire || "").trim(),
      dateNaissance: (dateNaissance || "").trim()
    });

    if (!student) {
      return res.json({
        success: false,
        message: "❌ Informations incorrectes"
      });
    }

    return res.json({
      success: true,
      message: "✅ Étudiant vérifié"
    });
  } catch (error) {
    console.error("VERIFY STUDENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// ===============================
// ADD STUDENT
// ===============================
exports.addStudent = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      codeMassar,
      filiere,
      dateNaissance,
      anneeScolaire,
      typeBTS
    } = req.body;

    if (!nom || !prenom || !filiere || !anneeScolaire) {
      return res.status(400).json({
        success: false,
        message: "Champs obligatoires manquants"
      });
    }

    const newStudent = await Student.create({
      nom: nom.trim(),
      prenom: prenom.trim(),
      codeMassar: codeMassar ? codeMassar.trim().toUpperCase() : null,
      filiere: filiere.trim().toUpperCase(),
      dateNaissance: dateNaissance || "",
      anneeScolaire: anneeScolaire.trim(),
      typeBTS: typeBTS || "Connecter"
    });

    return res.status(201).json({
      success: true,
      student: newStudent
    });
  } catch (error) {
    console.error("ADD STUDENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// ===============================
// GET ALL STUDENTS
// ===============================
exports.getStudents = async (req, res) => {
  try {
    console.log("📥 GET /api/students");

    const students = await Student.find().sort({ createdAt: -1 }).lean();

    console.log("✅ Students fetched:", students.length);

    return res.json({
      success: true,
      students
    });
  } catch (error) {
    console.error("❌ GET STUDENTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message
    });
  }
};

// ===============================
// GET ME
// ===============================
exports.getMe = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Étudiant introuvable"
      });
    }

    return res.json({
      success: true,
      student
    });
  } catch (error) {
    console.error("GET ME ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// ===============================
// FORGOT PASSWORD
// ===============================
exports.forgotPassword = async (req, res) => {
  console.log("🚀 forgotPassword POST hit");
  return res.status(200).json({
    success: true,
    message: "FORGOT PASSWORD ROUTE OK"
  });
};

// ===============================
// UPDATE STUDENT
// ===============================
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    let { nom, prenom, email, password, photo } = req.body;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Étudiant introuvable"
      });
    }

    if (nom !== undefined) student.nom = nom.trim();
    if (prenom !== undefined) student.prenom = prenom.trim();
    if (photo !== undefined) student.photo = photo;

    if (email !== undefined) {
      const cleanedEmail = email.trim().replace(/\s+/g, "").toLowerCase();

      if (!cleanedEmail) {
        return res.status(400).json({
          success: false,
          message: "Email invalide"
        });
      }

      const existingEmail = await Student.findOne({
        email: cleanedEmail,
        _id: { $ne: id }
      });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email déjà utilisé"
        });
      }

      student.email = cleanedEmail;
    }

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      student.password = hashedPassword;
      student.plainPassword = password;
    }

    await student.save();

    return res.json({
      success: true,
      message: "Compte mis à jour avec succès",
      student
    });
  } catch (error) {
    console.error("UPDATE STUDENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// ===============================
// DELETE STUDENT
// ===============================
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Étudiant introuvable"
      });
    }

    await student.deleteOne();

    return res.json({
      success: true,
      message: "Étudiant supprimé avec succès"
    });
  } catch (error) {
    console.error("DELETE STUDENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};