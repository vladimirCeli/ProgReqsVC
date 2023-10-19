const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  original: {
    type: Boolean,
    default: false,
    required: true,
  },
  practices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: 'Practice',
    },
  ],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

