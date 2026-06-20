const mongoose = require("mongoose");

const generateStudentId = () => {
  const random = Math.floor(10000000 + Math.random() * 90000000);
  return `STD${random}`;
};

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
      sparse: true,
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
      sparse: true,
      trim: true,
      lowercase: true,
      default: null
    },

    password: {
      type: String,
      default: null
    },

    photo: {
      type: String,
      default: ""
    },

    studentId: {
      type: String,
      unique: true,
      default: generateStudentId
    },
    plainPassword: {
  type: String
}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Student", studentSchema);