const categoryController = require('../controllers/categoryController');

const router = require('express').Router();

// Sorted
router.get('/:category', categoryController.productSorted);

// Delete
router.delete('/category/:category', categoryController.categoryDelete);


module.exports = router;