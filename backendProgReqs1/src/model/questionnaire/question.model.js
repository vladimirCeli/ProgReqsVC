const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  value: Number,
  text: String,
});

const questionSchema = new mongoose.Schema({
  question: String,
  options: [optionSchema],
  original: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
