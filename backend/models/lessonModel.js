const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    filiere: {
      type: String,
      required: true,
      enum: ["EII", "DAI", "TC", "CG"],
      uppercase: true,
      trim: true,
    },
    annee: {
      type: String,
      required: true,
      enum: ["1", "2"],
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

lessonSchema.index({ filiere: 1, annee: 1, title: 1 }, { unique: true });

module.exports = mongoose.model("Lesson", lessonSchema);