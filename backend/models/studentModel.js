const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true
    },

    prenom: {
      type: String,
      required: true,
      trim: true
    },

    codeMassar: {
      type: String,
      unique: true,
      sparse: true, // ✅ مهم بزاف
      uppercase: true,
      trim: true,
      default: null
    },

    filiere: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },

    anneeScolaire: {
      type: String,
      required: true,
      trim: true
    },

    typeBTS: {
      type: String,
      enum: ["Connecter", "Libre"],
      default: "Connecter"
    },

    dateNaissance: {
      type: String,
      trim: true,
      default: null
    },

    email: {
      type: String,
      unique: true,
      sparse: true, // ✅ مهم باش Libre يخدم
      default: null
    },

    password: {
      type: String,
      default: null
    },

    plainPassword: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Student", studentSchema);