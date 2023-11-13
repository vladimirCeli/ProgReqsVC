const mongoose = require('mongoose');

const questionnaireSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  original: {
    type: Boolean,
    default: false,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
    required: true,
  },
  steps: {
    type: Number,
    default: 0,
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
  ],
});

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

module.exports = Questionnaire;
