const mongoose = require('mongoose');

const response = new mongoose.Schema({
    project_id: Number,
    name: String,
    questionnaire_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Questionnaire',
    },
    questions: {
      type: Map,
      of: Number,
    },
});

const Response = mongoose.model('Responses', response);

module.exports = Response;
