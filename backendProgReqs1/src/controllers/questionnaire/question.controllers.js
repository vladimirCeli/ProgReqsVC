const Question = require('../../model/questionnaire/question.model');
const Practice = require('../../model/questionnaire/practice.model');

const getAllQuestions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 5;
    const skip = (page - 1) * perPage;

    const totalQuestions = await Question.countDocuments();
    const questions = await Question.find().skip(skip).limit(perPage);

    res.status(200).json({
      questions,
      totalQuestions,
    });
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener las preguntas.' });
  }
};

const getAllQuestionsComplete = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener las preguntas.' });
  }
};

const getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ error: 'Pregunta no encontrada.' });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener la pregunta.' });
  }
};

const createQuestion = async (req, res) => {
  try {
    const {
      question,
      options,
      original,
    } = req.body;

    const newQuestion = new Question({
      question,
      options,
      original,
    });

    const savedQuestion = await newQuestion.save();

    res.status(201).json({savedQuestion, success: "Pregunta creada con éxito."});
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al crear la pregunta.' });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const {
      question,
      options,
      original,
    } = req.body;

    const existingQuestion = await Question.findById(req.params.id);

    if (!existingQuestion) {
      return res.status(404).json({ error: 'Pregunta no encontrada.' });
    }

    if (existingQuestion.original) {
      return res.status(400).json({ error: 'No puedes actualizar una pregunta original.' });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      {
        question,
        options,
        original,
      },
      { new: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ error: 'Pregunta no encontrada.' });
    }
    res.status(200).json({ updatedQuestion, success: 'Pregunta actualizada con éxito.' });
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al actualizar la pregunta.' });
  }
};


const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ error: 'Pregunta no encontrada.' });
    }
    if (question.original) {
      return res.status(400).json({ error: 'No puedes eliminar una pregunta original.' });
    }

    const isQuestionInUse = await Practice.findOne({ questions: req.params.id });

    if (isQuestionInUse) {
      return res.status(400).json({ error: 'No puedes eliminar una pregunta que está asociada a una práctica.' });
    }

    const deletedQuestion = await Question.findByIdAndRemove(req.params.id);
    res.status(200).json( { success: 'Pregunta eliminada con éxito.' });
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al eliminar la pregunta.' });
  }
};


module.exports = {
  getAllQuestions,
  getAllQuestionsComplete,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};