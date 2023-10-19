const mongoose = require('mongoose');
const Category = require('../questionnaire/categorie.model');

mongoose.connect('mongodb+srv://adminbdv0:7MMUH9CCCwwNiNaf@cluster0.vzvpyft.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updatePractices() {
  try {
    const result = await Category.updateMany({}, { $set: { original: true } });
    console.log('Campo original actualizado a true en', result.nModified, 'documentos.');
  } catch (err) {
    console.error('Error al actualizar el campo original:', err);
  } finally {
    mongoose.connection.close();
  }
}

updatePractices();
