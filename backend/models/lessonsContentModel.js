const mongoose = require("mongoose");

const lessonContentSchema = new mongoose.Schema(
  {
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true
    },

    filiere: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },

    annee: {
      type: String,
      required: true,
      enum: ["1", "2"],
      trim: true
    },

    subjectTitle: {
      type: String,
      required: true,
      trim: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      required: true,
      enum: ["cours", "exercice", "examen", "tp"],
      trim: true
    },

    content: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("LessonContent", lessonContentSchema);