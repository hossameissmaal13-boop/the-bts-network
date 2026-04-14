const LessonContent = require("../models/lessonContentModel");
const Lesson = require("../models/lessonModel");

// Ajouter contenu avec fichier
exports.addLessonContent = async (req, res) => {
  try {
    let { lessonId, title, type } = req.body;

    if (!lessonId || !title || !type) {
      return res.status(400).json({
        success: false,
        message: "Les champs obligatoires sont manquants"
      });
    }

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Matière introuvable"
      });
    }

    let fileUrl = "";
    let fileName = "";
    let fileType = "";

    if (req.file) {
      fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      fileName = req.file.originalname;
      fileType = req.file.mimetype;
    }

    const newContent = await LessonContent.create({
      lessonId,
      filiere: lesson.filiere,
      annee: lesson.annee,
      subjectTitle: lesson.title,
      title: title.trim(),
      type: type.trim(),
      fileUrl,
      fileName,
      fileType
    });

    return res.status(201).json({
      success: true,
      message: "Contenu ajouté avec succès",
      item: newContent
    });
  } catch (error) {
    console.error("ADD LESSON CONTENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Get by lesson
exports.getLessonContentsByLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const items = await LessonContent.find({ lessonId }).sort({
      type: 1,
      createdAt: -1
    });

    return res.json({
      success: true,
      items
    });
  } catch (error) {
    console.error("GET LESSON CONTENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Update
exports.updateLessonContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type } = req.body;

    const item = await LessonContent.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Contenu introuvable"
      });
    }

    item.title = title || item.title;
    item.type = type || item.type;

    if (req.file) {
      item.fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      item.fileName = req.file.originalname;
      item.fileType = req.file.mimetype;
    }

    await item.save();

    return res.json({
      success: true,
      message: "Contenu modifié",
      item
    });
  } catch (error) {
    console.error("UPDATE LESSON CONTENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Delete
exports.deleteLessonContent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await LessonContent.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Contenu introuvable"
      });
    }

    return res.json({
      success: true,
      message: "Contenu supprimé"
    });
  } catch (error) {
    console.error("DELETE LESSON CONTENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};