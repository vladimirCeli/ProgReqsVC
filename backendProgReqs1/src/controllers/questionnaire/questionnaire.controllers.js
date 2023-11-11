const Questionnaire = require('../../model/questionnaire/questionnaire.model');
const Response = require('../../model/questionnaire/response.model');

// Obtener todos los cuestionarios
const getAllQuestionnaires = async (req, res) => {
  try {
    const questionnaires = await Questionnaire.find().populate('categories');
    res.status(200).json(questionnaires);
  } catch (error) {
    console.error('Error al obtener los cuestionarios:', error);
    res.status(500).json({ error: 'Hubo un error al obtener los cuestionarios.' });
  }
};

// Obtener un cuestionario por su ID
const getQuestionnaireById = async (req, res) => {
  try {
    const questionnaire = await Questionnaire.findById(req.params.id).populate('categories');
    if (!questionnaire) {
      return res.status(404).json({ error: 'Cuestionario no encontrado.' });
    }
    res.status(200).json(questionnaire);
  } catch (error) {
    console.error('Error al obtener el cuestionario por ID:', error);
    res.status(500).json({ error: 'Hubo un error al obtener el cuestionario.' });
  }
};

const getQuestionnairePublished = async (req, res) => {
  try {
    const { project_id } = req.params;

    // Obtener cuestionarios publicados con steps 1
    const questionnairesStep1 = await Questionnaire.find({
      published: true,
      steps: 1,
    }).populate('categories');

    if (!questionnairesStep1 || questionnairesStep1.length === 0) {
      return res.status(404).json({ error: 'No se encontraron cuestionarios con steps 1.' });
    }

    // Verificar si hay respuestas para cuestionarios con steps 1
    const hasResponsesStep1 = await Response.exists({
      project_id,
      questionnaire_id: { $in: questionnairesStep1.map(q => q._id) },
    });

    // Si hay respuestas, obtener cuestionarios con steps 1 y 2
    if (hasResponsesStep1) {
      const questionnairesStep1And2 = await Questionnaire.find({
        published: true,
        steps: { $in: [1, 2] },
      }).populate('categories');

      // Verificar si hay respuestas para cuestionarios con steps 2
      const hasResponsesStep2 = await Response.exists({
        project_id,
        questionnaire_id: { $in: questionnairesStep1And2.map(q => q._id) },
      });

      // Si hay respuestas, obtener todos los cuestionarios con steps 0, 1, y 2
      if (hasResponsesStep2) {
        const questionnairesAllSteps = await Questionnaire.find({
          published: true,
          steps: { $in: [0, 1, 2] },
        }).populate('categories');

        // Filtrar cuestionarios con steps 0 que tienen respuestas
        const questionnairesWithResponsesStep0 = questionnairesAllSteps.filter(async (q) => {
          if (q.steps === 0) {
            return await Response.exists({ project_id, questionnaire_id: q._id });
          }
          return true;
        });

        res.status(200).json(questionnairesWithResponsesStep0);
      } else {
        // No hay respuestas para cuestionarios con steps 2, devolver cuestionarios con steps 1
        res.status(200).json(questionnairesStep1And2);
      }
    } else {
      // No hay respuestas para cuestionarios con steps 1, devolver cuestionarios con steps 1
      res.status(200).json(questionnairesStep1);
    }
  } catch (error) {
    console.error('Error al obtener cuestionarios publicados:', error);
    res.status(500).json({ error: 'Hubo un error al obtener cuestionarios publicados.' });
  }
}


const updateQuestionnaireByIdInPublishedOrUnpublished = async (req, res) => {
  try {
    const { published } = req.body;
    const updatedQuestioBynnaire = await Questionnaire.findByIdAndUpdate(
      req.params.id,
      { published },
      { new: true }
    )
    if (!updatedQuestioBynnaire) {
      return res.status(404).json({ error: 'Cuestionario no encontrado.' });
    }
    res.status(200).json(updatedQuestioBynnaire);
  } catch (error) {
    console.error('Error al actualizar el cuestionario por ID:', error);
    res.status(500).json({ error: 'Hubo un error al actualizar el cuestionario.' });
  }
};

const updateQuestionnaireByIdSteps = async (req, res) => {
  try {
    const { steps } = req.body;

    // Obtener el cuestionario actual por su ID
    const currentQuestionnaire = await Questionnaire.findById(req.params.id);

    if (!currentQuestionnaire) {
      return res.status(404).json({ message: 'Cuestionario no encontrado.' });
    }

    // Si el nuevo paso es 1 o 2, verificamos que no exista otro cuestionario con ese paso
    if (steps === 1 || steps === 2) {
      const existingQuestionnaireWithStep = await Questionnaire.findOne({
        _id: { $ne: req.params.id }, // Excluir el cuestionario actual
        steps: steps,
      });

      if (existingQuestionnaireWithStep) {
        return res.status(400).json({ message: `El paso ${steps} ya está siendo utilizado en otro cuestionario.` });
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
    console.error('Error al actualizar el cuestionario por ID:', message);
    res.status(500).json({ message: 'Hubo un error al actualizar el cuestionario.' });
  }
};


const getQuestionnaireComplete = async (req, res) => {
  const categoryId = req.query.categoryId || null;
  const practiceId = req.query.practiceId || null;

  try {
    let questionnaire;
    if (categoryId && practiceId) {
      // Filtrar por categoría y práctica específica
      questionnaire = await Questionnaire.findById(req.params.id)
        .populate({
          path: 'categories',
          match: { _id: categoryId },
          populate: {
            path: 'practices',
            match: { _id: practiceId },
            populate: {
              path: 'questions',
            },
          },
        });
    } else if (categoryId) {
      // Filtrar solo por categoría específica
      questionnaire = await Questionnaire.findById(req.params.id)
        .populate({
          path: 'categories',
          match: { _id: categoryId },
          populate: {
            path: 'practices',
            populate: {
              path: 'questions',
            },
          },
        });
    } else {
      // Obtener todo el cuestionario
      questionnaire = await Questionnaire.findById(req.params.id)
        .populate({
          path: 'categories',
          populate: {
            path: 'practices',
            populate: {
              path: 'questions',
            },
          },
        });
    }

    if (!questionnaire) {
      return res.status(404).json({ error: 'Cuestionario no encontrado.' });
    }

    res.status(200).json(questionnaire);
  } catch (error) {
    console.error('Error al obtener el cuestionario por ID:', error);
    res.status(500).json({ error: 'Hubo un error al obtener el cuestionario.' });
  }
};


const createQuestionnaire = async (req, res) => {
  try {
    const { name, original, published, categories } = req.body;
    
    let name1 = name.trimLeft();
    if (!name1) {
      return res.status(400).json({ error: 'El nombre del cuestionario no puede estar vacío.' });
    }

    if (!categories || categories.length === 0) {
      return res.status(400).json({ error: 'Debe seleccionar al menos una categoría.' });
    }

    const newQuestionnaire = new Questionnaire({ name, original, published, categories });
    const savedQuestionnaire = await newQuestionnaire.save();
    res.status(201).json(savedQuestionnaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al crear el cuestionario.' });
  }
};

const updateQuestionnaireById = async (req, res) => {
  try {
    const { name, original, published, categories } = req.body;

    let name1 = name.trimLeft();
    if (!name1) {
      return res.status(400).json({ error: 'El nombre del cuestionario no puede estar vacío.' });
    }

    if (!categories || categories.length === 0) {
      return res.status(400).json({ error: 'Debe seleccionar al menos una categoría.' });
    }

    const updatedQuestionnaire = await Questionnaire.findByIdAndUpdate(
      req.params.id,
      { name, original, published, categories },
      { new: true }
    ).populate('categories');
    
    if (!updatedQuestionnaire) {
      return res.status(404).json({ error: 'Cuestionario no encontrado.' });
    }

    res.status(200).json(updatedQuestionnaire);
  } catch (error) {
    console.error('Error al actualizar el cuestionario por ID:', error);
    res.status(500).json({ error: 'Hubo un error al actualizar el cuestionario.' });
  }
};

// Eliminar un cuestionario por su ID
const deleteQuestionnaireById = async (req, res) => {
  try {
    const deletedQuestionnaire = await Questionnaire.findByIdAndRemove(req.params.id);
    if (!deletedQuestionnaire) {
      return res.status(404).json({ error: 'Cuestionario no encontrado.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar el cuestionario por ID:', error);
    res.status(500).json({ error: 'Hubo un error al eliminar el cuestionario.' });
  }
};

module.exports = {
  getAllQuestionnaires,
  getQuestionnaireById,
  getQuestionnaireComplete,
  updateQuestionnaireByIdInPublishedOrUnpublished,
  updateQuestionnaireByIdSteps,
  getQuestionnairePublished,
  createQuestionnaire,
  updateQuestionnaireById,
  deleteQuestionnaireById,
};
