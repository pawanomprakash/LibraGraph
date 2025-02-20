const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  image_link: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('BiographyBook', bookSchema);
