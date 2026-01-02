const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { reviewValidationRules, validate } = require('../middleware/reviewValidation');

router.get('/', reviewController.getAll);
router.get('/:id', reviewController.getById);
router.post('/', reviewValidationRules, validate, reviewController.create);
router.put('/:id', reviewValidationRules, validate, reviewController.update);
router.delete('/:id', reviewController.delete);

module.exports = router;
