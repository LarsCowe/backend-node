const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');
const { genreValidationRules, validate } = require('../middleware/genreValidation');

router.get('/', genreController.getAll);
router.get('/:id', genreController.getById);
router.post('/', genreValidationRules, validate, genreController.create);
router.put('/:id', genreValidationRules, validate, genreController.update);
router.delete('/:id', genreController.delete);

module.exports = router;
