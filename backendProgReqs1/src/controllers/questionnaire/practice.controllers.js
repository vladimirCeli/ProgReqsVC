const Practice = require("../../model/questionnaire/practice.model");
const Category = require("../../model/questionnaire/categorie.model");

// Obtener todas las prácticas
const getAllPractices = async (req, res) => {
  try {
    const practices = await Practice.find().populate("questions");
    res.status(200).json(practices);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al obtener las prácticas." });
  }
};

// Obtener una práctica por su ID
const getPracticeById = async (req, res) => {
  try {
    const practice = await Practice.findById(req.params.id).populate(
      "questions"
    );
    if (!practice) {
      return res.status(404).json({ error: "Práctica no encontrada." });
    }
    res.status(200).json(practice);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al obtener la práctica." });
  }
};

// Crear una nueva práctica
const createPractice = async (req, res) => {
  try {
    const { name, original, questions } = req.body;
    const newPractice = new Practice({ name, original, questions });
    const savedPractice = await newPractice.save();
    res.status(201).json({ savedPractice, success: "Práctica creada con éxito." });
  } catch (error) {
    res.status(500).json({ error: "No se pueden crear dos prácticas con preguntas nulas." });
  }
};

// Actualizar una práctica por su ID
const updatePracticeById = async (req, res) => {
  try {
    const { name, original, questions } = req.body;

    const existingPractice = await Practice.findById(req.params.id);

    if (!existingPractice) {
      return res.status(404).json({ error: "Práctica no encontrada." });
    }

    if (existingPractice.original) {
      return res
        .status(400)
        .json({ error: "No puedes editar una práctica original." });
    }
    

    const updatedPractice = await Practice.findByIdAndUpdate(
      req.params.id,
      { name, original, questions },
      { new: true }
    ).populate("questions");

    if (!updatedPractice) {
      return res.status(404).json({ error: "Práctica no encontrada." });
    }
    res.status(200).json({updatedPractice, success: 'Práctica actualizada con éxito.'});
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al actualizar la práctica." });
  }
};

const deletePracticeById = async (req, res) => {
  try {
    const practices = await Practice.findById(req.params.id);

    if (!practices) {
      return res.status(404).json({ error: "Práctica no encontrada." });
    }

    if (practices.original) {
      return res
        .status(400)
        .json({ error: "No puedes eliminar una práctica original." });
    }

    const isPracticeInUse = await Category.findOne({ practices: req.params.id });

    if (isPracticeInUse) {
      return res
        .status(400)
        .json({
          error:
            "No puedes eliminar una práctica que está asociada a una categoría.",
        });
    }

    await Practice.findByIdAndRemove(req.params.id);
    res.status(200).json({ success: "Práctica eliminada con éxito." });
  } catch (error) {
   
    res.status(500).json({ error: "Hubo un error al eliminar la práctica." });
  }
};

module.exports = {
  getAllPractices,
  getPracticeById,
  createPractice,
  updatePracticeById,
  deletePracticeById,
};
