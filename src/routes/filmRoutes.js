const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');
const reviewController = require('../controllers/reviewController');
const { filmValidationRules, validate } = require('../middleware/filmValidation');

router.get('/', filmController.getAll);
router.get('/:id', filmController.getById);
router.get('/:id/reviews', reviewController.getByFilmId);
router.post('/', filmValidationRules, validate, filmController.create);
router.put('/:id', filmValidationRules, validate, filmController.update);
router.delete('/:id', filmController.delete);

module.exports = router;
