// Importar el modelo Response
const Response = require('../../model/questionnaire/response.model');

// Controlador para crear una nueva respuesta
const createResponse = async (req, res) => {
  try {
    const { project_id, name, questions, questionnaire_id } = req.body;

    let name1 = name.trimLeft();

    if (!name1) {
      return res.status(400).json({ message: 'El nombre de la respuesta no puede estar vacío.' });
    }

    const response = new Response({ project_id, name, questions, questionnaire_id });
    const savedResponse = await response.save();
    res.status(200).json({savedResponse, message: 'Respuesta guardada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la respuesta' });
  }
};

// Controlador para obtener todas las respuestas
const getAllResponses = async (req, res) => {
  try {
    const responses = await Response.find();
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las respuestas' });
  }
};
// Controlador para obtener una respuesta por su ID
const getResponseById = async (req, res) => {
  try {
    const response = await Response.findById(req.params.id);
    if (!response) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la respuesta' });
  }
};

// Controlador para actualizar una respuesta por su ID
const updateResponseById = async (req, res) => {
  try {
    const { project_id, name, questions, questionnaire_id } = req.body;

    let name1 = name.trimLeft();

    if (!name1) {
      return res.status(400).json({ message: 'El nombre de la respuesta no puede estar vacío.' });
    }

    const response = await Response.findByIdAndUpdate(
      req.params.id,
      { project_id, name, questions, questionnaire_id },
      { new: true }
    );
    if (!response) {
      return res.status(404).json({ message: 'Respuesta no encontrada' });
    }
    res.status(200).json({response, message: 'Respuesta actualizada con éxito'});
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la respuesta' });
  }
};

const getResponseByProjectAndQuestionnaireId = async (req, res) => {
  try {
    const response = await Response.find({ project_id: req.params.id, questionnaire_id: req.params.id2 });
    if (!response) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la respuesta' });
  }
};

// Controlador para eliminar una respuesta por su ID
const deleteResponseById = async (req, res) => {
  try {
    const response = await Response.findById(req.params.id);
    if (!response) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }
    
    await Response.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Respuesta eliminada con éxito' });
    
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la respuesta' });
  }
};

// Exportar los controladores para su uso en las rutas
module.exports = {
  createResponse,
  getAllResponses,
  getResponseByProjectAndQuestionnaireId,
  getResponseById,
  updateResponseById,
  deleteResponseById,
};
