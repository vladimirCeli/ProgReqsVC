const mongoose = require('mongoose');
const Question = require('../questionnaire/question.model'); // Asegúrate de especificar la ruta correcta al modelo Question

mongoose.connect('mongodb+srv://adminbdv0:7MMUH9CCCwwNiNaf@cluster0.vzvpyft.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updateQuestions() {
    try {
      const result = await Question.updateMany({}, { $unset: { quality_criteria: 1 } });
      console.log('Campo quality_criteria eliminado con éxito en', result.nModified, 'documentos.');
    } catch (err) {
      console.error('Error al eliminar el campo quality_criteria:', err);
    } finally {
      mongoose.connection.close();
    }
  }
  
  updateQuestions();