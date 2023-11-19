const Questionnaire = require("../../model/questionnaire/questionnaire.model");
const Response = require("../../model/questionnaire/response.model");

// Obtener todos los cuestionarios
const getAllQuestionnaires = async (req, res) => {
  try {
    const questionnaires = await Questionnaire.find().populate("categories");
    res.status(200).json(questionnaires);
  } catch (error) {
    console.error("Error al obtener los cuestionarios:", error);
    res
      .status(500)
      .json({ error: "Hubo un error al obtener los cuestionarios." });
  }
};

// Obtener un cuestionario por su ID
const getQuestionnaireById = async (req, res) => {
  try {
    const questionnaire = await Questionnaire.findById(req.params.id).populate(
      "categories"
    );
    if (!questionnaire) {
      return res.status(404).json({ error: "Cuestionario no encontrado." });
    }
    res.status(200).json(questionnaire);
  } catch (error) {
    console.error("Error al obtener el cuestionario por ID:", error);
    res
      .status(500)
      .json({ error: "Hubo un error al obtener el cuestionario." });
  }
};

const getQuestionnairePublished = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { selectedId } = req.body;

    // Obtener cuestionarios publicados con steps 1
    const questionnairesStep1 = await Questionnaire.find({
      published: true,
      steps: 1,
    });

    const questionnairesStep2 = await Questionnaire.find({
      published: true,
      steps: 2,
    });

    if (!questionnairesStep1 || questionnairesStep1.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron cuestionarios con steps 1." });
    }

    // Verificar si hay respuestas para cuestionarios con steps 1
    const hasResponsesStep1 = await Response.exists({
      project_id,
      questionnaire_id: { $in: questionnairesStep1.map((q) => q._id) },
    });

    console.log("hasResponsesStep1: " + hasResponsesStep1);

    // Si hay respuestas, obtener cuestionarios con steps 1 y 2
    if (hasResponsesStep1) {
      const questionnairesStep1And2 = await Questionnaire.find({
        published: true,
        steps: { $in: [1, 2] },
      });

      if (questionnairesStep1And2.length === 0) {
        return res
          .status(404)
          .json({ error: "No se encontraron cuestionarios con steps 1 y 2." });
      }
      res.status(200).json(questionnairesStep1And2);
    } else {
      res.status(200).json(questionnairesStep1);
    }
  } catch (error) {
    res.status(500).json({
      error: "Hubo un error al obtener cuestionarios publicados.",
    });
  }
};

const getAdditionalQuestionnaires = async (req, res) => {
  try {
    const { project_id } = req.params;

    const questionnairesStep2 = await Questionnaire.find({
      published: true,
      steps: 2,
    });

    const hasResponsesStep2 = await Response.exists({
      project_id,
      questionnaire_id: { $in: questionnairesStep2.map((q) => q._id) },
    });

    if (!hasResponsesStep2) {
      return res.status(404).json({
        error:
          "No se encontraron respuestas para cuestionarios con steps 2. No se pueden mostrar cuestionarios adicionales.",
      });
    }

    const additionalQuestionnaires = await Questionnaire.find({
      published: true,
      steps: 0,
    });

    if (!additionalQuestionnaires || additionalQuestionnaires.length === 0) {
      return res.status(404).json({
        error: "No se encontraron cuestionarios adicionales.",
      });
    }

   // Obtener cuestionarios adicionales con respuestas y sin respuestas para steps 0
   const questionnairesWithResponses = [];
   const questionnairesWithoutResponses = [];

   for (const q of additionalQuestionnaires) {
     const hasResponsesStep0 = await Response.exists({
       project_id,
       questionnaire_id: q._id,
     });

     const questionnaireData = { ...q.toObject(), hasResponsesStep0 };

     if (hasResponsesStep0) {
       questionnairesWithResponses.push(questionnaireData);
     } else {
       questionnairesWithoutResponses.push(questionnaireData);
     }
   }

   res.status(200).json({
     questionnairesWithResponses,
     questionnairesWithoutResponses,
   });
  } catch (error) {
    res.status(500).json({
      error: "Hubo un error al obtener cuestionarios adicionales.",
    });
  }
};

const selectAdditionalQuestionnaire = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { selectedId } = req.body;

    const selectedQuestionnaire = await Questionnaire.find({
      _id: selectedId,
      published: true,
      steps: 0,
    });

    if (!selectedQuestionnaire) {
      return res.status(404).json({
        error: "No se encontró cuestionario adicional.",
      });
    }
    console.log(selectedQuestionnaire);

    const hasResponses = await Response.exists({
      project_id,
      questionnaire_id: selectedId,
    });

    if (!hasResponses) {
      console.log("No hay respuestas");
      res.status(200).json(selectedQuestionnaire);
    } else {
      console.log("Hay respuestas");
      console.log(hasResponses);

      return res.status(400).json({
        error:
          "Ya hay respuestas para el cuestionario seleccionado. No se pueden mostrar cuestionarios adicionales.",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Hubo un error al seleccionar cuestionario adicional." });
  }
};

const updateQuestionnaireByIdInPublishedOrUnpublished = async (req, res) => {
  try {
    const { published } = req.body;
    const updatedQuestioBynnaire = await Questionnaire.findByIdAndUpdate(
      req.params.id,
      { published },
      { new: true }
    );
    if (!updatedQuestioBynnaire) {
      return res.status(404).json({ error: "Cuestionario no encontrado." });
    }
    res.status(200).json(updatedQuestioBynnaire);
  } catch (error) {
    console.error("Error al actualizar el cuestionario por ID:", error);
    res
      .status(500)
      .json({ error: "Hubo un error al actualizar el cuestionario." });
  }
};

const updateQuestionnaireByIdSteps = async (req, res) => {
  try {
    const { steps } = req.body;

    // Obtener el cuestionario actual por su ID
    const currentQuestionnaire = await Questionnaire.findById(req.params.id);

    if (!currentQuestionnaire) {
      return res.status(404).json({ message: "Cuestionario no encontrado." });
    }

    // Si el nuevo paso es 1 o 2, verificamos que no exista otro cuestionario con ese paso
    if (steps === 1 || steps === 2) {
      const existingQuestionnaireWithStep = await Questionnaire.findOne({
        _id: { $ne: req.params.id }, // Excluir el cuestionario actual
        steps: steps,
      });

      if (existingQuestionnaireWithStep) {
        return res.status(400).json({
          message: `El paso ${steps} ya está siendo utilizado en otro cuestionario.`,
        });
      }
    }

    // Actualizar el cuestionario con los nuevos pasos
    const updatedQuestionnaire = await Questionnaire.findByIdAndUpdate(
      req.params.id,
      { steps },
      { new: true }
    );

    res.status(200).json(updatedQuestionnaire);
  } catch (error) {
    console.error("Error al actualizar el cuestionario por ID:", message);
    res
      .status(500)
      .json({ message: "Hubo un error al actualizar el cuestionario." });
  }
};

const getQuestionnaireComplete = async (req, res) => {
  const categoryId = req.query.categoryId || null;
  const practiceId = req.query.practiceId || null;

  try {
    let questionnaire;
    if (categoryId && practiceId) {
      // Filtrar por categoría y práctica específica
      questionnaire = await Questionnaire.findById(req.params.id).populate({
        path: "categories",
        match: { _id: categoryId },
        populate: {
          path: "practices",
          match: { _id: practiceId },
          populate: {
            path: "questions",
          },
        },
      });
    } else if (categoryId) {
      // Filtrar solo por categoría específica
      questionnaire = await Questionnaire.findById(req.params.id).populate({
        path: "categories",
        match: { _id: categoryId },
        populate: {
          path: "practices",
          populate: {
            path: "questions",
          },
        },
      });
    } else {
      // Obtener todo el cuestionario
      questionnaire = await Questionnaire.findById(req.params.id).populate({
        path: "categories",
        populate: {
          path: "practices",
          populate: {
            path: "questions",
          },
        },
      });
    }

    if (!questionnaire) {
      return res.status(404).json({ error: "Cuestionario no encontrado." });
    }

    res.status(200).json(questionnaire);
  } catch (error) {
    console.error("Error al obtener el cuestionario por ID:", error);
    res
      .status(500)
      .json({ error: "Hubo un error al obtener el cuestionario." });
  }
};

const createQuestionnaire = async (req, res) => {
  try {
    const { name, original, published, categories } = req.body;

    let name1 = name.trimLeft();
    if (!name1) {
      return res
        .status(400)
        .json({ error: "El nombre del cuestionario no puede estar vacío." });
    }

    if (!categories || categories.length === 0) {
      return res
        .status(400)
        .json({ error: "Debe seleccionar al menos una categoría." });
    }

    const newQuestionnaire = new Questionnaire({
      name,
      original,
      published,
      categories,
    });
    const savedQuestionnaire = await newQuestionnaire.save();
    res.status(201).json({ savedQuestionnaire, success: "Cuestionario creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al crear el cuestionario." });
  }
};

const updateQuestionnaireById = async (req, res) => {
  try {
    const { name, original, published, categories } = req.body;

    let name1 = name.trimLeft();
    if (!name1) {
      return res
        .status(400)
        .json({ error: "El nombre del cuestionario no puede estar vacío." });
    }

    if (!categories || categories.length === 0) {
      return res
        .status(400)
        .json({ error: "Debe seleccionar al menos una categoría." });
    }

    const updatedQuestionnaire = await Questionnaire.findByIdAndUpdate(
      req.params.id,
      { name, original, published, categories },
      { new: true }
    ).populate("categories");

    if (!updatedQuestionnaire) {
      return res.status(404).json({ error: "Cuestionario no encontrado." });
    }

    res.status(200).json({ updatedQuestionnaire, success: "Cuestionario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el cuestionario por ID:", error);
    res
      .status(500)
      .json({ error: "Hubo un error al actualizar el cuestionario." });
  }
};

// Eliminar un cuestionario por su ID
const deleteQuestionnaireById = async (req, res) => {
  try {
    const deletedQuestionnaire = await Questionnaire.findByIdAndRemove(
      req.params.id
    );
    if (!deletedQuestionnaire) {
      return res.status(404).json({ error: "Cuestionario no encontrado." });
    }
    res.status(200).json({ success: "Cuestionario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el cuestionario por ID:", error);
    res
      .status(500)
      .json({ error: "Hubo un error al eliminar el cuestionario." });
  }
};

module.exports = {
  getAllQuestionnaires,
  getQuestionnaireById,
  getQuestionnaireComplete,
  updateQuestionnaireByIdInPublishedOrUnpublished,
  updateQuestionnaireByIdSteps,
  getAdditionalQuestionnaires,
  selectAdditionalQuestionnaire,
  getQuestionnairePublished,
  createQuestionnaire,
  updateQuestionnaireById,
  deleteQuestionnaireById,
};
