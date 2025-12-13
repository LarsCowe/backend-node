const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');

router.get('/', filmController.getAll);
router.get('/:id', filmController.getById);
router.post('/', filmController.create);
router.put('/:id', filmController.update);
router.delete('/:id', filmController.delete);

module.exports = router;
