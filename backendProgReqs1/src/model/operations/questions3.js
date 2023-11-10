const mongoose = require('mongoose');
const Question = require('../questionnaire/questionnaire.model'); // Asegúrate de especificar la ruta correcta al modelo Question

mongoose.connect('mongodb+srv://adminbdv0:7MMUH9CCCwwNiNaf@cluster0.vzvpyft.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function addStepsField() {
    try {
      // Actualizar la base de datos para incluir el nuevo campo 'steps'
      await Question.updateMany({ steps: { $exists: false } }, { $set: { steps: 0 } });
      console.log('Campo "steps" agregado con éxito en los documentos que no tenían este campo.');
    } catch (err) {
      console.error('Error al agregar el campo "steps":', err);
    } finally {
      mongoose.connection.close();
    }
  }
  
  addStepsField();
