const bcrypt = require("bcryptjs");
const Student = require("../models/studentModel");
const generateToken = require("../utils/tokenGenerator");

const normalize = (value) => (value || "").toString().trim();
const normalizeUpper = (value) => normalize(value).replace(/\s+/g, "").toUpperCase();
const normalizeEmail = (value) => normalize(value).replace(/\s+/g, "").toLowerCase();

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
      dateNaissance,
      email,
      password,
      typeBTS
    } = req.body;

    email = normalizeEmail(email);
    password = normalize(password);
    typeBTS = normalize(typeBTS);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email et mot de passe obligatoires"
      });
    }

    const existingEmail = await Student.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email déjà utilisé"
      });
    }

    let student = null;

    if (typeBTS === "Libre") {
      nomFr = normalize(nomFr);
      prenomFr = normalize(prenomFr);
      filiere = normalizeUpper(filiere);
      anneeScolaire = normalize(anneeScolaire);
      dateNaissance = normalize(dateNaissance) || "2000-01-01";

      if (!nomFr || !prenomFr || !filiere || !anneeScolaire) {
        return res.status(400).json({
          success: false,
          message: "Informations BTS Libre incomplètes"
        });
      }

      student = await Student.findOne({
        nom: new RegExp(`^${nomFr}$`, "i"),
        prenom: new RegExp(`^${prenomFr}$`, "i"),
        filiere,
        anneeScolaire,
        typeBTS: "Libre"
      });

      if (!student) {
        student = new Student({
          nom: nomFr,
          prenom: prenomFr,
          codeMassar: `LIBRE_${Date.now()}`,
          filiere,
          anneeScolaire,
          typeBTS: "Libre",
          dateNaissance
        });
      } else {
        if (student.email) {
          return res.status(400).json({
            success: false,
            message: "Ce compte BTS Libre est déjà inscrit"
          });
        }
      }
    } else {
      nomFr = normalize(nomFr);
      prenomFr = normalize(prenomFr);
      codeMassar = normalizeUpper(codeMassar);

      if (!nomFr || !prenomFr || !codeMassar) {
        return res.status(400).json({
          success: false,
          message: "Informations BTS Connecter incomplètes"
        });
      }

      student = await Student.findOne({
        codeMassar,
        nom: new RegExp(`^${nomFr}$`, "i"),
        prenom: new RegExp(`^${prenomFr}$`, "i")
      });

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

      student.typeBTS = "Connecter";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

    email = normalizeEmail(email);
    password = normalize(password);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email et mot de passe obligatoires"
      });
    }

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, student.password || "");

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

// ===============================
// CHANGE PASSWORD
// ===============================
exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Ancien et nouveau mot de passe obligatoires"
      });
    }

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Étudiant introuvable"
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, student.password || "");
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Ancien mot de passe incorrect"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    await student.save();

    return res.json({
      success: true,
      message: "Mot de passe modifié avec succès"
    });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};