const mongoose = require('mongoose');
const Question = require('../questionnaire/question.model');

mongoose.connect('mongodb+srv://adminbdv0:7MMUH9CCCwwNiNaf@cluster0.vzvpyft.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updateQuestions() {
  try {
    const result = await Question.updateMany({}, { $set: { original: true } });
    console.log('Campo original actualizado a true en', result.nModified, 'documentos.');
  } catch (err) {
    console.error('Error al actualizar el campo original:', err);
  } finally {
    mongoose.connection.close();
  }
}

updateQuestions();
