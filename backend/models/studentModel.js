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
      required: true,
      unique: true,
      uppercase: true,
      trim: true
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
      required: true,
      trim: true
    },

    // ✅ الجديد فقط
    email: {
      type: String,
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