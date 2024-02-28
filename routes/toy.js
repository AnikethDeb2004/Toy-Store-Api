// routes/toys.js
const express = require('express');
const router = express.Router();
const toyController = require('../controllers/toyController');

router.post('/', toyController.createToy);
router.get('/', toyController.getAllToys);
router.get('/:id', toyController.getToyById);
router.put('/:id', toyController.updateToy);
router.delete('/:id', toyController.deleteToy);

module.exports = router;
