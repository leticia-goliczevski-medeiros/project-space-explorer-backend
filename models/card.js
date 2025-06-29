const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'A valid link is required.',
    },
  },
  date: {
    type: String,
    required: true,
    match: /^\d{4}-\d{2}-\d{2}$/,
  },
});

module.exports = mongoose.model('card', cardSchema);
