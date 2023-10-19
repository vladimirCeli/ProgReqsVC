const mongoose = require('mongoose');

const practiceSchema = new mongoose.Schema({
  name: String,
  original: {
    type: Boolean,
    default: false,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: 'Question',
    },
  ],
});

const Practice = mongoose.model('Practice', practiceSchema);

module.exports = Practice;
