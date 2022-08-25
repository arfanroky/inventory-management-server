const productController = require('../controllers/productController');

const router = require('express').Router();



// Product add
router.post('/', productController.productAdd)

// Get all product
router.get('/', productController.productGetAll)

// Product update by id
router.put('/:id', productController.productUpdate)

// Product delete by id
router.delete('/:id', productController.productDelete)


module.exports = router;