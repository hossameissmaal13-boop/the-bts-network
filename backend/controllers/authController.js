const bcrypt = require("bcryptjs");
const Student = require("../models/studentModel");
const generateToken = require("../utils/tokenGenerator");

// ===============================
// REGISTER
// ===============================
exports.register = async (req, res) => {
  try {
    let {
      nomFr,
      prenomFr,
      codeMassar,
      filiere,
      anneeScolaire,
      email,
      password,
      typeBTS
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email et mot de passe obligatoires"
      });
    }

    email = email.trim().replace(/\s+/g, "").toLowerCase();
    password = password;
    typeBTS = (typeBTS || "").trim();

    const existingEmail = await Student.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email déjà utilisé"
      });
    }

    let student = null;

    // ===============================
    // BTS LIBRE
    // ===============================
    if (typeBTS === "Libre") {
      if (!nomFr || !prenomFr || !filiere || !anneeScolaire) {
        return res.status(400).json({
          success: false,
          message: "Informations BTS Libre incomplètes"
        });
      }

      nomFr = nomFr.trim();
      prenomFr = prenomFr.trim();
      filiere = filiere.trim().toUpperCase();
      anneeScolaire = anneeScolaire.trim();

      // كنقلبو واش الطالب libre كاين من قبل
      student = await Student.findOne({
        nom: new RegExp(`^${nomFr}$`, "i"),
        prenom: new RegExp(`^${prenomFr}$`, "i"),
        filiere,
        anneeScolaire,
        typeBTS: "Libre"
      });

      // إلا ما كانش، كنصاوبو record جديد
      if (!student) {
        student = new Student({
          nom: nomFr,
          prenom: prenomFr,
          filiere,
          anneeScolaire,
          typeBTS: "Libre"
        });
      } else {
        // إلا كان record libre موجود وديجا مسجل
        if (student.email) {
          return res.status(400).json({
            success: false,
            message: "Ce compte BTS Libre est déjà inscrit"
          });
        }
      }
    }

    // ===============================
    // BTS CONNECTER
    // ===============================
    else {
      if (!nomFr || !prenomFr || !codeMassar) {
        return res.status(400).json({
          success: false,
          message: "Informations BTS Connecter incomplètes"
        });
      }

      codeMassar = codeMassar.trim().toUpperCase();

      student = await Student.findOne({ codeMassar });

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Étudiant introuvable"
        });
      }

      if (student.email) {
        return res.status(400).json({
          success: false,
          message: "Ce compte est déjà inscrit"
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    student.email = email;
    student.password = hashedPassword;
    student.plainPassword = password;

    await student.save();

    return res.status(201).json({
      success: true,
      token: generateToken(student._id),
      student
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// ===============================
// LOGIN
// ===============================
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email et mot de passe obligatoires"
      });
    }

    email = email.trim().replace(/\s+/g, "").toLowerCase();

    console.log("📥 LOGIN DATA:", { email, password });

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    console.log("🔑 PASSWORD MATCH:", isMatch);
    console.log("🔓 PLAIN PASSWORD IN DB:", student.plainPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong password"
      });
    }

    return res.json({
      success: true,
      token: generateToken(student._id),
      student
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};