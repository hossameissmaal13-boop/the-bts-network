const Lesson = require("../models/Lesson");

// ✅ Ajouter une matière
exports.addLesson = async (req, res) => {
  try {
    let { filiere, annee, title } = req.body;

    if (!filiere || !annee || !title) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont obligatoires",
      });
    }

    filiere = filiere.trim().toUpperCase();
    annee = annee.trim();
    title = title.trim();

    const existingLesson = await Lesson.findOne({ filiere, annee, title });

    if (existingLesson) {
      return res.status(400).json({
        success: false,
        message: "Cette matière existe déjà",
      });
    }

    const lesson = await Lesson.create({
      filiere,
      annee,
      title,
    });

    return res.status(201).json({
      success: true,
      message: "Matière ajoutée avec succès",
      lesson,
    });
  } catch (error) {
    console.error("ADD LESSON ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};

// ✅ Récupérer toutes les matières
exports.getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({
      filiere: 1,
      annee: 1,
      title: 1,
    });

    return res.json({
      success: true,
      lessons,
    });
  } catch (error) {
    console.error("GET LESSONS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};

// ✅ Récupérer les matières par filière + année
exports.getLessonsByFiliereAndAnnee = async (req, res) => {
  try {
    let { filiere, annee } = req.params;

    filiere = filiere.trim().toUpperCase();
    annee = annee.trim();

    const lessons = await Lesson.find({ filiere, annee }).sort({ title: 1 });

    return res.json({
      success: true,
      lessons,
    });
  } catch (error) {
    console.error("GET LESSONS BY FILIERE/ANNEE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};

// ✅ Modifier une matière
exports.updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    let { filiere, annee, title } = req.body;

    if (!filiere || !annee || !title) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont obligatoires",
      });
    }

    filiere = filiere.trim().toUpperCase();
    annee = annee.trim();
    title = title.trim();

    const existingLesson = await Lesson.findOne({
      filiere,
      annee,
      title,
      _id: { $ne: id },
    });

    if (existingLesson) {
      return res.status(400).json({
        success: false,
        message: "Une matière avec les mêmes informations existe déjà",
      });
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(
      id,
      { filiere, annee, title },
      { new: true }
    );

    if (!updatedLesson) {
      return res.status(404).json({
        success: false,
        message: "Matière introuvable",
      });
    }

    return res.json({
      success: true,
      message: "Matière modifiée avec succès",
      lesson: updatedLesson,
    });
  } catch (error) {
    console.error("UPDATE LESSON ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};

// ✅ Supprimer une matière
exports.deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLesson = await Lesson.findByIdAndDelete(id);

    if (!deletedLesson) {
      return res.status(404).json({
        success: false,
        message: "Matière introuvable",
      });
    }

    return res.json({
      success: true,
      message: "Matière supprimée avec succès",
    });
  } catch (error) {
    console.error("DELETE LESSON ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};