
const Toy = require('../models/Toy');
const axios = require('axios');

exports.createToy = async (req, res) => {
  try {
    const { name, description, price, species } = req.body;
    // Assuming you have a function to generate thumbnails based on species
    const imageUrl = await generateThumbnail(species);
    const toy = await Toy.create({ name, description, price, imageUrl });
    res.status(201).json({ toy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllToys = async (req, res) => {
  try {
    const toys = await Toy.find();
    res.json({ toys });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getToyById = async (req, res) => {
  try {
    const toy = await Toy.findById(req.params.id);
    if (!toy) {
      return res.status(404).json({ error: 'Toy not found' });
    }
    res.json({ toy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateToy = async (req, res) => {
  try {
    const toy = await Toy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!toy) {
      return res.status(404).json({ error: 'Toy not found' });
    }
    res.json({ toy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteToy = async (req, res) => {
  try {
    const toy = await Toy.findByIdAndDelete(req.params.id);
    if (!toy) {
      return res.status(404).json({ error: 'Toy not found' });
    }
    res.json({ message: 'Toy deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Function to generate thumbnail (pseudo code)
async function generateThumbnail(species) {
  try {
    const response = await axios.get(`http://pexels-api.com/${species}/thumbnail`);
    return response.data.imageUrl;
  } catch (error) {
    console.error(error);
    // Handle error, perhaps return a default image URL
    return 'default-thumbnail-url.jpg';
  }
}
