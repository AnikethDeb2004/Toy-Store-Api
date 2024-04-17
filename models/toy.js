
const mongoose = require('mongoose');

const toySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
});

const Toy = mongoose.model('Toy', toySchema);

module.exports = Toy;
